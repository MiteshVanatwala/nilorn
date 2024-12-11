import { GridItem, IconButton, Tooltip } from '@chakra-ui/react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useCertificateCategories,
  useCertificateClasses,
} from '../../../app/api/production';
import { SelectOption } from '../../../app/types/types';
import ControlWrapper from '../../../components/Form/ControlWrapper';
import FormattedNumberInputField from '../../../components/Form/FormattedNumberInputField';
import SelectBase from '../../../components/Form/SelectBase';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { useMemo } from 'react';

type Props = {
  options: SelectOption[];
  unselectedOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
  disableEdit?: boolean;
  focusOnMount?: boolean;
};

const CertificateInputRow = ({
  fieldName,
  index,
  options,
  unselectedOptions,
  onDelete,
  disableEdit = false,
  focusOnMount = false,
}: Props) => {
  const { t } = useTranslation();
  const {
    clearErrors,
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

  const { data: categories, isLoading: categoriesIsLoading } =
    useCertificateCategories(selectedCertificateCode);
  const categoryOptions = useMemo(() => {
    return !!categories ? (categories as SelectOption[]) : undefined;
  }, [categories]);

  const { data: classes, isLoading: classesIsLoading } = useCertificateClasses(
    selectedCertificateCode
  );
  const classOptions = useMemo(() => {
    return !!classes ? (classes as SelectOption[]) : undefined;
  }, [classes]);

  const isLoading = useMemo(() => {
    return categoriesIsLoading || classesIsLoading;
  }, [categoriesIsLoading, classesIsLoading]);
  const onChangeCode = (newValue: SelectOption) => {
    clearErrors(`${fieldName}.${index}`);
    setValue(certificateCodeName, newValue.value);
    setValue(certificateCategoryName, undefined);
    setValue(certificateClassName, undefined);
    setValue(percentageName, null);
    setValue(certificateWeightName, null);
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
          <ControlWrapper
            name={certificateCodeName}
            errors={errors}
            showErrorIcon={true}>
            <Controller
              name={certificateCodeName}
              control={control}
              rules={{ required: true }}
              render={() => (
                <SelectBase
                  isSearchable
                  autoFocus={focusOnMount}
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
        <SelectBase
          isSearchable
          isDisabled={
            !selectedCertificateCode || !categoryOptions || categoriesIsLoading
          }
          name={certificateCategoryName}
          options={categoryOptions}
          onChange={onChangeCategory}
          value={categoryOptions?.find(opt => opt.value === selectedCategory)}
          readOnly={disableEdit}
        />
      </GridItem>
      <GridItem>
        <SelectBase
          isSearchable
          isDisabled={
            !selectedCertificateCode || !classOptions || classesIsLoading
          }
          name={certificateClassName}
          options={classOptions}
          onChange={onChangeClass}
          value={classOptions?.find(opt => opt.value === selectedClass)}
          readOnly={disableEdit}
        />
      </GridItem>
      <GridItem alignSelf={'end'}>
        <FormattedNumberInputField
          name={percentageName}
          placeholder={t('Production.PercentPlaceholder')}
          min={0}
          minMessage={`${t('Production.Feedback.Error.Percentage')}`}
          max={100}
          maxMessage={`${t('Production.Feedback.Error.Percentage')}`}
          type={'integer'}
          readonly={disableEdit || isLoading || !selectedCertificateCode}
          showErrorIcon={true}
        />
      </GridItem>
      <GridItem alignSelf={'end'}>
        <FormattedNumberInputField
          name={certificateWeightName}
          placeholder={`${t('Common.Placeholder')}`}
          readonly={disableEdit || isLoading || !selectedCertificateCode}
          showErrorIcon={true}
          min={0}
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

export default CertificateInputRow;
