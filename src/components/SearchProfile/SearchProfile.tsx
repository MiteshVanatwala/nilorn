import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import SelectBase from '../Form/SelectBase';
import { useState } from 'react';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';
import { useFormContext } from 'react-hook-form';
import { Box, GridItem } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';
import ControlWrapper from '../Form/ControlWrapper';
import { SPACE } from '../../theme/Constants';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption<string> | undefined>();
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
    <GridItem
      marginTop={{
        base: SPACE.XS,
        md: '0',
      }}
      colSpan={2}>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <ControlWrapper name="SearchProfile" label={t('Filter.SavedFilters')}>
          <SelectBase
            name="SearchProfile"
            onChange={onChange}
            value={selected}
            options={[
              {
                label: 'My custom filter',
                value: 'search=testing&filter=hej',
              },
              { label: 'My custom filter2', value: 'search=wopop' },
            ]}
          />
        </ControlWrapper>
        <Button
          zIndex={'-1'}
          marginTop={SPACE.XXS}
          fontWeight={'500'}
          variant={'secondary'}
          height={'3.5rem'}
          leftIcon={<i className="ri-save-line" />}
          onClick={() => handleModal(<SearchProfileModalContent />)}>
          {t('Filter.SaveSearchProfile')}
        </Button>
      </VStack>
    </GridItem>
  );
};

export default SearchProfile;
