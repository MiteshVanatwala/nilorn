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
  currentFilter?: string;
};

const SearchProfileModalContent = ({ currentFilter }: Props) => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [filter, setFilter] = useState<string | undefined>();

  const onCancel = () => {
    close();
  };

  const onSubmit = () => {
    close();
  };

  useEffect(() => {
    setFilter(currentFilter);
  }, [currentFilter]);

  return (
    <>
      <ModalBody>
        <ModalHeading
          title={
            filter !== undefined
              ? t('Filter.UpdateSearchProfile')
              : t('Filter.SaveSearchProfile')
          }
        />
        <ControlWrapper name={'name'} label={t('Filter.SearchProfileName')}>
          <Input
            defaultValue={filter ?? undefined}
            variant={'standard'}
            name={'name'}
            onChange={e => {
              setFilter(undefined);
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
              {filter !== undefined
                ? t('Filter.UpdateSearchProfile')
                : t('Filter.SaveSearchProfile')}
            </>
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
