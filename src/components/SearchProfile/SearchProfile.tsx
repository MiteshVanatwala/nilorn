import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
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
  const {
    formState: { isDirty },
  } = useFormContext();
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
    setSelected(option);
    const optionVal = option.value;
    const splitOptionVal = optionVal.split('&');
    splitOptionVal.forEach((item: string) => {
      const splitItem = item.split('=');
      setValue(splitItem[0], decodeURIComponent(splitItem[1]), {
        shouldDirty: true,
      });
    });
    setActiveSearchProfileName(option.label);
    setDefaultSearchProfile(option.label);
  };

  useEffect(() => {
    if (!isDirty) {
      setDefaultSearchProfile('');
      setSelected(undefined);
      setActiveSearchProfileName('');
    }
  }, [isDirty]);

  return (
    <GridItem
      marginTop={{
        base: SPACE.XS,
        md: '0',
      }}
      colSpan={2}>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <Box>
          <FormLabel
            paddingBottom={SPACE.XXS}
            marginBottom={SPACE.XXS}
            mb="0"
            w={'auto'}
            htmlFor={'SearchProfile'}>
            {t('Filter.SavedFilters')}
          </FormLabel>
          <SelectBase
            name="SearchProfile"
            onChange={onChange}
            value={
              defaultSearchProfile
                ? (data?.find(
                    c => c.label === defaultSearchProfile
                  ) as SelectOption)
                : selected
            }
            options={data as SelectOption[]}
          />
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
                setActiveSearchProfileName={setActiveSearchProfileName}
                activeSearchProfileName={activeSearchProfileName}
                setDefaultSearchProfile={setDefaultSearchProfile}
                isValueSelected={!!(selected || defaultSearchProfile)}
              />
            )
          }>
          {activeSearchProfileName && defaultSearchProfile
            ? t('Filter.UpdateSearchProfile')
            : t('Filter.SaveSearchProfile')}
        </Button>
      </VStack>
    </GridItem>
  );
};
export default SearchProfile;
