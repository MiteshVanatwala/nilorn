import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../app/types/types';
import { GridItem, IconButton, Text } from '@chakra-ui/react';
import InputField from '../../../components/Form/InputField';
import SelectBase from '../../../components/Form/SelectBase';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
  options: SelectOption[];
  unSelectedOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
};

const CompositionMaterialRow = ({
  fieldName,
  index,
  options,
  unSelectedOptions,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const materialName = `${fieldName}.${index}.compositionMaterialCode`;
  const percentName = `${fieldName}.${index}.quantity`;

  const selectedMaterial = useWatch({ name: materialName });

  const onChangeMaterial = (newValue: SelectOption) => {
    setValue(materialName, newValue.value);
    setValue(percentName, undefined);
  };

  return (
    <>
      <GridItem>
        {options && (
          <SelectBase
            isSearchable
            name={materialName}
            options={unSelectedOptions}
            onChange={onChangeMaterial}
            value={options.find(opt => opt.value === selectedMaterial)}
          />
        )}
      </GridItem>
      <GridItem>
        <InputField
          name={percentName}
          placeholder={t('Production.PercentPlaceholder')}
          type="number"
          min={0}
          max={100}
          registerOptions={{
            valueAsNumber: true,
            min: {
              value: 0,
              message: `${t('Production.Feedback.Error.Percentage')}`,
            },
            max: {
              value: 100,
              message: `${t('Production.Feedback.Error.Percentage')}`,
            },
          }}
        />
      </GridItem>
      <GridItem>
        <IconButton
          variant={'ghost'}
          aria-label={t('Common.Remove')}
          onClick={onDelete}
          icon={<Text as={'i'} className="ri-close-line" />}
        />
      </GridItem>
    </>
  );
};

export default CompositionMaterialRow;
