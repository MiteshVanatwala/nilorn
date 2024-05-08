import { SIZES, SPACE } from '../../theme/Constants';
import { Flex } from '@chakra-ui/react';
import fontSizes from '../../theme/fontSizes';
import ActiveFilterItem from './ActiveFilterItem';
import ClearAllFilters from './ClearAllFilters';
import { useFormContext } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import { FilterKeys, SelectOption } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useClearAllFilters } from '../../app/utils/FilterHelper';

const ignoreKeys: FilterKeys[] = ['sortKey', 'pageNumber', 'pageSize'];

const ActiveFilters = () => {
  const { t } = useTranslation();
  const {
    watch,
    formState: { isDirty },
  } = useFormContext();
  const clearFilters = useClearAllFilters();

  let [hasValues, setHasValues] = useState<boolean>(false);
  const watchedEntries = Object.entries(watch());

  useEffect(() => {
    const foundValue = watchedEntries
      .filter(([key, _]) => !ignoreKeys.includes(key as FilterKeys))
      .some(([_, value]) => value?.label || (value && value[0]));
    setHasValues(foundValue);

    if (!foundValue && isDirty) {
      clearFilters();
    }
  }, [clearFilters, isDirty, watchedEntries]);

  return (
    <Flex
      display={'inline-flex'}
      fontSize={fontSizes.sm}
      grow={1}
      flexWrap={'wrap'}
      w={'100%'}
      margin={'0 auto'}
      maxWidth={SIZES.CONTAINER.XL}
      alignItems="center"
      gap={{
        base: SPACE.XXS,
        lg: SPACE.SM,
      }}
      flexDirection="row"
      py={{ base: SPACE.XXS, lg: SPACE.MD }}>
      {watchedEntries
        .filter(([key, _]) => !ignoreKeys.includes(key as FilterKeys))
        .map(([key, value]) => {
          if (
            (typeof value === 'string' && value.includes(',')) ||
            value === undefined
          ) {
            return <Fragment key={key} />;
          } else if (Array.isArray(value) && value?.length > 0) {
            const label = (value as SelectOption<string>[])
              .map(v => v.label)
              .join(', ');
            return (
              <ActiveFilterItem
                key={key}
                label={label}
                queryItem={key}
                filterLabel={t(`PD.FilterLabel.${key}`)}
              />
            );
          } else if (value && value?.length && typeof value === 'string') {
            return (
              <ActiveFilterItem
                key={key}
                label={decodeURIComponent(value)}
                filterLabel={t(`PD.FilterLabel.${key}`)}
                queryItem={key}
              />
            );
          } else if (value?.label && typeof value?.value === 'boolean') {
            return (
              <ActiveFilterItem
                key={key}
                label={value?.label}
                queryItem={key}
              />
            );
          }
          return <Fragment key={key} />;
        })}
      {hasValues && <ClearAllFilters />}
    </Flex>
  );
};

export default ActiveFilters;
