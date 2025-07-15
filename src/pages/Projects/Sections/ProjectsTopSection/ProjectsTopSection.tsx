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
import { SESSION_STORAGE } from '../../../../app/utils/constant';

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    const storedClientNo = sessionStorage.getItem(
      SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO
    );
    const storedProjectCode = sessionStorage.getItem(
      SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO
    );
    if (storedClientNo) {
      setSelectedClientNo(storedClientNo);
      setValue('clientNo', storedClientNo);
    }
    if (storedProjectCode) {
      setSelectedProjectCode(storedProjectCode);
      setValue('code', storedProjectCode);
      setValue('project', storedProjectCode);
    }
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
  }, []);

  useEffect(() => {
    if (!!clientNo && !!projectId && !!projectCard) {
      reset({ ...projectCard });
    } else if (!projectId && !isInitialLoad) {
      reset({
        clientNo,
        code: '',
        description: '',
        clientName: '',
        members: [],
        lastModified: '',
        teamsName: '',
        channelName: '',
        artWorkFolderName: '',
        attachmentFolderName: '',
      });
    }
  }, [clientNo, projectId, projectCard]);

  useEffect(() => {
    setOptionItems(projectOptions);
  }, [projectOptions]);

  useEffect(() => {
    setSelectedClientNo(clientNo);
    if (clientNo !== undefined) {
      sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO, clientNo);
      if (!isInitialLoad && projectId !== undefined && projectId !== '') {
        setSelectedProjectCode('');
        setValue('code', '');
        setValue('project', '');
        sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO, '');
      }
    }
  }, [clientNo, projectId]);

  useEffect(() => {
    setSelectedProjectCode(projectId);
    if (projectId !== undefined && projectId !== '') {
      sessionStorage.setItem(
        SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO,
        projectId
      );
      setSelectedProjectCode(projectId);
      setValue('code', projectId);
      setValue('project', projectId);
    }
  }, [projectId]);

  const defaultClientOption = clientOptions?.find(
    (option: any) => option.value === clientNo
  );

  const defaultProjectOption = projectOptions?.find(
    (option: any) => option.value === projectId
  );

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
                isControlled
                value={defaultClientOption}
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
              <Select
                name="code"
                isControlled
                value={defaultProjectOption}
                options={optionItems}
                registerOptions={{ required: true }}
                isDisabled={!clientNo}
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
