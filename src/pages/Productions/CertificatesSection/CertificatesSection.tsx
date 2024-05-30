import { Button, Grid, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCertificateCodes } from '../../../app/api/production';
import { ProductionCertificateDto } from '../../../app/generate';
import { SelectOption } from '../../../app/types/types';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { SPACE } from '../../../theme/Constants';
import CertificateInputRow from './CertificateInputRow';
import CertificatesHeader from './CertificatesHeader';

type Props = {
  defaultValues?: ProductionCertificateDto[];
  disableEdit?: boolean;
};

const CertificateSection = ({ defaultValues, disableEdit = false }: Props) => {
  const { t } = useTranslation();
  const { control, setValue, getValues } = useFormContext();
  const fieldName = 'productionCertificates';
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });
  const certificates = useWatch({
    name: fieldName,
  }) as ProductionCertificateDto[];
  const { data: certificateCodes } = useCertificateCodes();
  const unselectedOptions = certificates?.length
    ? certificateCodes?.filter(
        code => !certificates.some(c => c.certificateCode === code.value)
      )
    : certificateCodes;

  useEffect(() => {
    if (defaultValues?.length && !getValues(fieldName)) {
      setValue(fieldName, defaultValues);
    }
  }, [defaultValues, getValues, setValue]);

  const showAddButton =
    unselectedOptions?.length &&
    fields?.length < (certificateCodes?.length ?? 0) &&
    !disableEdit;

  return (
    <VStack align={'start'} gap={SPACE.SM} pt={SPACE.XL}>
      <Grid
        templateColumns={'repeat(3, 1fr) 7rem max-content min-content'}
        columnGap={SPACE.SM}
        rowGap={SPACE.SM}
        w={'100%'}>
        <CertificatesHeader />
        {fields.map((field, index) => {
          return (
            <CertificateInputRow
              key={field.id}
              fieldName={fieldName}
              index={index}
              options={certificateCodes as SelectOption[]}
              unselectedOptions={unselectedOptions as SelectOption[]}
              onDelete={() => remove(index)}
              defaultValues={defaultValues?.find(d => d.id === field.id)}
              disableEdit={disableEdit}
            />
          );
        })}
      </Grid>
      {showAddButton && (
        <Button
          isDisabled={!certificateCodes}
          variant={'secondarySmall'}
          onClick={() =>
            append({
              id: undefined,
              certificateCode: undefined,
              certificateCategoryCode: undefined,
              certificateClassCode: undefined,
              percentage: undefined,
              certificateWeight: undefined,
            })
          }
          rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}>
          {t('Common.Add')}
        </Button>
      )}
    </VStack>
  );
};

export default CertificateSection;
