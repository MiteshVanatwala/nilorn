import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { READ_ONLY_OPACITY } from '../../../app/utils/constant';

type Props = {
  disableEdit?: boolean;
};

const ClientGeneralSection = ({ disableEdit = false }: Props) => {
  const { t } = useTranslation();

  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <HStack opacity={disableEdit ? READ_ONLY_OPACITY : 1}>
        <p>ClientGeneralSection</p>
      </HStack>
    </AccordionItem>
  );
};

export default ClientGeneralSection;
