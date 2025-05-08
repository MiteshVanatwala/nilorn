import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { GRID } from '../../../theme/Constants';
import InputField from '../../../components/Form/InputField';

type Props = {
  disableEdit?: boolean;
};

const ClientGeneralSection = ({ disableEdit = false }: Props) => {
  const { t } = useTranslation();

  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <HStack>
        <InputField
          label={`${t('Client.FormContent.ClientNo')}`}
          name={'no'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.ClientName')}`}
          name={'name'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.KeyAccountManager')}`}
          name={'keyAccountManager.name'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.AccountManager')}`}
          name={'accountManager.name'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />
      </HStack>
    </AccordionItem>
  );
};

export default ClientGeneralSection;
