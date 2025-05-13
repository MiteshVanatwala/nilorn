import { Grid, GridItem } from '@chakra-ui/react';
import ProjectsActionBar from './ProjectsActionBar';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SelectOption } from '../../../../app/types/types';
import {
  useGetProjectCard,
  useGetProjectsOptions,
} from '../../../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';
import Select from '../../../../components/Form/Select';
import useFilterOptions from '../../../../app/hooks/useFilterOption';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
  setSelectedProjectCode: Dispatch<SetStateAction<string | undefined>>;
  setSelectedClientNo: Dispatch<SetStateAction<string | undefined>>;
  lastModified?: Date;
  clientOptions?: SelectOption[];
};

const ProjectsTopSection = ({
  setSelectedProjectCode,
  setSelectedClientNo,
}: Props) => {
  const { t } = useTranslation();
  const { setValue, reset } = useFormContext();
  const clientOptions = useFilterOptions('clients', true);
  const clientNo = useWatch({ name: 'clientNo' });
  const projectId = useWatch({ name: 'code' });
  const lastModified = useWatch({ name: 'lastModified' });
  const { data: projectOptionItems } = useGetProjectsOptions(
    clientNo,
    typeof clientNo === 'string'
  );

  const projectOptions = useMemo(() => {
    return !!projectOptionItems ? (projectOptionItems as SelectOption[]) : [];
  }, [projectOptionItems]);

  const [optionItems, setOptionItems] =
    useState<SelectOption[]>(projectOptions);

  const { data: projectCard } = useGetProjectCard(
    clientNo ?? '',
    projectId ?? ''
  );

  useEffect(() => {
    if (!!clientNo && !!projectId && !!projectCard) {
      console.log('59');
      reset({ ...projectCard });
    } else if (!!projectId && !!projectCard) {
      console.log('62');
      reset({
        clientNo,
      });
    }
  }, [clientNo, projectId, projectCard]);

  useEffect(() => {
    console.log(projectOptions);
    setOptionItems(projectOptions);
    setValue('code', null);
    setValue('project', null);
  }, [projectOptions]);

  useEffect(() => {
    setSelectedClientNo(clientNo);
    setSelectedProjectCode('');
  }, [clientNo]);

  useEffect(() => {
    setSelectedProjectCode(projectId);
  }, [projectId]);

  useEffect(() => {
    if (projectId !== undefined && projectId !== '') {
      setOptionItems(projectOptions);
    } else {
      setOptionItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <Grid
      gap={{
        base: SPACE.XXS,
        lg: SPACE.SM,
      }}
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.md,
        lg: GRID.TEMPLATE_COLUMNS.lg,
      }}>
      <GridItem
        colSpan={{
          base: 4,
          lg: 8,
        }}>
        <Grid
          gap={{
            base: SPACE.XXS,
            lg: SPACE.SM,
          }}
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            md: GRID.TEMPLATE_COLUMNS.md,
            lg: GRID.TEMPLATE_COLUMNS.lg,
          }}
          pb={{ base: SPACE.XXS, lg: SPACE.MD }}>
          <GridItem
            colSpan={{
              base: 2,
              lg: 2,
            }}>
            <ControlWrapper name={'client'} label={t('Menu.HypClients')}>
              <Select
                placeholder={t('PD.Client')}
                name="clientNo"
                options={clientOptions}
                registerOptions={{ required: true }}
              />
            </ControlWrapper>
          </GridItem>

          <GridItem
            colSpan={{
              base: 2,
              lg: 2,
            }}>
            <ControlWrapper name={'project'} label={t('Menu.HypProjects')}>
              {/* <ProjectSelect
                options={projectOptions as SelectOption[]}
                createNew={false}
                clientNo={clientNo}
                scrolledPast={true}
                disableEdit={false}
              /> */}
              <Select
                name="code"
                options={optionItems}
                registerOptions={{ required: true }}
              />
            </ControlWrapper>
            <Fragment />
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem colSpan={2}>
        <ProjectsActionBar
          lastModified={lastModified}
          clientNo={clientNo}
          projectId={projectId}
          setSelectedProjectCode={setSelectedProjectCode}
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectsTopSection;
