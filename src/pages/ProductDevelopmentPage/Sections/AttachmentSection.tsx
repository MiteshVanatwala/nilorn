import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SIZES, SPACE } from '../../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { images } from '../../../assets';
import { MediaFileType } from '../../../app/generate';
import FileSection from './FileSection';

// const ARTWORK: string = 'artwork';
// const ATTACHMERNTS: string = 'attachments';

type Props = {
  no: string;
  disableEdit: boolean;
  isClosed: boolean;
};

const AttachmentSection = ({ no, disableEdit, isClosed }: Props) => {
  // const { setValue, unregister, watch, getValues } = useFormContext();
  const { t } = useTranslation();

  // const artwork = watch(ARTWORK);
  // const attachments: string[] = watch(ATTACHMERNTS);

  // const uploadArtwork = (uploaded: string[]) => {
  //   setValue(ARTWORK, uploaded[0]);
  // };

  // const uploadAttachments = (uploaded: string[]) => {
  //   setValue(ATTACHMERNTS, uploaded);
  // };

  // const removeAttachment = (fileName: string) => {
  //   const tmp = (getValues(ATTACHMERNTS) as string[]).filter(
  //     a => a !== fileName
  //   );
  //   setValue(ATTACHMERNTS, tmp);
  // };

  return (
    // attachments?.length !== 0 || artwork?.length !== 0 ||
    <>
      {!isClosed && (
        <AccordionItem
          title={`${t('PD.AccordionLabels.Attachments')} (${
            0
            // (attachments?.length ?? 0) + (artwork ? 1 : 0)
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
              disableEdit={false}
              isClosed={false}
              heading={t('PD.AccordionLabels.Artwork')}
            />
            <FileSection
              no={no}
              type={MediaFileType.ATTACHMENT}
              disableEdit={false}
              isClosed={false}
              heading={t('PD.AccordionLabels.Attatchments')}
            />
          </Grid>
        </AccordionItem>
      )}
    </>
  );
};

export default AttachmentSection;
