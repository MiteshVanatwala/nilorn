import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useEffect, useMemo, useState } from 'react';
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
  const projectCode = useWatch({ name: inputName });
  const clientNumberWatch = useWatch({ name: 'clientNo' });
  const [optionItems, setOptionItems] = useState<SelectOption[]>([]);

  const clearProjectItem = {
    value: '',
    label: `${t('PD.ClearSelection')}`,
  };

  const onChange = (option: SelectOption) => {
    if (option.value === clearProjectItem.value) {
      setValue(inputName, null);
    } else {
      setValue(inputName, option.value, { shouldDirty: true });
    }
  };

  useEffect(() => {
    if (createNew) {
      setValue(inputName, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientNumberWatch]);

  useEffect(() => {
    if (
      options &&
      projectCode !== clearProjectItem.value &&
      projectCode !== null
    ) {
      setOptionItems([clearProjectItem, ...options]);
    } else {
      setOptionItems(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, projectCode]);

  const value = useMemo(
    () =>
      (optionItems?.find(co => co.value === projectCode) as SelectOption) ??
      null,
    [optionItems, projectCode]
  );

  return (
    <Box
      zIndex={8}
      w={'100%'}
      minW={scrolledPast ? '15rem' : SIZES.CONTAINER.XXXS}>
      <ControlWrapper errors={errors} required={true} name={inputName}>
        <Controller
          name={inputName}
          defaultValue={value}
          render={() => {
            return (
              <SelectBase
                onChange={onChange}
                placeholder={t('PD.Project')}
                name={inputName}
                invisible={!createNew}
                options={optionItems}
                readOnly={!clientNo || disableEdit}
                value={value}
                isSearchable
                isScrollable
                components={{
                  MenuList: (props: any) => (
                    <MenuListWithAddBtn
                      setDefaultProject={(val: string) =>
                        setValue(inputName, val, {
                          shouldDirty: true,
                        })
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
