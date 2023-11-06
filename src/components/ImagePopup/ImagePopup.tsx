import { Button, Image } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import Popup, { PopupTrigger } from '../Popup/Popup';
import { isNullOrWhiteSpace } from '../../app/utils/common';

type Props = {
  src?: string | null | undefined;
  alt?: string | null | undefined;
};
const ImagePopup = ({ src, alt }: Props) => {
  const { handleModal } = useContext(ModalContext);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <>
      {!isNullOrWhiteSpace(src) && alt && (
        <Popup
          isPortal={false}
          trigger={PopupTrigger.HOVER}
          triggerElement={
            <Button
              onMouseEnter={() => setIsDirty(true)}
              variant={'tableButton'}
              as="i"
              className="ri-camera-line"
              onClick={() => handleModal(<Image src={src!} alt={alt} />)}
            />
          }
          content={isDirty ? <Image src={src!} alt={alt} /> : <></>}
        />
      )}
    </>
  );
};

export default ImagePopup;
