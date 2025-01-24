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
  const foldingTypeCode = useWatch({ name: inputName });
  const [optionItems, setOptionItems] = useState<SelectOption[]>([]);
  const selectPlaceholder = t('PD.ClearSelection');

  const clearSelect = useMemo(
    () => ({
      value: '',
      label: selectPlaceholder,
    }),
    [selectPlaceholder]
  );

  const onChange = (option: SelectOption) => {
    if (option.value === clearSelect.value) {
      setValue(inputName, null);
    } else {
      setValue(inputName, option.value, { shouldDirty: true });
    }
  };

  useEffect(() => {
    if (
      options &&
      foldingTypeCode !== clearSelect.value &&
      foldingTypeCode != null
    ) {
      setOptionItems([clearSelect, ...options]);
    } else {
      setOptionItems([...options]);
    }
  }, [options, foldingTypeCode, clearSelect]);

  const selectedFoldingTypeOption = useMemo(() => {
    return (optionItems?.find(co => co.value === foldingTypeCode) as SelectOption) ?? null;
  }, [optionItems, foldingTypeCode]);

  return (
    <Box zIndex={8} w={'100%'} minW={SIZES.CONTAINER.XXXS}>
      <ControlWrapper
        errors={errors}
        required={false}
        name={inputName}
        label={`${t('PD.FormContent.FoldingType')}`}>
        <Controller
          name={inputName}
          defaultValue={selectedFoldingTypeOption}
          render={() => {
            return (
              <SelectBase
                onChange={onChange}
                placeholder={t('Filter.Select')}
                name={inputName}
                options={optionItems}
                readOnly={disableEdit}
                isSearchable={true}
                value={selectedFoldingTypeOption}
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
                isScrollable
              />
            );
          }}
        />
      </ControlWrapper>
    </Box>
  );
};

export default FoldingTypeSelect;
