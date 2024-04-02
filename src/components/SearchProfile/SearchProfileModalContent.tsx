import {
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import { COLORS, SPACE } from '../../theme/Constants';
import ModalHeading from '../Modal/ModalHeading';
import { useToast } from '../../app/hooks/useToast';
import {
  useCreateOrUpdateSearchProfile,
  useDeleteSearchProfile,
} from '../../app/api/SearchProfile';
import FormLabelComponent from '../Form/FormLabelComponent';
import { FieldError } from 'react-hook-form';
type Props = {
  activeSearchProfileName?: string;
  setActiveSearchProfileName(val: string): void;
  setDefaultSearchProfile(val: string): void;
};

const SearchProfileModalContent = ({
  activeSearchProfileName,
  setActiveSearchProfileName,
  setDefaultSearchProfile,
}: Props) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [errorMsgQuery, setErrorMsgQuery] = useState<string | undefined>();
  const [errorMsgName, setErrorMsgName] = useState<string | undefined>();
  const errorFieldMsg: FieldError = {
    type: 'required',
  };
  const [searchProfileName, setSearchProfileName] = useState<
    string | undefined
  >(activeSearchProfileName);
  const {
    mutate: createOrUpdateSearchProfile,
    isSuccess,
    isError,
  } = useCreateOrUpdateSearchProfile();
  const { mutate: deleteSearchProfile, isError: deleteError } =
    useDeleteSearchProfile();

  const onCancel = () => {
    close();
  };

  const onDelete = () => {
    if (searchProfileName) {
      deleteSearchProfile(searchProfileName);
    }
  };

  async function onSubmit(): Promise<void> {
    const queryString = window.location.href.split('?')[1];
    setDefaultSearchProfile(searchProfileName ?? '');

    const data = {
      name: searchProfileName,
      query: queryString,
    };
    if (queryString === undefined) {
      setErrorMsgQuery(`${t('Errors.EmptyFilter')}`);
    } else setErrorMsgQuery(undefined);
    if (searchProfileName === '') {
      setErrorMsgName(`${t('Errors.FilterName')}`);
    } else {
      setErrorMsgName(undefined);
    }
    if (searchProfileName !== '' && queryString) {
      createOrUpdateSearchProfile(data);
    }
  }
  useEffect(() => {
    setActiveSearchProfileName(searchProfileName ?? '');
    setSearchProfileName(searchProfileName);
  }, [searchProfileName, setActiveSearchProfileName]);
  useEffect(() => {
    if (isSuccess) {
      showToast({
        status: 'success',
        description: t('Filter.FilterSaved'),
      });
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      showToast({
        status: 'error',
        description: t('Errors.SearchProfileSave'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  useEffect(() => {
    if (deleteError) {
      showToast({
        status: 'error',
        description: t('Errors.SearchProfileDelete'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError]);
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onFormSubmit}>
      <ModalBody>
        <ModalHeading title={t('Filter.SaveSearchProfile')} />
        <FormLabelComponent
          error={errorMsgName ? errorFieldMsg : undefined}
          label={`${t('Filter.SearchProfileName')} *`}
          name={'searchProfileName'}
        />
        <Input
          defaultValue={activeSearchProfileName ?? undefined}
          variant={'standard'}
          name={'searchProfileName'}
          placeholder={t('Common.Placeholder')}
          onChange={e => {
            setSearchProfileName(e.target.value);
            setActiveSearchProfileName(e.target.value);
            setDefaultSearchProfile('');
            setErrorMsgName(undefined);
          }}
        />
        {errorMsgName && <Text color={COLORS.ERROR}>{errorMsgName}</Text>}
        {errorMsgQuery && <Text color={COLORS.ERROR}>{errorMsgQuery}</Text>}
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            type="submit"
            variant={'primary'}
            onClick={onSubmit}
            rightIcon={<i className="ri-save-line" />}>
            {t('Common.Save')}
          </Button>
          <Button
            variant={'primary'}
            onClick={onDelete}
            rightIcon={<i className="ri-delete-line" />}>
            {t('Common.Delete')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<i className="ri-close-line" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </form>
  );
};
export default SearchProfileModalContent;
