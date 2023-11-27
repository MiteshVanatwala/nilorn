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

import { useToast } from '../../app/hooks/useToast';
import { useCreateOrUpdateSearchProfile } from '../../app/api/SearchProfile';
type Props = {
  activeSearchProfileName?: string;
  activeSearchProfile(val: boolean): void;
};

const SearchProfileModalContent = ({
  activeSearchProfile,
  activeSearchProfileName,
}: Props) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [searchProfile, setSearchProfile] = useState<string | undefined>();

  const [searchProfileName, setSearchProfileName] = useState<
    string | undefined
  >();
  const {
    mutate: createOrUpdateSearchProfile,
    isSuccess,
    isError,
  } = useCreateOrUpdateSearchProfile();

  const onCancel = () => {
    close();
  };
  async function onSubmit(): Promise<void> {
    const queryString = window.location.href.split('?')[1];
    const data = {
      name: searchProfileName,
      query: queryString,
    };
    createOrUpdateSearchProfile(data);
  }
  useEffect(() => {
    setSearchProfile(activeSearchProfileName);
    setSearchProfileName(activeSearchProfileName);
  }, [activeSearchProfileName]);
  useEffect(() => {
    if (isSuccess) {
      showToast({
        status: 'success',
        description:
          searchProfile !== undefined
            ? t('Filter.FilterUpdated')
            : t('Filter.FilterSaved'),
      });
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      showToast({
        status: 'error',
        description: 'Error while saving search profile',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
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
        <ControlWrapper
          name={'searchProfileName'}
          label={t('Filter.SearchProfileName')}>
          <Input
            defaultValue={searchProfile ?? undefined}
            variant={'standard'}
            name={'searchProfileName'}
            onChange={e => {
              setSearchProfile(undefined);
              activeSearchProfile(false);
              setSearchProfileName(e.target.value);
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
            {searchProfile !== undefined
              ? t('Filter.UpdateSearchProfile')
              : t('Filter.SaveSearchProfile')}
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
