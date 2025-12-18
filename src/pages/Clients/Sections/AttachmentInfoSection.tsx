import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import InputField from '../../../components/Form/InputField';

type Props = {
  disableEdit?: boolean;
  displayPlaecholder?: boolean;
};

const AttachmentInfoSection = ({
  disableEdit = false,
  displayPlaecholder = false,
}: Props) => {
  const { t } = useTranslation();
  return (
    <AccordionItem title={`${t('Client.AccordionLabels.Attachments')}`}>
      <HStack>
        <InputField
          label={`${t('Client.FormContent.TeamsName')}`}
          placeholder={
            displayPlaecholder
              ? `${t('Client.FormContent.TeamsNamePlaceholder')}`
              : ''
          }
          name={'teamsName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 150 }}
        />

        <InputField
          label={`${t('Client.FormContent.ChannelName')}`}
          placeholder={
            displayPlaecholder
              ? `${t('Client.FormContent.ChannelNamePlaceholder')}`
              : ''
          }
          name={'channelName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 150 }}
        />

        <InputField
          label={`${t('Client.FormContent.ArtworkFolderName')}`}
          placeholder={
            displayPlaecholder
              ? `${t('Client.FormContent.ArtworkFolderNamePlaceholder')}`
              : ''
          }
          name={'artWorkFolderName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 150 }}
        />

        <InputField
          label={`${t('Client.FormContent.AttachmentFolderName')}`}
          placeholder={
            displayPlaecholder
              ? `${t('Client.FormContent.AttachmentFolderNamePlaceholder')}`
              : ''
          }
          name={'attachmentFolderName'}
          readonly={disableEdit}
          registerOptions={{ maxLength: 150 }}
        />
      </HStack>
    </AccordionItem>
  );
};

export default AttachmentInfoSection;
