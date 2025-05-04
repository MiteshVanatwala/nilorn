import { Grid, GridItem } from '@chakra-ui/react';
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
      <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          colSpan={{
            base: 12,
            lg: 6,
          }}>
          <InputField
            label={`${t('Client.FormContent.TeamsName')}`}
            placeholder={`${t('Client.FormContent.TeamsNamePlaceholder')}`}
            name={'teamsName'}
            readonly={disableEdit}
            registerOptions={{ maxLength: 60 }}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 0,
            lg: 6,
          }}>
          <InputField
            label={`${t('Client.FormContent.ChannelName')}`}
            placeholder={`${t('Client.FormContent.ChannelNamePlaceholder')}`}
            name={'channelName'}
            readonly={disableEdit}
            registerOptions={{ maxLength: 60 }}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 12,
            lg: 6,
          }}>
          <InputField
            label={`${t('Client.FormContent.ArtworkFolderName')}`}
            placeholder={`${t('Client.FormContent.ArtworkFolderNamePlaceholder')}`}
            name={'artWorkFolderName'}
            readonly={disableEdit}
            registerOptions={{ maxLength: 60 }}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 0,
            lg: 6,
          }}>
          <InputField
            label={`${t('Client.FormContent.AttachmentFolderName')}`}
            placeholder={`${t('Client.FormContent.AttachmentFolderNamePlaceholder')}`}
            name={'attachmentFolderName'}
            readonly={disableEdit}
            registerOptions={{ maxLength: 60 }}
          />
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default AttachmentInfoSection;
