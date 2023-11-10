import { useEffect, useState } from 'react';
import { ActionMeta, MultiValue } from 'chakra-react-select';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ExpandedIndex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import ControlWrapper from '../Form/ControlWrapper';
import {
  SelectOption,
  AdvanceFilter as AdvanceFilterType,
  SelectOptionDefaultValue,
} from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import InputSwitch from './InputSwitch';
import { COLORS, GRID, SPACE } from '../../theme/Constants';
import AdvanceFilterSelect from './AdvanceFilterSelect';

type Props = {
  filters: SelectOptionDefaultValue<AdvanceFilterType>[];
};

const AdvanceFilter = ({ filters }: Props) => {
  const { t } = useTranslation();
  const { unregister, getValues } = useFormContext();

  const [selected, setSelected] = useState<
    MultiValue<SelectOptionDefaultValue<AdvanceFilterType>>
  >([]);

  const handleSelect = (
    selectedOption: MultiValue<SelectOption<AdvanceFilterType>> | undefined,
    actionMeta: ActionMeta<SelectOption<AdvanceFilterType>>
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

  const [index, setIndex] = useState<ExpandedIndex>(0);

  useEffect(() => {
    const activeAdvancedFilterArr: SelectOptionDefaultValue[] = [];

    Object.entries(getValues()).forEach(([key, value]) => {
      filters?.forEach(filterItem => {
        if (
          filterItem &&
          'value' in filterItem &&
          filterItem.value &&
          filterItem.value.name === key
        ) {
          if (filterItem !== undefined) {
            if (value !== undefined) {
              filterItem.defaultValue = value;
            }
            activeAdvancedFilterArr.push(filterItem);
          }
        }
      });
    });
    if (activeAdvancedFilterArr.length) {
      setSelected(activeAdvancedFilterArr);
    }
  }, [getValues, filters]);
  return (
    <Accordion mb={SPACE.SM} allowToggle index={index} onChange={setIndex}>
      <AccordionItem border={'none'} overflow={'visible'}>
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
        <AccordionPanel overflow={'visible'}>
          <Grid
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: GRID.TEMPLATE_COLUMNS.lg,
            }}
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}>
            <GridItem colSpan={2}>
              <Box maxW={'24rem'}>
                <AdvanceFilterSelect
                  options={filters}
                  value={selected}
                  onChange={(option, event) => {
                    handleSelect(option, event);
                  }}
                />
              </Box>
            </GridItem>
          </Grid>
          <Grid
            marginTop={SPACE.MD}
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: GRID.TEMPLATE_COLUMNS.lg,
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
                  variant={'deleteBtn'}
                  aria-label={t('Filter.Remove')}
                  icon={<i className="ri-close-line" />}
                  onClick={() => handleRemove(so.value.name)}
                />
                <ControlWrapper
                  zIndex={'dropdown'}
                  name={so.value.name}
                  label={so.label}>
                  <InputSwitch defaultValue={so.defaultValue} option={so} />
                </ControlWrapper>
              </GridItem>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvanceFilter;
