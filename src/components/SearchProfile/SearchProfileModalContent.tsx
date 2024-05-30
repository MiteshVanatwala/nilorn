import {
  Button,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useContext, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import { COLORS, SPACE } from '../../theme/Constants';
import ModalHeading from '../Modal/ModalHeading';
import {
  useCreateOrUpdateSearchProfile,
  useDeleteSearchProfile,
} from '../../app/api/SearchProfile';
import FormLabelComponent from '../Form/FormLabelComponent';
import RemixIcon from '../Icon/RemixIcon';

type Props = {
  activeSearchProfileName?: string;
  setActiveSearchProfileName(val: string): void;
  isValueSelected: boolean;
};

const SearchProfileModalContent = ({
  activeSearchProfileName,
  setActiveSearchProfileName,
  isValueSelected,
}: Props) => {
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
  const { mutate: createOrUpdateSearchProfile } =
    useCreateOrUpdateSearchProfile();
  const { mutate: deleteSearchProfile } = useDeleteSearchProfile();

  const [inputChanged, setInputChanged] = useState(false);

  const onCancel = () => {
    setSearchProfileName('');
    close();
  };

  const onDelete = () => {
    if (searchProfileName) {
      setSearchProfileName('');
      deleteSearchProfile(searchProfileName, {
        onSuccess: async () => {
          close();
        },
      });
    }
  };

  async function onSubmit(): Promise<void> {
    const queryString = window.location.href.split('?')[1];
    setActiveSearchProfileName(searchProfileName ?? '');

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
      createOrUpdateSearchProfile(data, {
        onSuccess: async () => {
          close();
        },
      });
    }
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProfileName(e.target.value);
    setErrorMsgName(undefined);
    setInputChanged(true);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <ModalBody>
        <ModalHeading title={t('Filter.SearchProfile.Heading')} />
        <FormLabelComponent
          error={errorMsgName ? errorFieldMsg : undefined}
          label={`${t('Filter.SearchProfile.Name')} *`}
          name={'searchProfileName'}
        />
        <Input
          defaultValue={activeSearchProfileName ?? undefined}
          variant={'standard'}
          name={'searchProfileName'}
          placeholder={t('Common.Placeholder')}
          onChange={handleInputChange}
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
            rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}>
            {t('Common.Save')}
          </Button>
          {isValueSelected && (
            <Button
              isDisabled={
                inputChanged && activeSearchProfileName !== searchProfileName
              }
              variant={'deleteBtn'}
              onClick={onDelete}
              rightIcon={<RemixIcon component="i" icon="DELETE_BIN_LINE" />}>
              {t('Common.Delete')}
            </Button>
          )}

          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </form>
  );
};
export default SearchProfileModalContent;
