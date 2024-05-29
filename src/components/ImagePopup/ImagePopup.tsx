import { Button, Image } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { isNullOrWhiteSpace } from '../../app/utils/common';
import { REMIX_ICONS } from '../../theme/Constants';
import Popup, { PopupTrigger } from '../Popup/Popup';

type Props = {
  src?: string | null | undefined;
  alt?: string | null | undefined;
  thumbnail?: boolean;
};
const ImagePopup = ({ src, alt, thumbnail }: Props) => {
  const { handleModal } = useContext(ModalContext);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <>
      {!isNullOrWhiteSpace(src) && alt && (
        <Popup
          isPortal={false}
          trigger={PopupTrigger.HOVER}
          triggerElement={
            thumbnail ? (
              <Image
                boxSize="30px"
                objectFit="cover"
                src={src!}
                onMouseEnter={() => setIsDirty(true)}
                alt={alt}
              />
            ) : (
              <Button
                onMouseEnter={() => setIsDirty(true)}
                variant={'tableButton'}
                as="i"
                className={REMIX_ICONS.CLASS_NAMES.CAMERA_LINE}
                onClick={() => handleModal(<Image src={src!} alt={alt} />)}
              />
            )
          }
          content={isDirty ? <Image src={src!} alt={alt} /> : <></>}
        />
      )}
    </>
  );
};

export default ImagePopup;
