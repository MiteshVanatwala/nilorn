import { Grid, GridItem } from '@chakra-ui/react';
import ProjectsActionBar from './ProjectsActionBar';
import { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import { SelectOption } from '../../../../app/types/types';
import { useGetProjectsOptions } from '../../../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';
import Select from '../../../../components/Form/Select';
import useFilterOptions from '../../../../app/hooks/useFilterOption';
import { useWatch } from 'react-hook-form';

type Props = {
  selectedProjectCode?: string;
  selectedClientNo?: string;
  setSelectedProjectCode: Dispatch<SetStateAction<string | undefined>>;
  setSelectedClientNo: Dispatch<SetStateAction<string | undefined>>;
  lastModified?: Date;
  clientOptions?: SelectOption[];
};

const ProjectsTopSection = ({
  selectedProjectCode,
  setSelectedProjectCode,
  setSelectedClientNo,
  lastModified,
}: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions('clients', true);
  const clientNo = useWatch({ name: 'clientNo' });
  const projectId = useWatch({ name: 'project' });
  const { data: projectOptionItems } = useGetProjectsOptions(
    clientNo,
    typeof clientNo === 'string'
  );

  const projectOptions = useMemo(() => {
    return !!projectOptionItems ? (projectOptionItems as SelectOption[]) : [];
  }, [projectOptionItems]);

  const onChangeClient = (option: SelectOption) => {
    setSelectedClientNo(option.value);
    setSelectedProjectCode(undefined);
  };

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
                onChange={onChangeClient}
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
                name="project"
                options={projectOptions}
                registerOptions={{ required: true }}
              />
            </ControlWrapper>
            <Fragment />
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem colSpan={2}>
        <ProjectsActionBar
          lastModified={lastModified?.toISOString()}
          clientNo={clientNo}
          projectId={projectId}
          setSelectedProjectCode={setSelectedProjectCode}
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectsTopSection;
