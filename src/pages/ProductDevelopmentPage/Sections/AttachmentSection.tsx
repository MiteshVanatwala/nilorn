import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { MediaFileType } from '../../../app/generate';
import FileSection from './FileSection';
import { useAttachments } from '../../../app/api/mediaFile';

export const ARTWORK: string = 'artwork';

type Props = {
  no: string;
  disableEdit: boolean;
  isClosed: boolean;
};

const AttachmentSection = ({ no, disableEdit, isClosed }: Props) => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const artwork = watch(ARTWORK);

  const { data: attachments, isFetched } = useAttachments(no);

  return (
    <>
      {(attachments?.length !== 0 || artwork?.length !== 0 || !isClosed) && (
        <AccordionItem
          title={`${t('PD.AccordionLabels.Attachments')} (${
            (attachments?.length ?? 0) + (artwork ? 1 : 0)
          })`}>
          <Grid
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}
            templateColumns={GRID.TEMPLATE_COLUMNS}>
            <FileSection
              no={no}
              type={MediaFileType.ARTWORK}
              defaultValue={artwork ? [artwork] : undefined}
              disableEdit={disableEdit}
              isClosed={isClosed}
              heading={t('PD.Artwork')}
            />
            {isFetched && (
              <FileSection
                no={no}
                type={MediaFileType.ATTACHMENT}
                defaultValue={attachments}
                disableEdit={disableEdit}
                isClosed={isClosed}
                heading={t('PD.Attatchments')}
              />
            )}
          </Grid>
        </AccordionItem>
      )}
    </>
  );
};

export default AttachmentSection;
