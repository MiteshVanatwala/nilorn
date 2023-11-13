import {
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import { SPACE } from '../../theme/Constants';
import ModalHeading from '../Modal/ModalHeading';
import ControlWrapper from '../Form/ControlWrapper';

type Props = {
  activeSearchProfileName?: string;
  activeSearchProfile(val: boolean): void;
};

const SearchProfileModalContent = ({
  activeSearchProfile,
  activeSearchProfileName,
}: Props) => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [searchProfile, setSearchProfile] = useState<string | undefined>();

  const onCancel = () => {
    close();
  };

  const onSubmit = () => {
    close();
  };

  useEffect(() => {
    setSearchProfile(activeSearchProfileName);
  }, [activeSearchProfileName]);

  return (
    <>
      <ModalBody>
        <ModalHeading
          title={
            !searchProfile
              ? t('Filter.SaveSearchProfile')
              : t('Filter.UpdateSearchProfile')
          }
        />
        <ControlWrapper name={'name'} label={t('Filter.SearchProfileName')}>
          <Input
            defaultValue={searchProfile ?? undefined}
            variant={'standard'}
            name={'name'}
            onChange={e => {
              setSearchProfile(undefined);
              activeSearchProfile(false);
            }}
          />
        </ControlWrapper>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            type="submit"
            variant={'primary'}
            onClick={onSubmit}
            rightIcon={<i className="ri-save-line" />}>
            <>
              {!searchProfile
                ? t('Filter.SaveSearchProfile')
                : t('Filter.UpdateSearchProfile')}
            </>
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<i className="ri-close-line" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};

export default SearchProfileModalContent;
