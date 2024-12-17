import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChangelogType } from '../../app/generate';
import ChangelogListItem from '../../components/Changelog/ChangelogListItem';
import FormattedNumberInputField from '../../components/Form/FormattedNumberInputField';
import RemixIcon from '../../components/Icon/RemixIcon';
import { GRID, SPACE } from '../../theme/Constants';

type Props = {
  disableEdit?: boolean;
  showChanges: boolean;
};

const QuantityPurchase = ({ disableEdit = false, showChanges }: Props) => {
  const { t } = useTranslation();
  const { control, getValues } = useFormContext();
  const fieldName = 'purchasePrices';
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  function focusLastField() {
    const last = document.querySelector(
      `[name="purchasePrices.${fields.length - 1}.quantity"]`
    ) as HTMLInputElement;
    last?.focus();
  }

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
            {t('PD.FormContent.Quantity')}
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
                  <Box w={'50%'} position={'relative'}>
                    <FormattedNumberInputField
                      name={`${fieldName}.${index}.quantity`}
                      placeholder={`${t('Common.Placeholder')}`}
                      readonly={disableEdit}
                      required={true}
                      type={'integer'}
                      showErrorIcon={true}
                      min={0}
                    />
                    <Box position={'absolute'} top={SPACE.XS} right={0}>
                      <ChangelogListItem
                        showChanges={showChanges}
                        type={ChangelogType.PURCHASE_PRICE}
                        propertyName={'Quantity'}
                        id={getValues(`${fieldName}.${index}.id`)}
                      />
                    </Box>
                  </Box>
                  <Box w={'50%'} position={'relative'}>
                    <FormattedNumberInputField
                      name={`${fieldName}.${index}.price`}
                      placeholder={`${t('Common.Placeholder')}`}
                      readonly={disableEdit}
                      showErrorIcon={true}
                      min={0}
                      defaultValue={0}
                    />
                    <Box position={'absolute'} top={SPACE.XS} right={0}>
                      <ChangelogListItem
                        showChanges={showChanges}
                        type={ChangelogType.PURCHASE_PRICE}
                        propertyName={'Price'}
                        id={getValues(`${fieldName}.${index}.id`)}
                      />
                    </Box>
                  </Box>
                </HStack>
                {!disableEdit && (
                  <Tooltip label={t('Common.Remove')}>
                    <IconButton
                      position={'absolute'}
                      zIndex={2}
                      right={0}
                      top={'50%'}
                      transform={'auto'}
                      translateX={'100%'}
                      translateY={'-50%'}
                      variant={'deleteIconBtn'}
                      aria-label={t('Filter.Remove')}
                      icon={<RemixIcon component="i" icon="CLOSE_LINE" />}
                      onClick={() => remove(index)}
                    />
                  </Tooltip>
                )}
              </Box>
            );
          })}
          {!disableEdit && (
            <Button
              variant={'secondarySmall'}
              onClick={() => {
                append({ quantity: null, price: null });
                focusLastField();
              }}
              rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}>
              {t('Common.Add')}
            </Button>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default QuantityPurchase;
