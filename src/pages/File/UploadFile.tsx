import { Button, HStack, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { handleFileUpload } from '../../app/utils/file';

type Props = {
  heading: string;
  onUpload: (fileNames: string[]) => void;
  showAdd?: boolean;
  multiple?: boolean;
};
const UploadFile = ({ heading, onUpload, multiple, showAdd = true }: Props) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    onUpload(handleFileUpload(e));
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <HStack>
      <Heading variant={'h5'}>{heading}</Heading>
      {showAdd && (
        <>
          <Input
            type={'file'}
            display={'none'}
            ref={inputRef}
            multiple={multiple}
            onChange={onFileUpload}
          />
          <Button
            variant={'secondarySmall'}
            onClick={onButtonClick}
            rightIcon={<i className={'ri-add-line'} />}>
            {t('Common.Add')}
          </Button>
        </>
      )}
    </HStack>
  );
};

export default UploadFile;
