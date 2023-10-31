import { useState } from 'react';
import SelectBase from '../Form/SelectBase';
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
} from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import InputSwitch from './InputSwitch';
import { GRID, SPACE } from '../../theme/Constants';

type Props = {
  filters: SelectOption<AdvanceFilterType>[];
};

const AdvanceFilter = ({ filters }: Props) => {
  const { t } = useTranslation();
  const { unregister } = useFormContext();

  const [selected, setSelected] = useState<
    MultiValue<SelectOption<AdvanceFilterType>>
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

  return (
    <Accordion allowToggle index={index} onChange={setIndex}>
      <AccordionItem overflow={'visible'}>
        <AccordionButton>
          <HStack
            gap={SPACE.XL}
            width="400px"
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
            templateColumns={GRID.TEMPLATE_COLUMNS}
            rowGap={GRID.ROW_GAP}
            columnGap={GRID.COLUM_GAP}>
            <GridItem colSpan={4}>
              <Box maxW={'24rem'}>
                <SelectBase
                  name="ov-advance"
                  isMulti={true}
                  options={filters}
                  value={selected}
                  isSearchable={true}
                  advanceFilter={true}
                  dark={true}
                  placeholder={
                    selected.length
                      ? `${t('Filter.NumSelected', { num: selected.length })}`
                      : `${t('Filter.Select')}`
                  }
                  onChange={(option, event) => {
                    handleSelect(option, event);
                  }}
                />
              </Box>
            </GridItem>

            {selected.map(so => (
              <GridItem key={so.value.name} position={'relative'}>
                <>
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
                  <ControlWrapper name={so.value.name} label={so.label}>
                    <InputSwitch option={so} />
                  </ControlWrapper>
                </>
              </GridItem>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvanceFilter;
