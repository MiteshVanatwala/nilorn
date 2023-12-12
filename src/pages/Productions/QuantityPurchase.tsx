import {
  Grid,
  FormLabel,
  Button,
  GridItem,
  VStack,
  IconButton,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useEffect } from 'react';

const QuantityPurchase = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const formName = 'quantiyPurchase';
  const { fields, append, remove } = useFieldArray({
    control,
    name: formName,
  });

  useEffect(() => {
    const last = document.querySelector(
      `[name="quantiyPurchase.${fields.length - 1}.qty"]`
    ) as HTMLInputElement;
    last?.focus();
  }, [fields]);

  return (
    <Grid
      maxW={'55rem'}
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.lg,
      }}>
      <GridItem colSpan={4}>
        <HStack gap={SPACE.LG}>
          <FormLabel
            mr={'0'}
            mb={0}
            pb={{
              base: SPACE.SM,
              md: SPACE.XXS,
            }}
            w={'50%'}>
            {t('PD.FormContent.Quantities')}
          </FormLabel>
          <FormLabel
            pb={{
              base: SPACE.SM,
              md: SPACE.XXS,
            }}
            mr={'0'}
            mb={0}
            w={'50%'}>
            {t('Production.PUR')}
          </FormLabel>
        </HStack>
        <VStack gap={SPACE.SM} alignItems={'baseline'}>
          {fields.map((item, index) => {
            return (
              <Box w={'100%'} key={item.id} position={'relative'}>
                <HStack gap={SPACE.LG} w={'100%'}>
                  <Box w={'50%'}>
                    <InputField
                      placeholder={`${t('Common.Placeholder')}`}
                      name={`${formName}.${index}.qty`}
                      type="number"
                      registerOptions={{ valueAsNumber: true }}
                    />
                  </Box>
                  <Box w={'50%'}>
                    <InputField
                      placeholder={`${t('Common.Placeholder')}`}
                      name={`${formName}.${index}.pur`}
                      type="number"
                      registerOptions={{ valueAsNumber: true }}
                    />
                  </Box>
                </HStack>
                <IconButton
                  position={'absolute'}
                  zIndex={2}
                  right={0}
                  top={0}
                  transform={'auto'}
                  translateX={'100%'}
                  variant={'deleteBtn'}
                  aria-label={t('Filter.Remove')}
                  icon={<i className="ri-close-line" />}
                  onClick={() => remove(index)}
                />
              </Box>
            );
          })}
          <Button
            variant={'secondarySmall'}
            onClick={() => {
              append({ qty: '', pur: '' });
            }}
            rightIcon={<i className={'ri-add-line'} />}>
            {t('Common.Add')}
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default QuantityPurchase;
