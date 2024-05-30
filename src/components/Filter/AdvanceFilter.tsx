import { useEffect, useState } from 'react';
import { ActionMeta, MultiValue } from 'chakra-react-select';
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
import { SelectOption, FilterInput } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import InputSwitch from './InputSwitch';
import { COLORS, GRID, SPACE } from '../../theme/Constants';
import AdvanceFilterSelect from './AdvanceFilterSelect';
import FilterSwitch from './FilterSwitch';
import { INCLUDE_CLOSED } from '../../app/utils/constant';

type Props = {
  filters: FilterInput[];
  wideFilter?: boolean;
  hideIncludeClosed?: boolean;
};

const AdvanceFilter = ({
  filters,
  wideFilter,
  hideIncludeClosed = false,
}: Props) => {
  const { t } = useTranslation();
  const { unregister, getValues } = useFormContext();
  const [selected, setSelected] = useState<
    MultiValue<SelectOption<FilterInput>>
  >([]);

  const handleSelect = (
    selectedOption: MultiValue<SelectOption<FilterInput>> | undefined,
    actionMeta: ActionMeta<SelectOption<FilterInput>>
  ) => {
    if (actionMeta.action === 'clear') {
      selected.map(s => unregister(s.value.name));
    } else if (actionMeta.action === 'deselect-option') {
      unregister(actionMeta.name);
    }
    if (selectedOption !== undefined) {
      setSelected(selectedOption);
    }
  };

  const handleRemove = (name: string) => {
    unregister(name);
    setSelected(selected.filter(opt => opt.value.name !== name));
  };

  const [index, setIndex] = useState<ExpandedIndex>(-1);

  useEffect(() => {
    const activeAdvancedFilterArr: SelectOption[] = [];

    Object.entries(getValues()).forEach(([key]) => {
      filters?.forEach(filterItem => {
        if (filterItem && filterItem.name === key) {
          if (filterItem !== undefined) {
            activeAdvancedFilterArr.push({
              label: t(`PD.FilterLabel.${filterItem.name}`),
              value: filterItem,
            });
          }
        }
      });
    });
    if (activeAdvancedFilterArr.length) {
      setSelected(activeAdvancedFilterArr);
    }
  }, [getValues, filters, t]);

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
                value={selected}
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
            marginTop={selected.length > 0 ? SPACE.MD : ''}
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
            {selected.map(so => (
              <GridItem colSpan={2} key={so.value.name} position={'relative'}>
                <IconButton
                  position={'absolute'}
                  zIndex={2}
                  right={0}
                  top={0}
                  variant={'deleteIconBtn'}
                  aria-label={t('Filter.Remove')}
                  icon={<i className="ri-close-line" />}
                  onClick={() => handleRemove(so.value.name)}
                />
                <InputSwitch option={so.value} />
              </GridItem>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvanceFilter;
