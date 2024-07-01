import { GridItem, IconButton, Tooltip } from '@chakra-ui/react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../app/types/types';
import ControlWrapper from '../../../components/Form/ControlWrapper';
import FormattedNumberInputField from '../../../components/Form/FormattedNumberInputField';
import SelectBase from '../../../components/Form/SelectBase';
import RemixIcon from '../../../components/Icon/RemixIcon';

type Props = {
  options: SelectOption[];
  unSelectedOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
  disableEdit: boolean;
};

const CompositionMaterialRow = ({
  fieldName,
  index,
  options,
  unSelectedOptions,
  onDelete,
  disableEdit,
}: Props) => {
  const { t } = useTranslation();
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
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
          <ControlWrapper name={materialName} errors={errors}>
            <Controller
              name={materialName}
              control={control}
              rules={{ required: true }}
              render={() => (
                <SelectBase
                  isSearchable
                  name={materialName}
                  options={unSelectedOptions}
                  onChange={onChangeMaterial}
                  value={options.find(opt => opt.value === selectedMaterial)}
                  readOnly={disableEdit}
                />
              )}
            />
          </ControlWrapper>
        )}
      </GridItem>
      <GridItem alignSelf={'end'}>
        <FormattedNumberInputField
          name={percentName}
          placeholder={t('Production.PercentPlaceholder')}
          readonly={disableEdit}
          min={0}
          minMessage={`${t('Production.Feedback.Error.Percentage')}`}
          max={100}
          maxMessage={`${t('Production.Feedback.Error.Percentage')}`}
        />
      </GridItem>
      <GridItem alignSelf={'center'}>
        {!disableEdit && (
          <Tooltip label={t('Common.Remove')}>
            <IconButton
              variant={'deleteIconBtn'}
              aria-label={t('Common.Remove')}
              onClick={onDelete}
              icon={<RemixIcon component="i" icon="CLOSE_LINE" />}
            />
          </Tooltip>
        )}
      </GridItem>
    </>
  );
};

export default CompositionMaterialRow;
