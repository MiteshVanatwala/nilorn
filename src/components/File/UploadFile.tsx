import { Button, HStack, Heading, Input } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ROLES_ALLOWED_TO_UPLOAD_FILE } from '../../app/Permissions/Permissions';
import { useCurrentUser } from '../../app/api/User';
import { SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';

type Props = {
  heading: string;
  onUpload: (files: FileList) => void;
  accept?: string;
  showAdd?: boolean;
  multiple?: boolean;
};
const UploadFile = ({
  heading,
  onUpload,
  accept,
  multiple,
  showAdd = true,
}: Props) => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.currentTarget;
    if (files !== null) {
      return onUpload(files);
    }
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
            accept={accept}
            onChange={e => {
              onFileUpload(e);
              e.target.value = '';
            }}
          />
          {user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) && (
            <Button
              variant={'secondarySmall'}
              onClick={onButtonClick}
              rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}>
              {t('Common.Add')}
            </Button>
          )}
        </>
      )}
    </HStack>
  );
};

export default UploadFile;
