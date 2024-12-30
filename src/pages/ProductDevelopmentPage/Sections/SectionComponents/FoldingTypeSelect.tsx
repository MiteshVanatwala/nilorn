import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import { useEffect, useMemo, useState } from 'react';
import { Box } from '@chakra-ui/react';
import SelectBase from '../../../../components/Form/SelectBase';
import { SIZES } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';
import MenuList from './MenuList';

type Props = {
  options: SelectOption[];
  disableEdit: boolean;
};

const FoldingTypeSelect = ({ options, disableEdit }: Props) => {
  const { t } = useTranslation();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const inputName = 'foldingTypeCode';
  const project = useWatch({ name: inputName });
  const clientNumberWatch = useWatch({ name: 'foldingTypeCode' });
  const [optionItems, setOptionItems] = useState<SelectOption[]>([]);
  const selectPlaceholder = t('PD.ClearSelection');
  const hasValue = options.find(o => o.value === clientNumberWatch);
  const [optionValue, setOptionValue] = useState<string | null>(
    hasValue?.value
  );

  const clearSelect = useMemo(
    () => ({
      value: null,
      label: selectPlaceholder,
    }),
    [selectPlaceholder]
  );
  const onChange = (option: SelectOption) => {
    setOptionValue(option?.value);
    if (option.value === clearSelect.value) {
      setValue(inputName, undefined);
    } else {
      setValue(inputName, option.value, { shouldDirty: true });
    }
  };

  useEffect(() => {
    if (options && optionValue != null) {
      setOptionItems([clearSelect, ...options]);
    } else {
      setOptionItems([...options]);
    }
  }, [options, optionValue, clearSelect]);

  return (
    <Box zIndex={8} w={'100%'} minW={SIZES.CONTAINER.XXXS}>
      <ControlWrapper
        errors={errors}
        required={false}
        name={inputName}
        label={`${t('PD.FormContent.FoldingType')}`}>
        <Controller
          name={inputName}
          defaultValue={
            optionItems?.find(co => co.value === project) as SelectOption
          }
          render={() => {
            return (
              <SelectBase
                onChange={onChange}
                placeholder={t('Filter.Select')}
                name={inputName}
                options={optionItems}
                readOnly={disableEdit}
                isSearchable={true}
                value={
                  optionItems?.find(co => co.value === project) as SelectOption
                }
                components={{
                  MenuList: (props: any) => (
                    <MenuList
                      setDefaultProject={(val: string) =>
                        setValue(inputName, val, {
                          shouldDirty: true,
                        })
                      }
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

export default FoldingTypeSelect;
