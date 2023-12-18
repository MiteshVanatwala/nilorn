import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useEffect, useState } from 'react';
import MenuListWithAddBtn from './MenuListWithAddBtn';
import { Box } from '@chakra-ui/react';
import SelectBase from '../../../../components/Form/SelectBase';
import { SIZES } from '../../../../theme/Constants';

type Props = {
  options: SelectOption[];
  createNew: boolean;
  clientNo: string;
  scrolledPast: boolean;
};

const ProjectSelect = ({
  options,
  createNew,
  clientNo,
  scrolledPast,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const [defaultProject, setDefaultProject] = useState<string>();
  const [selected, setSelected] = useState<SelectOption>();
  const inputName = 'projectCode';
  const client = useWatch({ name: 'client' });
  const onChange = (option: SelectOption) => {
    setDefaultProject('');
    setValue(inputName, option.label);
    setSelected(option);
  };
  useEffect(() => {
    if (defaultProject !== '') {
      setValue(inputName, defaultProject);
    }
  }, [defaultProject, setValue]);

  return (
    <Box
      zIndex={8}
      width={'auto'}
      minW={scrolledPast ? '15rem' : SIZES.CONTAINER.XXXS}>
      <SelectBase
        onChange={onChange}
        placeholder={t('PD.Project')}
        name={inputName}
        invisible={!createNew}
        options={options}
        isDisabled={!client}
        value={
          defaultProject !== ''
            ? (options?.find(co => co.label === defaultProject) as SelectOption)
            : selected
        }
        components={{
          MenuList: (props: any) => (
            <MenuListWithAddBtn
              setDefaultProject={setDefaultProject}
              clientNo={clientNo}
              {...props}
            />
          ),
        }}
      />
    </Box>
  );
};

export default ProjectSelect;
