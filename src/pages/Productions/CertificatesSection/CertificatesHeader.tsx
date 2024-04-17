import { GridItem } from '@chakra-ui/react';
import FormLabelComponent from '../../../components/Form/FormLabelComponent';
import { useTranslation } from 'react-i18next';

const CertificatesHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <GridItem>
        <FormLabelComponent name={''} label={t('Production.CertificateCode')} />
      </GridItem>
      <GridItem>
        <FormLabelComponent
          name={''}
          label={t('Production.CertificateCategory')}
        />
      </GridItem>
      <GridItem>
        <FormLabelComponent
          name={''}
          label={t('Production.CertificateClass')}
        />
      </GridItem>
      <GridItem>
        <FormLabelComponent name={''} label={t('Common.Percentage')} />
      </GridItem>
      <GridItem>
        <FormLabelComponent
          name={''}
          label={t('Production.CertificateWeight')}
        />
      </GridItem>
      <GridItem />
    </>
  );
};

export default CertificatesHeader;
