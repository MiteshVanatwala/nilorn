import { useTranslation } from 'react-i18next';
import InputField from '../../../components/Form/InputField';
import { SelectOption } from '../../../app/types/types';
import { GridItem, IconButton, Skeleton, Text } from '@chakra-ui/react';
import Select from '../../../components/Form/Select';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  useCertificateCategories,
  useCertificateClasses,
} from '../../../app/api/certificates';
import { useEffect } from 'react';

type Props = {
  certificateCodeOptions: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
};

const CertificateInputRow = ({
  fieldName,
  index,
  certificateCodeOptions,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const certificateCodeName = `${fieldName}.${index}.certificateCode`;
  const certificateCategoryName = `${fieldName}.${index}.certificateCategory`;
  const certificateClassName = `${fieldName}.${index}.certificateClass`;
  const certificatePercentageName = `${fieldName}.${index}.certificatePercentage`;
  const certificateWeightName = `${fieldName}.${index}.certificateWeight`;

  const selectedCertificateCode = useWatch({ name: certificateCodeName });

  const { setValue } = useFormContext();

  useEffect(() => {
    if (selectedCertificateCode) {
      setValue(certificateCategoryName, undefined);
      setValue(certificateClassName, undefined);
      setValue(certificatePercentageName, undefined);
      setValue(certificateWeightName, undefined);
    }
  }, [selectedCertificateCode]);

  const { data: categories, isLoading: categorieIsLoading } =
    useCertificateCategories(selectedCertificateCode);
  const { data: classes, isLoading: classesIsLoading } = useCertificateClasses(
    selectedCertificateCode
  );

  return (
    <>
      <GridItem>
        <Select name={certificateCodeName} options={certificateCodeOptions} />
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <Skeleton isLoaded={!!categories && !categorieIsLoading}>
            <Select
              name={certificateCategoryName}
              options={categories as SelectOption[]}
              isDisabled={!categories?.length}
            />
          </Skeleton>
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <Skeleton isLoaded={!!classes && !classesIsLoading}>
            <Select
              name={certificateClassName}
              options={classes as SelectOption[]}
              isDisabled={!classes?.length}
            />
          </Skeleton>
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <InputField
            name={certificatePercentageName}
            min={0}
            max={100}
            registerOptions={{
              valueAsNumber: true,
              min: {
                value: 0,
                message: `${t(
                  'Production.Feedback.Error.CertificatePercentage'
                )}`,
              },
              max: {
                value: 100,
                message: `${t(
                  'Production.Feedback.Error.CertificatePercentage'
                )}`,
              },
            }}
          />
        )}
      </GridItem>
      <GridItem>
        {!!selectedCertificateCode && (
          <InputField
            name={certificateWeightName}
            registerOptions={{
              valueAsNumber: true,
            }}
          />
        )}
      </GridItem>
      <GridItem>
        <IconButton
          variant={'ghost'}
          aria-label={t('PD.Artwork')}
          onClick={onDelete}
          icon={<Text as={'i'} className="ri-close-line" />}
        />
      </GridItem>
    </>
  );
};

export default CertificateInputRow;
