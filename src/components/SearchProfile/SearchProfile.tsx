import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import SelectBase from '../Form/SelectBase';
import { useState } from 'react';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';
import { SelectOption } from '../../app/types/types';
import ControlWrapper from '../Form/ControlWrapper';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption<string> | undefined>();

  const onChange = (option: any, actionMeta: ActionMeta<SelectOption>) => {
    setSelected(option);
  };

  return (
    <VStack minW={'24rem'} alignItems={'left'}>
      <ControlWrapper name="SearchProfile" label={t('Filter.SavedFilters')}>
        <SelectBase
          name="SearchProfile"
          onChange={onChange}
          value={selected}
          options={[{ label: 'My custom filter', value: 'x' }]}
        />
      </ControlWrapper>
      <Button
        variant={'secondary'}
        rightIcon={<i className="ri-save-line" />}
        onClick={() => handleModal(<SearchProfileModalContent />)}>
        {t('Filter.saveSearchProfile')}{' '}
      </Button>
    </VStack>
  );
};

export default SearchProfile;
