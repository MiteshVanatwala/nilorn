import { Grid, GridItem, HStack } from '@chakra-ui/react';
import SelectBase from '../../../../components/Form/SelectBase';
import ProjectsActionBar from './ProjectsActionBar';
import { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import { SelectOption } from '../../../../app/types/types';
import { useGetProjectsOptions } from '../../../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';

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
  selectedClientNo,
  setSelectedProjectCode,
  setSelectedClientNo,
  lastModified,
  clientOptions,
}: Props) => {
  const { t } = useTranslation();

  const { data: projectOptionItems } = useGetProjectsOptions(selectedClientNo);

  const projectOptions = useMemo(() => {
    return !!projectOptionItems ? (projectOptionItems as SelectOption[]) : [];
  }, [projectOptionItems]);

  const onChangeProject = (option: SelectOption) => {
    setSelectedProjectCode(option.value);
  };

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
              <SelectBase
                name={'client'}
                onChange={onChangeClient}
                options={clientOptions}
                value={clientOptions?.find(
                  opt => opt.value === selectedClientNo
                )}
              />
            </ControlWrapper>
          </GridItem>

          <GridItem
            colSpan={{
              base: 2,
              lg: 2,
            }}>
            <ControlWrapper name={'project'} label={t('Menu.HypProjects')}>
              <SelectBase
                name={'project'}
                onChange={onChangeProject}
                options={projectOptions}
                value={projectOptions?.find(
                  opt => opt.value === selectedProjectCode
                )}
              />
            </ControlWrapper>
            <Fragment />
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem colSpan={2}>
        <ProjectsActionBar
          lastModified={lastModified?.toISOString()}
          clientNo={selectedClientNo}
          projectId={selectedProjectCode}
          setSelectedProjectCode={setSelectedProjectCode}
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectsTopSection;
