import { useTranslation } from 'react-i18next';
import {
  Box,
  Image,
  Button,
  Grid,
  GridItem,
  Text,
  Input,
} from '@chakra-ui/react';
import { COLORS, SPACE } from '../../../../theme/Constants';
import { useRef } from 'react';
import { useGetPDImage, useUploadPDImage } from '../../../../app/api/PDImage';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import InputField from '../../../../components/Form/InputField';

type Props = {
  imageUrl: string;
  no: string;
};

const PDImageModal = ({ imageUrl, no }: Props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm();

  let { data: pdImage } = useGetPDImage(
    no,
    imageUrl !== undefined ? true : false
  );

  const { mutate: uploadProductDevelopmentImage } = useUploadPDImage(no);

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      const data = {
        file: form.file[0] as Blob,
      };
      uploadProductDevelopmentImage(data);
    }
    onSubmit(form);
  }

  if (imageUrl !== undefined) {
    return (
      <Box
        py={{
          base: SPACE.XS,
          md: SPACE.LG,
        }}
        px={{
          base: SPACE.XS,
          md: SPACE.XXL,
        }}>
        <Image
          loading="lazy"
          mx={'auto'}
          maxW={450}
          width={450}
          mb={SPACE.XL}
          src={imageUrl + '?width=450'}
        />
        <Grid gridAutoFlow={'column'} gap={SPACE.SM}>
          <GridItem>
            <FormProvider {...form}>
              <form onChange={form.handleSubmit(submitForm)}>
                <InputField type={'file'} name="file" />
                <Button variant={'secondary'} onClick={onButtonClick}>
                  {t('PD.BrowseFile')}
                </Button>
              </form>
            </FormProvider>
          </GridItem>
          <GridItem>
            <Button
              w={'100%'}
              variant={'secondary'}
              onClick={() => console.log('test')}
              leftIcon={<i className={'ri-delete-bin-line'} />}>
              {t('Common.Delete')}
            </Button>
          </GridItem>
          <GridItem>
            <Button
              variant={'secondary'}
              bg={'transparent'}
              color={COLORS.GRAY[80]}
              border={'1px dashed'}
              _hover={{
                bg: 'transparent',
                color: COLORS.GRAY[80],
                border: '1px solid',
              }}
              borderColor={COLORS.GRAY[60]}
              onClick={() => console.log('test')}
              leftIcon={<i className={'ri-clipboard-line'} />}>
              {t('PD.ClickPaste')}
            </Button>
          </GridItem>
        </Grid>
      </Box>
    );
  }
  return (
    <Box
      py={{
        base: SPACE.XS,
        md: SPACE.LG,
      }}
      px={{
        base: SPACE.XS,
        md: SPACE.XXL,
      }}>
      <Grid gridAutoFlow={'column'} gap={SPACE.SM} justifyContent={'center'}>
        <GridItem>
          <Text align={'center'} mb={SPACE.MD}>
            or
          </Text>
          <FormProvider {...form}>
            <form onChange={form.handleSubmit(submitForm)}>
              <InputField type={'file'} name="file" />
              <Button variant={'secondary'} onClick={onButtonClick}>
                {t('PD.BrowseFile')}
              </Button>
            </form>
          </FormProvider>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PDImageModal;
