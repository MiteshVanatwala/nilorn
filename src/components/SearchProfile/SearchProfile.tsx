import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import SelectBase from '../Form/SelectBase';
import { useState } from 'react';
import { SelectOption } from '../Filter/FilterHelper';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';
import { useFormContext } from 'react-hook-form';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption | undefined>();
  const { setValue, reset } = useFormContext();

  const onChange = (option: any, actionMeta: ActionMeta<SelectOption>) => {
    reset();

    setSelected(option);
    const optionVal = option.value;
    const splitOptionVal = optionVal.split('&');

    splitOptionVal.forEach((item: string) => {
      const splitItem = item.split('=');
      setValue(splitItem[0], splitItem[1]);
    });
  };

  return (
    <>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <label>{t('Filter.SavedFilterLabel')}</label>
        <SelectBase
          name="SearchProfile"
          onChange={onChange}
          value={selected}
          options={[
            { label: 'My custom filter', value: 'search=testing&filter=hej' },
            { label: 'My custom filter2', value: 'search=wopop' },
          ]}
        />
        <Button
          marginTop={'.5rem'}
          fontWeight={'500'}
          variant={'secondary'}
          height={'3.5rem'}
          leftIcon={<i className="ri-save-line" />}
          onClick={() => handleModal(<SearchProfileModalContent />)}>
          {t('Filter.saveSearchProfile')}
        </Button>
      </VStack>
    </>
  );
};

export default SearchProfile;
