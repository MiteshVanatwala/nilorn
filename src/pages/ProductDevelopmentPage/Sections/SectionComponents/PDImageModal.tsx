import { useTranslation } from 'react-i18next';
import {
  Box,
  Image,
  Button,
  Grid,
  GridItem,
  Text,
  Input,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { COLORS, SIZES, SPACE } from '../../../../theme/Constants';
import { ChangeEvent, useRef, useState, ClipboardEvent } from 'react';
import {
  useDeletePDImage,
  useGetPDImage,
  useUploadPDImage,
} from '../../../../app/api/PDImage';
import { ROLES_ALLOWED_TO_UPLOAD_FILE } from '../../../../app/Permissions/Permissions';
import { useCurrentUser } from '../../../../app/api/User';
import TRANSITION from '../../../../theme/Constants/transition';

type Props = {
  imageUrl: string | undefined;
  no: string;
  pdName: string;
};

const PDImageModal = ({ imageUrl, no, pdName }: Props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  let [pasteError, setPasteError] = useState<boolean>(false);
  const { data: user } = useCurrentUser();

  let {
    data: pdImage,
    isError,
    isLoading,
  } = useGetPDImage(no, imageUrl !== undefined ? true : false);
  const { mutate: uploadProductDevelopmentImage } = useUploadPDImage(no);

  const { mutate: deletePDImage } = useDeletePDImage(no);
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  function submitForm(e: ChangeEvent<HTMLInputElement>) {
    async function onSubmit(e: ChangeEvent<HTMLInputElement>): Promise<void> {
      if (e.target.files !== null) {
        const data = {
          file: e.target.files[0] as Blob,
        };
        uploadProductDevelopmentImage(data);
      }
    }
    onSubmit(e);
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const image = item.getAsFile();
        if (image && inputRef.current) {
          const file = new File([image], pdName + ' - Pasted from clipboard', {
            type: image.type,
          });

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          if (inputRef !== null) {
            inputRef.current.files = dataTransfer.files;
            uploadProductDevelopmentImage({ file: file });
          }
        }

        if (pasteError) {
          setPasteError(false);
        }
      } else {
        if (!pasteError) {
          setPasteError(true);
        }
      }
    }
  };

  return (
    <Box
      tabIndex={0}
      onPaste={handlePaste}
      py={{
        base: SPACE.XS,
        md: SPACE.LG,
      }}
      px={{
        base: SPACE.XS,
        md: SPACE.XXL,
      }}>
      {!isError && !isLoading && pdImage && (
        <Image
          mx={'auto'}
          maxW={450}
          width={450}
          mb={SPACE.XL}
          src={`data:image/jpeg;base64,${pdImage}`}
        />
      )}
      {user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) && (
        <Grid alignItems={'center'} gridAutoFlow={'column'} gap={SPACE.SM}>
          {!isError && !isLoading && pdImage && (
            <>
              <GridItem>
                <Input
                  display={'none'}
                  ref={inputRef}
                  type={'file'}
                  name="file"
                  onChange={submitForm}
                />
                <Button variant={'secondary'} onClick={onButtonClick}>
                  {t('PD.BrowseFile')}
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  w={'100%'}
                  variant={'secondary'}
                  onClick={() => deletePDImage()}
                  leftIcon={<i className={'ri-delete-bin-line'} />}>
                  {t('Common.Delete')}
                </Button>
              </GridItem>
              <GridItem>
                <Text
                  tabIndex={0}
                  transition={TRANSITION.EASEOUT}
                  cursor={'pointer'}
                  w={'100%'}
                  borderRadius={'0.4rem'}
                  height={'3.2rem'}
                  border={'1px dashed'}
                  px={SPACE.MD}
                  lineHeight={'3rem'}
                  borderColor={COLORS.GRAY[20]}
                  _focus={{
                    borderColor: COLORS.GRAY[80],
                    bgColor: COLORS.GRAY[5],
                  }}
                  _hover={{
                    bgColor: COLORS.GRAY[5],
                  }}
                  color={COLORS.GRAY[80]}>
                  {t('PD.OrPaste')}
                </Text>
              </GridItem>
            </>
          )}
          {(isError || isLoading || !pdImage) && (
            <GridItem textAlign={'center'}>
              <Flex
                mb={SPACE.SM}
                flexDirection={'column'}
                borderColor={
                  pasteError === true ? COLORS.ERROR : COLORS.GRAY[5]
                }
                border={'1px dashed'}
                bg={COLORS.GRAY[5]}
                w={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                minW={{
                  md: SIZES.CONTAINER.XXS,
                }}
                minH={SIZES.CONTAINER.XXXS}>
                <VStack>
                  <Text
                    fontSize={SIZES.FONT.LG}
                    color={COLORS.GRAY[60]}
                    as={'i'}
                    className={'ri-upload-2-line'}
                  />
                  <Text mb={SPACE.XXS}>{t('PD.ClickPaste')}</Text>
                </VStack>
                {pasteError && (
                  <Text color={COLORS.ERROR} mb={SPACE.XXS}>
                    {t('PD.Feedback.Error.FileType')}
                  </Text>
                )}
              </Flex>
              <Text align={'center'} mb={SPACE.SM}>
                {t('Common.Or')}
              </Text>
              <Input
                display={'none'}
                ref={inputRef}
                type={'file'}
                name="file"
                onChange={submitForm}
              />
              <Button variant={'secondary'} onClick={onButtonClick}>
                {t('PD.BrowseFile')}
              </Button>
            </GridItem>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default PDImageModal;
