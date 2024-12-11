import { Accordion, Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
import { MultiValue } from 'chakra-react-select';
import { SelectOption } from '../../../app/types/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SourcingDto } from '../../../app/generate';
import SourcingForm from './SourcingForm';
import { useAuthorizedEdit } from '../../../app/Permissions/usePremissions';

export const SOURCING_KEY = 'sourcings';
type Props = {
  no: string;
  disableEdit: boolean;
};

const SourcingSection = ({ no, disableEdit }: Props) => {
  const allowedToAdd = useAuthorizedEdit('addSourcing');

  const { t } = useTranslation();

  const { getValues, control, setValue } = useFormContext();

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
    for (let index = 0; index < sourcings.length; index++) {
      setValue(
        `${SOURCING_KEY}.${index}.quantities`,
        getValues(`${SOURCING_KEY}.${index}.quantities`).sort(
          (a: number, b: number) => a - b
        )
      );
    }
  }, [sourcings]);

  useEffect(() => {
    if (sourcingCompanies.length > 0) {
      setSelected(
        sourcingCompanies.filter(obj =>
          (getValues(SOURCING_KEY) as SourcingDto[])
            ?.map(s => s.sourcingCompanyCode)
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

  function removeSourcing(indexToRemove: number, sourcingCompanyCode: string) {
    remove(indexToRemove);
    setSelected(
      selected.filter(sourcing => sourcing.value !== sourcingCompanyCode)
    );
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
          <Box minW={'20rem'}>
            {!disableEdit && allowedToAdd && (
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
            )}
          </Box>

          <Box w={'100%'}>
            <Accordion
              border={'none'}
              allowMultiple
              variant={'light'}
              defaultIndex={sourcings.map((_, index) => index)}>
              {sourcings.map((sourcingData, index) => {
                const sourcing = sourcingData as SourcingDto;
                if (!sourcing.sourcingCompanyCode) {
                  return <></>;
                }
                return (
                  <AccordionItem
                    key={sourcingData.id}
                    headlineColor={COLORS.BLACK}
                    title={sourcing.sourcingCompanyCode}>
                    <SourcingForm
                      no={no}
                      disableEdit={disableEdit}
                      sourcingCompanyCode={sourcing.sourcingCompanyCode}
                      sourcingIndexKey={`${SOURCING_KEY}.${index}`}
                      onRemove={() =>
                        sourcing.sourcingCompanyCode &&
                        removeSourcing(index, sourcing.sourcingCompanyCode)
                      }
                    />
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
