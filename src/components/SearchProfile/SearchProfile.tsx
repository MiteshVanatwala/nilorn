import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';
import { useFormContext } from 'react-hook-form';
import { Box, FormLabel, GridItem } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';
import { SPACE } from '../../theme/Constants';
import { useSearchProfile } from '../../app/api/SearchProfile';
import SelectBase from '../Form/SelectBase';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption<string> | undefined>();
  const [activeSearchProfile, setActiveSearchProfile] =
    useState<boolean>(false);
  const [activeSearchProfileName, setActiveSearchProfileName] =
    useState<string>('');
  const [defaultSearchProfile, setDefaultSearchProfile] = useState<string>('');
  const { setValue, reset } = useFormContext();

  let { data } = useSearchProfile();

  const onChange = (
    option: SelectOption,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    reset();
    setActiveSearchProfile(true);
    setSelected(option);
    const optionVal = option.value;
    const splitOptionVal = optionVal.split('&');
    splitOptionVal.forEach((item: string) => {
      const splitItem = item.split('=');
      setValue(splitItem[0], decodeURIComponent(splitItem[1]));
    });
    setActiveSearchProfileName(option.label);
  };

  return (
    <GridItem
      marginTop={{
        base: SPACE.XS,
        md: '0',
      }}
      colSpan={2}>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <Box zIndex={'dropdown'}>
          <FormLabel
            paddingBottom={SPACE.XXS}
            marginBottom={SPACE.XXS}
            mb="0"
            w={'auto'}
            htmlFor={'SearchProfile'}>
            {t('Filter.SavedFilters')}
          </FormLabel>
          {defaultSearchProfile && (
            <SelectBase
              name="SearchProfile"
              onChange={onChange}
              value={
                data?.find(
                  c => c.label === defaultSearchProfile
                ) as SelectOption
              }
              options={data as SelectOption[]}
            />
          )}
          {!defaultSearchProfile && (
            <SelectBase
              name="SearchProfile"
              onChange={onChange}
              value={selected}
              options={data as SelectOption[]}
            />
          )}
        </Box>
        <Button
          zIndex={'0'}
          marginTop={SPACE.XXS}
          fontWeight={'500'}
          variant={'secondary'}
          height={'3.5rem'}
          leftIcon={<i className="ri-save-line" />}
          onClick={() =>
            handleModal(
              <SearchProfileModalContent
                activeSearchProfile={setActiveSearchProfile}
                setActiveSearchProfileName={setActiveSearchProfileName}
                activeSearchProfileName={activeSearchProfileName}
                setDefaultSearchProfile={setDefaultSearchProfile}
              />
            )
          }>
          {activeSearchProfile
            ? t('Filter.UpdateSearchProfile')
            : t('Filter.SaveSearchProfile')}
        </Button>
      </VStack>
    </GridItem>
  );
};
export default SearchProfile;
