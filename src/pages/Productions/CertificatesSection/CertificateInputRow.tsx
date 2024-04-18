import { useTranslation } from 'react-i18next';
import InputField from '../../../components/Form/InputField';
import { SelectOption } from '../../../app/types/types';
import { GridItem, IconButton, Text } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  useCertificateCategories,
  useCertificateClasses,
} from '../../../app/api/production';
import { ProductionCertificateDto } from '../../../app/generate';
import SelectBase from '../../../components/Form/SelectBase';

type Props = {
  options: SelectOption[];
  unselectedOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
  defaultValues?: ProductionCertificateDto;
};

const CertificateInputRow = ({
  fieldName,
  index,
  options,
  unselectedOptions,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
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
          <SelectBase
            isSearchable
            name={certificateCodeName}
            options={unselectedOptions}
            onChange={onChangeCode}
            value={options.find(opt => opt.value === selectedCertificateCode)}
          />
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
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <InputField
            name={percentageName}
            type="number"
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
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <InputField
            name={certificateWeightName}
            type="number"
            registerOptions={{
              valueAsNumber: true,
            }}
          />
        )}
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

export default CertificateInputRow;
