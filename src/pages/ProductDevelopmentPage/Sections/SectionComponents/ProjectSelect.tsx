import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useState } from 'react';
import SelectBase from '../../../../components/Form/SelectBase';
import MenuListWithAddBtn from './MenuListWithAddBtn';

type Props = {
  options: SelectOption[];
  createNew: boolean;
};

const ProjectSelect = ({ options, createNew }: Props) => {
  const { t } = useTranslation();
  const { reset } = useFormContext();
  const [defaultProject, setDefaultProject] = useState<string>('');
  const [selected, setSelected] = useState<SelectOption>();

  //TODO add options from api
  options = [
    { label: 'Project1', value: 'Project1' },
    { label: 'Project2', value: 'Project2' },
  ];
  const onChange = (option: SelectOption) => {
    reset();
    setDefaultProject('');
    setSelected(option);
  };
  return (
    <>
      {defaultProject && (
        <SelectBase
          placeholder={t('PD.Project')}
          name="project"
          invisible={!createNew}
          options={options}
          onChange={onChange}
          value={
            options.find(co => co.label === defaultProject) as SelectOption
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
      )}
      {!defaultProject && (
        <SelectBase
          placeholder={t('PD.Project')}
          name="project"
          invisible={!createNew}
          onChange={onChange}
          options={options}
          value={selected}
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
    </>
  );
};

export default ProjectSelect;
