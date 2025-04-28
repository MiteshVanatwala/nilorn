import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';

type Props = {
  disableEdit?: boolean;
};

const ClientSourcingSection = ({ disableEdit = false }: Props) => {
  const { t } = useTranslation();

  return (
    <AccordionItem title={`${t('PD.AccordionLabels.Requirements')}`}>
      <p>ClientSourcingSection</p>
    </AccordionItem>
  );
};
export default ClientSourcingSection;
