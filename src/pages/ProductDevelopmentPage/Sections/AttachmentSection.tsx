import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SIZES, SPACE } from '../../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { images } from '../../../assets';

const ARTWORK: string = 'artwork';
const ATTACHMERNTS: string = 'attachments';

type Props = {
  disableEdit: boolean;
  isClosed: boolean;
};

const AttachmentSection = ({ disableEdit, isClosed }: Props) => {
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
            <GridItem colSpan={12}>
              {!disableEdit && (
                <UploadFile
                  heading={t('PD.Artwork')}
                  onUpload={uploadArtwork}
                  showAdd={!artwork}
                />
              )}
            </GridItem>
            <GridItem
              colSpan={{
                lg: 2,
              }}>
              {artwork && (
                <File
                  name={artwork}
                  url="#"
                  icon={
                    <Image
                      src={images.pdf}
                      height={SIZES.ICON.SM}
                      objectFit={'contain'}
                      width="auto"
                    />
                  }
                  onRemove={disableEdit ? undefined : () => unregister(ARTWORK)}
                />
              )}
            </GridItem>
            <GridItem colSpan={12}>
              {!disableEdit && (
                <UploadFile
                  heading={t('PD.AccordionLabels.Attachments')}
                  onUpload={uploadAttachments}
                  multiple={true}
                />
              )}
            </GridItem>
            {attachments?.map(a => (
              <GridItem
                key={a}
                colSpan={{
                  base: 1,
                  lg: 2,
                }}>
                <File name={a} url="#" onRemove={removeAttachment} />
              </GridItem>
            ))}
          </Grid>
        </AccordionItem>
      )}
    </>
  );
};

export default AttachmentSection;
