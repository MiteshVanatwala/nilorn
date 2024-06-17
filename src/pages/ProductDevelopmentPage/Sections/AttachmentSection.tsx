import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { MediaFileType } from '../../../app/generate';
import FileSection from './FileSection';
import { useAttachments } from '../../../app/api/mediaFile';
import Alert from '../../../components/Feedback/Alert';
import { useFormContext } from 'react-hook-form';

export const ARTWORK: string = 'artwork';

type Props = {
  no: string;
  disableEdit: boolean;
  createNew?: boolean;
  isClosed: boolean;
};

const AttachmentSection = ({ no, disableEdit, isClosed, createNew }: Props) => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const artwork = watch(ARTWORK);

  const {
    data: attachments,
    isFetched,
    isRefetching,
    isLoading,
  } = useAttachments(no);

  return (
    <>
      <AccordionItem
        title={`${t('PD.AccordionLabels.Attachments')} (${
          (attachments?.length ?? 0) + (artwork ? 1 : 0)
        })`}>
        {createNew ? (
          <Alert status="info" title={`${t('PD.MediaFileInfo')}`} />
        ) : (
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <FileSection
              no={no}
              type={MediaFileType.ARTWORK}
              defaultValue={artwork ? [artwork] : undefined}
              disableEdit={disableEdit || isClosed}
              heading={t('PD.Artwork')}
            />
            {isFetched && !isRefetching && !isLoading && (
              <FileSection
                no={no}
                type={MediaFileType.ATTACHMENT}
                defaultValue={attachments}
                disableEdit={disableEdit || isClosed}
                heading={t('PD.Attatchments')}
              />
            )}
          </Grid>
        )}
      </AccordionItem>
    </>
  );
};

export default AttachmentSection;
