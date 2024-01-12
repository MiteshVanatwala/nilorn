import {
  Accordion,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, GRID, SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import InputField from '../../../components/Form/InputField';
import Quantity from './SectionComponents/Quantity';
import TextArea from '../../../components/Form/TextArea';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
import { MultiValue } from 'chakra-react-select';
import { SelectOption } from '../../../app/types/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SourcingDto } from '../../../app/generate';

export const SOURCING_KEY = 'sourcings';
type Props = {
  disableEdit: boolean;
};

const SourcingSection = ({ disableEdit }: Props) => {
  const { t } = useTranslation();

  const { getValues, control } = useFormContext();

  const {
    fields: sourcings,
    append,
    remove,
  } = useFieldArray({
    control,
    name: SOURCING_KEY,
  });

  const sourcingCompanies = useFilterOptions('sourcingCompanies');

  const [selected, setSelected] = useState<MultiValue<SelectOption>>([]);

  useEffect(() => {
    if (sourcingCompanies.length > 0) {
      setSelected(
        sourcingCompanies.filter(obj =>
          (getValues(SOURCING_KEY) as SourcingDto[])
            .map(s => s.sourcingCompanyCode)
            .includes(obj.value)
        )
      );
    }
  }, [getValues, sourcingCompanies]);

  function addSourcing(selectedOption: MultiValue<SelectOption> | undefined) {
    if (selectedOption !== undefined) {
      setSelected(selectedOption);
      append({
        sourcingCompanyCode: selectedOption[selectedOption.length - 1].value,
      } as SourcingDto);
    }
  }

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
          {!disableEdit && (
            <Box minW={'20rem'}>
              <AdvanceFilterSelect
                name={'AddSourcing'}
                placeholder={t('PD.AddSourcing')}
                hideSelected={true}
                options={sourcingCompanies}
                onChange={(option, event) => {
                  addSourcing(option);
                }}
                value={selected}
              />
            </Box>
          )}

          <Box w={'100%'}>
            <Accordion
              allowMultiple
              variant={'light'}
              defaultIndex={sourcings.map((_, index) => index)}>
              {sourcings.map((sourcing, index) => {
                return (
                  <AccordionItem
                    key={sourcing.id}
                    headlineColor={COLORS.GRAY[80]}
                    title={(sourcing as any).sourcingCompanyCode}>
                    <>
                      <Grid
                        gap={GRID.GAP}
                        templateColumns={GRID.TEMPLATE_COLUMNS}>
                        <GridItem
                          colSpan={{
                            base: 1,
                            xl: 6,
                          }}>
                          <VStack gap={GRID.GAP} alignItems={'start'}>
                            <TextArea
                              placeholder={`${t('Common.Placeholder')}`}
                              label={`${t(
                                'PD.FormContent.ClientRequirements'
                              )}`}
                              name={`${SOURCING_KEY}.${index}.clientRequirement`}
                            />
                            <InputField
                              placeholder={`${t('Common.Placeholder')}`}
                              label={`${t(
                                'PD.FormContent.TargetPurchasePrice'
                              )}`}
                              name={`${SOURCING_KEY}.${index}.targetPurchasePrice`}
                            />
                            <Button
                              mt={SPACE}
                              variant={'secondarySmall'}
                              onClick={() => {
                                remove(index);
                              }}
                              rightIcon={
                                <i className={'ri-delete-bin-line'} />
                              }>
                              {t('PD.RemoveSourcing')}
                            </Button>
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
                          <Quantity sourcingIndex={index} />
                        </GridItem>
                      </Grid>
                    </>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        </>
      </Flex>
    </AccordionItem>
  );
};

export default SourcingSection;
