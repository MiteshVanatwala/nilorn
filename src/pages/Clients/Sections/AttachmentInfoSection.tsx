import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { GRID } from '../../../theme/Constants';
import InputField from '../../../components/Form/InputField';

type Props = {
  disableEdit?: boolean;
};

const AttachmentInfoSection = ({ disableEdit = false }: Props) => {
  const { t } = useTranslation();
  return (
    <AccordionItem title={`${t('Client.AccordionLabels.Attachments')}`}>
      <HStack>
        <InputField
          label={`${t('Client.FormContent.TeamsName')}`}
          placeholder={`${t('Client.FormContent.TeamsNamePlaceholder')}`}
          name={'teamsName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.ChannelName')}`}
          placeholder={`${t('Client.FormContent.ChannelNamePlaceholder')}`}
          name={'channelName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.ArtworkFolderName')}`}
          placeholder={`${t(
            'Client.FormContent.ArtworkFolderNamePlaceholder'
          )}`}
          name={'artWorkFolderName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />

        <InputField
          label={`${t('Client.FormContent.AttachmentFolderName')}`}
          placeholder={`${t(
            'Client.FormContent.AttachmentFolderNamePlaceholder'
          )}`}
          name={'attachmentFolderName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 60 }}
        />
      </HStack>
    </AccordionItem>
  );
};

export default AttachmentInfoSection;
