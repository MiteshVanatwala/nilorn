import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import { Box, FormLabel, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchProfile } from '../../app/api/SearchProfile';
import { useModal } from '../../app/hooks/useModal';
import { SelectOption } from '../../app/types/types';
import { parseSearchParams } from '../../app/utils/FilterHelper';
import { SPACE } from '../../theme/Constants';
import SelectBase from '../Form/SelectBase';
import RemixIcon from '../Icon/RemixIcon';
import SearchProfileModalContent from './SearchProfileModalContent';

const SearchProfile = () => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectOption<string> | undefined>();
  const {
    formState: { isDirty },
  } = useFormContext();
  const [activeSearchProfileName, setActiveSearchProfileName] =
    useState<string>('');
  const { setValue, reset } = useFormContext();
  let { data } = useSearchProfile();

  const onChange = (option: SelectOption) => {
    reset();
    setSelected(option);
    const queryStr = option.value;
    const filters = parseSearchParams(queryStr);

    for (const name in filters) {
      const value = filters[name];
      setValue(name, value, {
        shouldDirty: true,
      });
    }

    setActiveSearchProfileName(option.label);
  };

  useEffect(() => {
    if (!isDirty) {
      setSelected(undefined);
      setActiveSearchProfileName('');
    }
  }, [isDirty]);

  useEffect(() => {
    setSelected(
      (data?.find(c => c.label === activeSearchProfileName) as SelectOption) ??
        undefined
    );
  }, [activeSearchProfileName, data]);

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
            {t('Filter.SearchProfile.Label')}
          </FormLabel>
          <SelectBase
            name="SearchProfile"
            onChange={onChange}
            value={
              activeSearchProfileName
                ? (data?.find(
                    c => c.label === activeSearchProfileName
                  ) as SelectOption)
                : selected
            }
            options={data as SelectOption[]}
          />
        </Box>
        <Button
          zIndex={'0'}
          marginTop={SPACE.XXS}
          variant={'secondary'}
          rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}
          onClick={() =>
            handleModal(
              <SearchProfileModalContent
                setActiveSearchProfileName={setActiveSearchProfileName}
                activeSearchProfileName={activeSearchProfileName}
                isValueSelected={!!(selected || activeSearchProfileName)}
              />
            )
          }>
          {selected
            ? t('Filter.SearchProfile.Update')
            : t('Filter.SearchProfile.Save')}
        </Button>
      </VStack>
    </GridItem>
  );
};
export default SearchProfile;
