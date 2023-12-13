import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useState } from 'react';
import MenuListWithAddBtn from './MenuListWithAddBtn';
import { Box } from '@chakra-ui/react';
import Select from '../../../../components/Form/Select';

type Props = {
  options: SelectOption[];
  createNew: boolean;
};

const ProjectSelect = ({ options, createNew }: Props) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const [defaultProject, setDefaultProject] = useState<string>('');

  //TODO add options from api
  options = [
    { label: 'Project1', value: 'Project1' },
    { label: 'Project2', value: 'Project2' },
  ];
  const onChange = (option: SelectOption) => {
    setDefaultProject('');
  };
  return (
    <Box zIndex={8} width={'100%'}>
      {defaultProject && (
        <Select
          placeholder={t('PD.Project')}
          name="project"
          invisible={!createNew}
          options={options}
          onChange={onChange}
          registerOptions={{ required: true }}
          defaultValue={options.find(o => o.label === getValues('project'))}
          components={{
            MenuList: (props: any) => (
              <MenuListWithAddBtn
                setDefaultProject={setDefaultProject}
                {...props}
              />
            ),
          }}
        />
      )}
      {!defaultProject && (
        <Select
          placeholder={t('PD.Project') + ' *'}
          name="project"
          invisible={!createNew}
          onChange={onChange}
          registerOptions={{ required: true }}
          options={options}
          components={{
            MenuList: (props: any) => (
              <MenuListWithAddBtn
                setDefaultProject={setDefaultProject}
                {...props}
              />
            ),
          }}
        />
      )}
    </Box>
  );
};

export default ProjectSelect;
