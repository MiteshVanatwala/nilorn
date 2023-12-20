import { useTranslation } from 'react-i18next';
import {
  Box,
  Image,
  Button,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import { COLORS, SPACE } from '../../../../theme/Constants';
import { ChangeEvent, useRef } from 'react';
import { handleFileUpload } from '../../../../app/utils/file';

type Props = {
  imageUrl: string;
  onUpload: (fileNames: string[]) => void;
};

const PDImageModal = ({ imageUrl, onUpload }: Props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    onUpload(handleFileUpload(e));
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  imageUrl = '';
  if (imageUrl) {
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
            <Input
              type={'file'}
              display={'none'}
              ref={inputRef}
              multiple={false}
              onChange={onFileUpload}
            />
            <Button w={'100%'} variant={'secondary'} onClick={onButtonClick}>
              {t('PD.BrowseFile')}
            </Button>
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
      <Image
        loading="lazy"
        mx={'auto'}
        maxW={450}
        width={450}
        mb={SPACE.XL}
        src={imageUrl + '?width=450'}
      />
      <Grid gridAutoFlow={'column'} gap={SPACE.SM} justifyContent={'center'}>
        <GridItem>
          <Text align={'center'} mb={SPACE.MD}>
            or
          </Text>
          <Input
            type={'file'}
            display={'none'}
            ref={inputRef}
            multiple={false}
            onChange={onFileUpload}
          />
          <Button variant={'secondary'} onClick={onButtonClick}>
            {t('PD.BrowseFile')}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PDImageModal;
