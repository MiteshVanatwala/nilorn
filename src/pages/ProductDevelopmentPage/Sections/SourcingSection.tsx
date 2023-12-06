import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import InputField from '../../../components/Form/InputField';
import Quantity from './SectionComponents/Quantity';
import TextArea from '../../../components/Form/TextArea';

type Props = {
  createNew?: boolean;
};
const SourcingSection = ({ createNew }: Props) => {
  const { t } = useTranslation();
  function addSourcing() {}
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
              placeholder={t('PD.AddSourcing')}
              options={[]}
              onChange={(option, event) => {
                addSourcing();
              }}
              value={[]}
            />
          </Box>
          <Box w={'100%'}>
            <AccordionItem title="NEA">
              <>
                <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
                  <GridItem
                    colSpan={{
                      base: 1,
                      xl: 6,
                    }}>
                    <VStack gap={GRID.GAP}>
                      <TextArea
                        minHeight="0"
                        placeholder="test"
                        label={'Label'}
                        name={'rk'}
                      />
                      <InputField
                        placeholder="test"
                        label={`${t('PD.FormContent.PurchaserPrice')}`}
                        name={'r'}
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
          </Box>
        </>
      </Flex>
    </AccordionItem>
  );
};

export default SourcingSection;
