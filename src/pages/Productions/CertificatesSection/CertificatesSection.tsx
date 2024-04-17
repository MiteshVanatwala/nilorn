import CertificateInputRow from './CertificateInputRow';
import { Button, Grid, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
import CertificatesHeader from './CertificatesHeader';
import { useCertificateCodes } from '../../../app/api/certificates';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../app/types/types';
import { ProductionCertificateDto } from '../../../app/generate';
import { useEffect } from 'react';

type Props = {
  defaultValues?: ProductionCertificateDto[];
};

const CertificateSection = ({ defaultValues }: Props) => {
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
  const filteredOptions = certificates?.length
    ? certificateCodes?.filter(
        code => !certificates.some(c => c.certificateCode === code.value)
      )
    : certificateCodes;

  useEffect(() => {
    if (defaultValues?.length && !getValues(fieldName)) {
      setValue(fieldName, defaultValues);
    }
  }, [defaultValues, getValues, setValue]);

  return (
    <VStack align={'start'} gap={SPACE.SM}>
      <Grid
        templateColumns={'repeat(6, 1fr)'}
        columnGap={SPACE.SM}
        rowGap={SPACE.SM}>
        <CertificatesHeader />
        {fields.map((field, index) => {
          return (
            <CertificateInputRow
              key={field.id}
              fieldName={fieldName}
              index={index}
              options={certificateCodes as SelectOption[]}
              filteredOptions={filteredOptions as SelectOption[]}
              onDelete={() => remove(index)}
              defaultValues={defaultValues?.find(d => d.id === field.id)}
            />
          );
        })}
      </Grid>
      {filteredOptions?.length && fields?.length < filteredOptions?.length && (
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
          rightIcon={<i className={'ri-add-line'} />}>
          {t('Common.Add')}
        </Button>
      )}
    </VStack>
  );
};

export default CertificateSection;
