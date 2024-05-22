import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../app/types/types';
import { GridItem, IconButton, Tooltip } from '@chakra-ui/react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  useCertificateCategories,
  useCertificateClasses,
} from '../../../app/api/production';
import { ProductionCertificateDto } from '../../../app/generate';
import SelectBase from '../../../components/Form/SelectBase';
import ControlWrapper from '../../../components/Form/ControlWrapper';
import DecimalInputField from '../../../components/Form/DecimalInputField';

type Props = {
  options: SelectOption[];
  unselectedOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
  defaultValues?: ProductionCertificateDto;
  disableEdit?: boolean;
};

const CertificateInputRow = ({
  fieldName,
  index,
  options,
  unselectedOptions,
  onDelete,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const certificateCodeName = `${fieldName}.${index}.certificateCode`;
  const certificateCategoryName = `${fieldName}.${index}.certificateCategoryCode`;
  const certificateClassName = `${fieldName}.${index}.certificateClassCode`;
  const percentageName = `${fieldName}.${index}.percentage`;
  const certificateWeightName = `${fieldName}.${index}.certificateWeight`;

  const selectedCertificateCode = useWatch({ name: certificateCodeName });
  const selectedCategory = useWatch({ name: certificateCategoryName });
  const selectedClass = useWatch({ name: certificateClassName });

  const { data: categories } = useCertificateCategories(
    selectedCertificateCode
  );
  const categoryOptions = (categories ?? []) as SelectOption[];

  const { data: classes } = useCertificateClasses(selectedCertificateCode);
  const classOptions = (classes ?? []) as SelectOption[];

  const onChangeCode = (newValue: SelectOption) => {
    setValue(certificateCodeName, newValue.value);
    setValue(certificateCategoryName, undefined);
    setValue(certificateClassName, undefined);
    setValue(percentageName, undefined);
    setValue(certificateWeightName, undefined);
  };

  const onChangeCategory = (newValue: SelectOption) => {
    setValue(certificateCategoryName, newValue.value);
  };

  const onChangeClass = (newValue: SelectOption) => {
    setValue(certificateClassName, newValue.value);
  };

  return (
    <>
      <GridItem>
        {options && (
          <ControlWrapper name={certificateCodeName} errors={errors}>
            <Controller
              name={certificateCodeName}
              control={control}
              rules={{ required: true }}
              render={() => (
                <SelectBase
                  isSearchable
                  name={certificateCodeName}
                  options={unselectedOptions}
                  onChange={onChangeCode}
                  value={options.find(
                    opt => opt.value === selectedCertificateCode
                  )}
                  readOnly={disableEdit}
                />
              )}
            />
          </ControlWrapper>
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && categories && categoryOptions && (
          <SelectBase
            isSearchable
            name={certificateCategoryName}
            options={categoryOptions}
            onChange={onChangeCategory}
            value={categoryOptions?.find(opt => opt.value === selectedCategory)}
            readOnly={disableEdit}
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && classes && classOptions && (
          <SelectBase
            isSearchable
            name={certificateClassName}
            options={classOptions}
            onChange={onChangeClass}
            value={classOptions?.find(opt => opt.value === selectedClass)}
            readOnly={disableEdit}
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <DecimalInputField
            name={percentageName}
            placeholder={t('Production.PercentPlaceholder')}
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
            readonly={disableEdit}
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <DecimalInputField
            name={certificateWeightName}
            registerOptions={{
              valueAsNumber: true,
            }}
            readonly={disableEdit}
          />
        )}
      </GridItem>
      <GridItem>
        {!disableEdit && (
          <Tooltip label={t('Common.Remove')}>
            <IconButton
              variant={'deleteIconBtn'}
              aria-label={t('Common.Remove')}
              onClick={onDelete}
              icon={<i className="ri-close-line" />}
            />
          </Tooltip>
        )}
      </GridItem>
    </>
  );
};

export default CertificateInputRow;
