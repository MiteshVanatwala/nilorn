import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useEffect, useState } from 'react';
import MenuListWithAddBtn from './MenuListWithAddBtn';
import { Box } from '@chakra-ui/react';
import SelectBase from '../../../../components/Form/SelectBase';
import { SIZES } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';

type Props = {
  options: SelectOption[];
  createNew: boolean;
  clientNo: string;
  scrolledPast: boolean;
  disableEdit: boolean;
};

const ProjectSelect = ({
  options,
  createNew,
  clientNo,
  scrolledPast,
  disableEdit,
}: Props) => {
  const { t } = useTranslation();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const inputName = 'projectCode';
  const project = useWatch({ name: inputName });
  const clientNumberWatch = useWatch({ name: 'clientNo' });
  const [optionItems, setOptionItems] = useState<SelectOption[]>([]);

  const onChange = (option: SelectOption) => {
    setValue(inputName, option.value);
  };

  useEffect(() => {
    if (createNew) {
      setValue(inputName, '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientNumberWatch]);

  const clearProjectItem = {
    value: '',
    label: `${t('PD.ClearProjectLabel')}`,
  };

  useEffect(() => {
    if (options) {
      setOptionItems([clearProjectItem, ...options]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  return (
    <Box
      zIndex={8}
      w={'100%'}
      minW={scrolledPast ? '15rem' : SIZES.CONTAINER.XXXS}>
      <ControlWrapper errors={errors} required={true} name={inputName}>
        <Controller
          name={inputName}
          defaultValue={
            optionItems?.find(co => co.value === project) as SelectOption
          }
          render={() => {
            return (
              <SelectBase
                onChange={onChange}
                placeholder={t('PD.Project')}
                name={inputName}
                invisible={!createNew}
                options={optionItems}
                readOnly={!clientNo || disableEdit}
                value={
                  optionItems?.find(co => co.value === project) as SelectOption
                }
                components={{
                  MenuList: (props: any) => (
                    <MenuListWithAddBtn
                      setDefaultProject={(val: string) =>
                        setValue(inputName, val)
                      }
                      clientNo={clientNo}
                      {...props}
                    />
                  ),
                }}
              />
            );
          }}
        />
      </ControlWrapper>
    </Box>
  );
};

export default ProjectSelect;
