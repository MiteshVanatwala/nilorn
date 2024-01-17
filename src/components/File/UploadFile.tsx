import { Button, HStack, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { handleFileUpload } from '../../app/utils/file';
import { SPACE } from '../../theme/Constants';
import { ROLES_ALLOWED_TO_UPLOAD_FILE } from '../../app/Permissions/Permissions';
import { useCurrentUser } from '../../app/api/User';

type Props = {
  heading: string;
  onUpload: (fileNames: string[]) => void;
  showAdd?: boolean;
  multiple?: boolean;
};
const UploadFile = ({ heading, onUpload, multiple, showAdd = true }: Props) => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
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
    <HStack gap={SPACE.MD}>
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
          {user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) && (
            <Button
              variant={'secondarySmall'}
              onClick={onButtonClick}
              rightIcon={<i className={'ri-add-line'} />}>
              {t('Common.Add')}
            </Button>
          )}
        </>
      )}
    </HStack>
  );
};

export default UploadFile;
