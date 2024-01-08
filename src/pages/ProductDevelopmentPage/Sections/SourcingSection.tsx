import { Accordion, Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, GRID, SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import InputField from '../../../components/Form/InputField';
import Quantity from './SectionComponents/Quantity';
import TextArea from '../../../components/Form/TextArea';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { useState } from 'react';
import { MultiValue } from 'chakra-react-select';
import { SelectOption } from '../../../app/types/types';
import { useFieldArray, useFormContext } from 'react-hook-form';

const FORM_KEY = 'sourcings';

const SourcingSection = () => {
  const { t } = useTranslation();

  const { getValues, control } = useFormContext();

  const {
    fields: sourcings,
    append,
    remove,
  } = useFieldArray({
    control,
    name: FORM_KEY,
  });

  const sourcingCompanies = useFilterOptions('sourcingCompanies');

  const [selected, setSelected] = useState<MultiValue<SelectOption>>([]);

  function addSourcing(selectedOption: MultiValue<SelectOption> | undefined) {
    if (selectedOption !== undefined) {
      setSelected(selectedOption);
      append(selectedOption);
    }
  }

  console.log('selected', selected);
  return (
    <AccordionItem title={t('PD.AccordionLabels.Sourcing')}>
      <Flex
        gap={{
          base: SPACE.MD,
          xl: SPACE.XXL,
        }}
        justifyContent={{
          base: 'flex-start',
          xl: 'space-between',
        }}
        alignItems={'baseline'}
        flexDirection={{
          base: 'column',
          xl: 'row-reverse',
        }}>
        <>
          <Box minW={'20rem'}>
            <AdvanceFilterSelect
              name={'AddSourcing'}
              placeholder={t('PD.AddSourcing')}
              options={sourcingCompanies}
              onChange={(option, event) => {
                addSourcing(option);
              }}
              value={selected}
            />
          </Box>
          <Box w={'100%'}>
            <Accordion allowMultiple variant={'light'}>
              {sourcings.map(sourcing => {
                console.log('---->', sourcing);
                return <></>;
              })}
              <AccordionItem headlineColor={COLORS.GRAY[80]} title="NEA">
                <>
                  <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
                    <GridItem
                      colSpan={{
                        base: 1,
                        xl: 6,
                      }}>
                      <VStack gap={GRID.GAP}>
                        <TextArea
                          placeholder={`${t('Common.Placeholder')}`}
                          label={`${t('PD.FormContent.ClientRequirements')}`}
                          name={'clientRequirement '}
                        />
                        <InputField
                          placeholder={`${t('Common.Placeholder')}`}
                          label={`${t('PD.FormContent.TargetPurchasePrice')}`}
                          name={'targetPurchasePrice'}
                        />
                      </VStack>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 1,
                        xl: 2,
                      }}
                      colEnd={{
                        base: 1,
                        xl: 13,
                      }}
                      colStart={{
                        base: 1,
                        xl: 11,
                      }}>
                      <Quantity />
                    </GridItem>
                  </Grid>
                </>
              </AccordionItem>
            </Accordion>
          </Box>
        </>
      </Flex>
    </AccordionItem>
  );
};

export default SourcingSection;
