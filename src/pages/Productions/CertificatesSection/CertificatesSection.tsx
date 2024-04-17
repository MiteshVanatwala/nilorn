import CertificateInputRow from './CertificateInputRow';
import { Button, Grid, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
import CertificatesHeader from './CertificatesHeader';
import { useCertificateCodes } from '../../../app/api/certificates';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { SelectOption } from '../../../app/types/types';

type Certificate = {
  certificateCode?: string;
  certificateCategory?: string;
  certificateClass?: string;
  certificatePercentage?: number;
  certificateWeight?: number;
};

const CertificateSection = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const fieldName = 'certificates';
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });
  const certificates = useWatch({ name: fieldName }) as Certificate[];
  const { data: certificateCodes } = useCertificateCodes();
  const filteredOptions = certificates?.length
    ? certificateCodes?.filter(
        code => !certificates.some(c => c.certificateCode === code.value)
      )
    : certificateCodes;

  return (
    <VStack align={'start'} gap={SPACE.SM}>
      <Grid
        templateColumns={'repeat(6, 1fr)'}
        columnGap={SPACE.SM}
        rowGap={SPACE.SM}>
        <CertificatesHeader />
        {fields.map((field, index) => (
          <CertificateInputRow
            key={field.id}
            fieldName={fieldName}
            index={index}
            certificateCodeOptions={filteredOptions as SelectOption[]}
            onDelete={() => remove(index)}
          />
        ))}
      </Grid>
      {filteredOptions?.length && fields?.length < filteredOptions?.length && (
        <Button
          isDisabled={!certificateCodes}
          variant={'secondarySmall'}
          onClick={() =>
            append({
              certificateCode: undefined,
              certificateCategory: undefined,
              certificateClass: undefined,
              certificatePercentage: undefined,
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
