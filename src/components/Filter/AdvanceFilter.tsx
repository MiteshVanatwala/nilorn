import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ExpandedIndex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ActionMeta, MultiValue } from 'chakra-react-select';
import { useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FilterInput, SelectOption } from '../../app/types/types';
import { INCLUDE_CLOSED } from '../../app/utils/constant';
import { COLORS, GRID, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import AdvanceFilterSelect from './AdvanceFilterSelect';
import FilterSwitch from './FilterSwitch';
import InputSwitch from './InputSwitch';

type Props = {
  filters: FilterInput[];
  wideFilter?: boolean;
  hideIncludeClosed?: boolean;
  filterByUser?: boolean;
};

const AdvanceFilter = ({
  filters,
  wideFilter,
  hideIncludeClosed = false,
  filterByUser = false,
}: Props) => {
  const { t } = useTranslation();
  const { unregister, getValues, setValue } = useFormContext();
  const watch = useWatch();

  const activeFilters = useMemo(() => {
    const activeAdvancedFilterArr: SelectOption[] = [];
    Object.entries(watch ?? {}).forEach(([key]) => {
      filters?.forEach(filterItem => {
        if (filterItem && filterItem.name === key) {
          activeAdvancedFilterArr.push({
            label: t(`PD.FilterLabel.${filterItem.name}`),
            value: filterItem,
          });
        }
      });
    });
    return activeAdvancedFilterArr;
  }, [filters, t, watch]);

  const handleSelect = (
    selectedOptions: MultiValue<SelectOption<FilterInput>> | undefined,
    actionMeta: ActionMeta<SelectOption<FilterInput>>
  ) => {
    if (actionMeta.action === 'clear' && !!selectedOptions) {
      selectedOptions.forEach(s => unregister(s.value.name));
    } else if (actionMeta.action === 'deselect-option') {
      unregister(actionMeta.option?.value.name);
    } else if (actionMeta.action === 'select-option') {
      setValue(actionMeta.option?.value.name ?? '', undefined);
    }
  };

  const handleRemove = (name: string) => {
    unregister(name);
  };

  const [index, setIndex] = useState<ExpandedIndex>(-1);

  return (
    <Accordion allowToggle index={index} onChange={setIndex}>
      <AccordionItem mb="0" border={'none'} overflow={'visible'}>
        <AccordionButton
          _hover={{ bg: COLORS.GRAY[0] }}
          w={'auto'}
          display={'inline-block'}
          p={'0'}
          zIndex={'dropdown'}
          marginTop={SPACE.LG}>
          <HStack
            gap={SPACE.LG}
            width="auto"
            flex={'1'}
            justifyContent={
              (index as number) < 0 ? 'inherit' : 'space-between'
            }>
            <Heading variant={'bodyBold'}>{t('Filter.AdvanceFilter')}</Heading>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel pl={0} overflow={'visible'}>
          <Grid
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: wideFilter
                ? GRID.TEMPLATE_COLUMNS.xl
                : GRID.TEMPLATE_COLUMNS.lg,
            }}
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}
            alignItems={'center'}>
            <GridItem colSpan={2} zIndex={9}>
              <AdvanceFilterSelect
                name={'ov-advance'}
                options={filters.map(f => {
                  return {
                    label: t(`PD.FilterLabel.${f.name}`),
                    value: f,
                  } as SelectOption;
                })}
                value={activeFilters}
                onChange={(option, event) => {
                  handleSelect(option, event);
                }}
              />
            </GridItem>
            {!hideIncludeClosed && (
              <GridItem colSpan={3}>
                <FilterSwitch
                  defaultChecked={
                    getValues(INCLUDE_CLOSED) === 'true' ||
                    getValues(INCLUDE_CLOSED)?.value
                  }
                  label={t('PD.IncludeClosed')}
                  name={INCLUDE_CLOSED}
                />
              </GridItem>
            )}
          </Grid>
          <Grid
            marginTop={activeFilters.length > 0 ? SPACE.MD : ''}
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: wideFilter
                ? GRID.TEMPLATE_COLUMNS.xl
                : GRID.TEMPLATE_COLUMNS.lg,
            }}
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}>
            {activeFilters.map(so => (
              <GridItem colSpan={2} key={so.value.name} position={'relative'}>
                <IconButton
                  position={'absolute'}
                  zIndex={2}
                  right={0}
                  top={0}
                  variant={'deleteIconBtn'}
                  aria-label={t('Filter.Remove')}
                  icon={<RemixIcon component="i" icon="CLOSE_LINE" />}
                  onClick={() => handleRemove(so.value.name)}
                />
                <InputSwitch option={so.value} filterByUser={filterByUser} />
              </GridItem>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvanceFilter;
