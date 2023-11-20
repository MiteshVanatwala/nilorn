import { Button } from '@chakra-ui/button';
import { useModal } from '../../app/hooks/useModal';
import { VStack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { ActionMeta } from 'react-select';
import { useTranslation } from 'react-i18next';
import SearchProfileModalContent from './SearchProfileModalContent';
import { useFormContext } from 'react-hook-form';
import { Box, GridItem } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';
import ControlWrapper from '../Form/ControlWrapper';
import { SPACE } from '../../theme/Constants';
import { useSearchProfile } from '../../app/api/SearchProfile';
import SelectBase from '../Form/SelectBase';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption<string> | undefined>();
  const [activeSearchProfile, setActiveSearchProfile] =
    useState<boolean>(false);
  const { setValue, reset, getValues } = useFormContext();

  let { data } = useSearchProfile();
  let options: SelectOption[];

  const onChange = (option: any, actionMeta: ActionMeta<SelectOption>) => {
    reset();
    setActiveSearchProfile(true);
    setSelected(option);
    const optionVal = option.value;
    const splitOptionVal = optionVal.split('&');
    splitOptionVal.forEach((item: string) => {
      const splitItem = item.split('=');
      setValue(splitItem[0], splitItem[1].replace(/[\s+]/g, ' '));
    });
    setValue('ActiveSearchProfile', option.label);
  };

  useEffect(() => {
    if (!activeSearchProfile) {
      setValue('ActiveSearchProfile', '');
      setSelected(undefined);
    }
  }, [activeSearchProfile, setValue]);

  if (data) {
    options = data.map((selectBase: any) => ({
      label: selectBase?.label ?? '',
      value: selectBase?.value ?? '',
    }));
  } else {
    options = [];
  }

  return (
    <GridItem
      marginTop={{
        base: SPACE.XS,
        md: '0',
      }}
      colSpan={2}>
      <VStack maxW={'24rem'} alignItems={'left'}>
        <ControlWrapper
          zIndex={'dropdown'}
          name="SearchProfile"
          label={t('Filter.SavedFilters')}>
          <Box zIndex={'dropdown'}>
            <SelectBase
              name="SearchProfile"
              onChange={onChange}
              value={selected}
              options={options}
            />
          </Box>
        </ControlWrapper>
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
                activeSearchProfileName={getValues('ActiveSearchProfile')}
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
