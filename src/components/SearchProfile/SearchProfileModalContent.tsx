import {
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import { SPACE } from '../../theme/Constants';
import ModalHeading from '../Modal/ModalHeading';
import ControlWrapper from '../Form/ControlWrapper';

const SearchProfileModalContent = () => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);

  const onCancel = () => {
    close();
  };

  const onSubmit = () => {
    close();
  };

  return (
    <>
      <ModalBody>
        <ModalHeading title={t('Filter.SearchProfileName')} />
        <ControlWrapper name={'name'} label={t('Filter.SearchProfileName')}>
          <Input variant={'standard'} name={'name'} />
        </ControlWrapper>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            type="submit"
            variant={'primary'}
            onClick={onSubmit}
            rightIcon={<i className="ri-save-line" />}>
            <> {t('Filter.SaveSearchProfile')}</>
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<i className="ri-close-line" />}>
            <> {t('Common.Cancel')}</>
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};

export default SearchProfileModalContent;
