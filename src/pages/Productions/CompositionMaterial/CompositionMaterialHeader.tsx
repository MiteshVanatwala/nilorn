import { GridItem } from '@chakra-ui/react';
import FormLabelComponent from '../../../components/Form/FormLabelComponent';
import { useTranslation } from 'react-i18next';

const CompositionMaterialHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <GridItem>
        <FormLabelComponent
          name={''}
          label={t('Production.CompositionMaterial')}
        />
      </GridItem>
      <GridItem>
        <FormLabelComponent name={''} label={t('Common.Percentage_sign')} />
      </GridItem>
      <GridItem></GridItem>
    </>
  );
};

export default CompositionMaterialHeader;
