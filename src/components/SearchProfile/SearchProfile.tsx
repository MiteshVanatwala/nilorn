import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import SelectBase from '../Form/SelectBase';
import { useState } from 'react';
import { SelectOption } from '../Filter/FilterHelper';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption | undefined>();

  const onChange = (option: any, actionMeta: ActionMeta<SelectOption>) => {
    setSelected(option);
  };

  return (
    <>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <SelectBase
          name="SearchProfile"
          onChange={onChange}
          value={selected}
          options={[{ label: 'My custom filter', value: 'x' }]}
        />
        <Button
          variant={'secondary'}
          rightIcon={<i className="ri-save-line" />}
          onClick={() => handleModal(<SearchProfileModalContent />)}>
          {t('Filter.saveSearchProfile')}{' '}
        </Button>
      </VStack>
    </>
  );
};

export default SearchProfile;
