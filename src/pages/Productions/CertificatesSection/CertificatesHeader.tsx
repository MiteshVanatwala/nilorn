import { FormLabel, GridItem } from '@chakra-ui/react';
import FormLabelComponent from '../../../components/Form/FormLabelComponent';
import { useTranslation } from 'react-i18next';

const CertificatesHeader = () => {
  const { t } = useTranslation();
  console.log();
  return (
    <>
      <GridItem>
        <FormLabel paddingBottom={'.2rem'} mb="0" w={'auto'}>
          {t('Production.CertificateCode')}
        </FormLabel>
      </GridItem>
      <GridItem>
        <FormLabel paddingBottom={'.2rem'} mb="0" w={'auto'}>
          {t('Production.CertificateCategory')}
        </FormLabel>
      </GridItem>
      <GridItem>
        <FormLabel paddingBottom={'.2rem'} mb="0" w={'auto'}>
          {t('Production.CertificateClass')}
        </FormLabel>
      </GridItem>
      <GridItem>
        <FormLabel paddingBottom={'.2rem'} mb="0" w={'auto'}>
          {t('Common.Percentage')}
        </FormLabel>
      </GridItem>
      <GridItem>
        <FormLabel paddingBottom={'.2rem'} mb="0" w={'auto'}>
          {t('Production.CertificateWeight')}
        </FormLabel>
      </GridItem>
      <GridItem />
    </>
  );
};

export default CertificatesHeader;
