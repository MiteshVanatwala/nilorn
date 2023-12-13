import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useEffect, useState } from 'react';
import MenuListWithAddBtn from './MenuListWithAddBtn';
import { Box } from '@chakra-ui/react';
import SelectBase from '../../../../components/Form/SelectBase';

type Props = {
  options: SelectOption[];
  createNew: boolean;
};

const ProjectSelect = ({ options, createNew }: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const [defaultProject, setDefaultProject] = useState<string>();
  const [selected, setSelected] = useState<SelectOption>();

  //TODO add options from api
  options = [
    { label: 'Project1', value: 'Project1' },
    { label: 'Project2', value: 'Project2' },
  ];
  const onChange = (option: SelectOption) => {
    setDefaultProject('');
    setValue('project', option.label);
    setSelected(option);
  };
  useEffect(() => {
    if (defaultProject !== '') {
      setValue('project', defaultProject);
    }
  }, [defaultProject, setValue]);

  return (
    <Box zIndex={8} width={'100%'}>
      <SelectBase
        onChange={onChange}
        placeholder={t('PD.Project')}
        name="project"
        invisible={!createNew}
        options={options}
        value={
          defaultProject !== ''
            ? (options.find(co => co.label === defaultProject) as SelectOption)
            : selected
        }
        components={{
          MenuList: (props: any) => (
            <MenuListWithAddBtn
              setDefaultProject={setDefaultProject}
              {...props}
            />
          ),
        }}
      />
    </Box>
  );
};

export default ProjectSelect;
