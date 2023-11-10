import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import File from '../../File/File';
import UploadFile from '../../File/UploadFile';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';

const ARTWORK: string = 'artwork';
const ATTACHMERNTS: string = 'attachments';

const AttachmentSection = () => {
  const { setValue, unregister, watch, getValues } = useFormContext();
  const { t } = useTranslation();

  const artwork = watch(ARTWORK);
  const attachments: string[] = watch(ATTACHMERNTS);

  const uploadArtwork = (uploaded: string[]) => {
    setValue(ARTWORK, uploaded[0]);
  };

  const uploadAttachments = (uploaded: string[]) => {
    setValue(ATTACHMERNTS, uploaded);
  };

  const removeAttachment = (fileName: string) => {
    const tmp = (getValues(ATTACHMERNTS) as string[]).filter(
      a => a !== fileName
    );
    setValue(ATTACHMERNTS, tmp);
  };

  return (
    <AccordionItem
      title={`${t('PD.Attachments')} (${
        (attachments?.length ?? 0) + (artwork ? 1 : 0)
      })`}>
      <Grid
        gap={{
          base: SPACE.XXS,
          lg: SPACE.SM,
        }}
        templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem colSpan={12}>
          <UploadFile
            heading={t('PD.Artwork')}
            onUpload={uploadArtwork}
            showAdd={!artwork}
          />
        </GridItem>
        <GridItem
          colSpan={{
            lg: 2,
          }}>
          {artwork && (
            <File
              name={artwork}
              url="#"
              iconClass="ri-file-pdf-line"
              onRemove={() => unregister(ARTWORK)}
            />
          )}
        </GridItem>
        <GridItem colSpan={12}>
          <UploadFile
            heading={t('PD.Attachments')}
            onUpload={uploadAttachments}
            multiple={true}
          />
        </GridItem>
        {attachments?.map(a => (
          <GridItem
            colSpan={{
              base: 1,
              lg: 2,
            }}>
            <File name={a} url="#" onRemove={removeAttachment} />
          </GridItem>
        ))}
      </Grid>
    </AccordionItem>
  );
};

export default AttachmentSection;
