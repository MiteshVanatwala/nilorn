import { HStack, VStack } from '@chakra-ui/react';
import FormLabelComponent from '../../../../components/Form/FormLabelComponent';
import SelectBase from '../../../../components/Form/SelectBase';
import ProjectsActionBar from './ProjectsActionBar';
import { Dispatch, SetStateAction } from 'react';
import { SelectOption } from '../../../../app/types/types';
import { useGetProjectsOptions } from '../../../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../../theme/Constants';

type Props = {
  selectedProject?: SelectOption;
  selectedClient?: SelectOption;
  setSelectedProject: Dispatch<SetStateAction<SelectOption | undefined>>;
  setSelectedClient: Dispatch<SetStateAction<SelectOption | undefined>>;
  lastModified?: Date;
  clientOptions?: SelectOption[];
};

const ProjectsTopSection = ({
  selectedProject,
  selectedClient,
  setSelectedProject,
  setSelectedClient,
  lastModified,
  clientOptions,
}: Props) => {
  const { t } = useTranslation();

  const { data: projectOptions } = useGetProjectsOptions(selectedClient?.value);

  const onChangeProject = (option: SelectOption) => {
    setSelectedProject(option);
  };

  const onChangeClient = (option: SelectOption) => {
    setSelectedClient(option);
    setSelectedProject(undefined);
  };

  return (
    <HStack justify={'space-between'} pb={SPACE.XL}>
      <HStack>
        <VStack align={'start'}>
          <FormLabelComponent name={'client'} label={t('Menu.HypClients')} />
          <SelectBase
            name={'client'}
            onChange={onChangeClient}
            options={clientOptions}
            value={selectedClient}
          />
        </VStack>

        <VStack align={'start'}>
          <FormLabelComponent name={'project'} label={t('Menu.HypProjects')} />
          <SelectBase
            name={'project'}
            onChange={onChangeProject}
            options={projectOptions as SelectOption[]}
            value={selectedProject}
          />
        </VStack>
      </HStack>
      <ProjectsActionBar
        lastModified={lastModified?.toISOString()}
        clientNo={selectedClient?.value}
        projectCode={selectedProject?.value}
      />
    </HStack>
  );
};

export default ProjectsTopSection;
