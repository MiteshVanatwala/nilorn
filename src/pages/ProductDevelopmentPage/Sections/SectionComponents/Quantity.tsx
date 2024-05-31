import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { uniqueInArray } from '../../../../app/utils/common';
import FormattedNumberInputField from '../../../../components/Form/FormattedNumberInputField';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { GRID, SPACE } from '../../../../theme/Constants';

type Props = {
  formKey: string;
  disableEdit: boolean;
  focusOnAdd?: boolean;
};

const Quantity = ({ formKey, disableEdit, focusOnAdd = false }: Props) => {
  const FORM_KEY = `${formKey}.quantities`;

  const { t } = useTranslation();
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_KEY,
  });

  const validateUniqueValues = (value: number, index: number) => {
    const values = getValues(FORM_KEY) as number[];
    return uniqueInArray(value, index, values) || t('Errors.UniqueValue');
  };

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.base,
      }}>
      <GridItem>
        <FormLabel>{t('PD.FormContent.Quantity')}</FormLabel>
        <VStack gap={SPACE.XXS} alignItems={'baseline'}>
          {fields.map((item, index) => {
            return (
              <Box key={item.id} position={'relative'}>
                <FormattedNumberInputField
                  placeholder={`${t('Common.Placeholder')}`}
                  name={`${FORM_KEY}.${index}`}
                  readonly={disableEdit}
                  registerOptions={{
                    valueAsNumber: true,
                    required: true,
                    validate: (value: number) =>
                      validateUniqueValues(value, index),
                  }}
                  type={'integer'}
                  focusOnMount={focusOnAdd}
                />
                {!disableEdit && (
                  <IconButton
                    position={'absolute'}
                    zIndex={2}
                    right={0}
                    top={4}
                    variant={'deleteIconBtn'}
                    aria-label={t('Filter.Remove')}
                    icon={<RemixIcon component="i" icon="CLOSE_LINE" />}
                    onClick={() => remove(index)}
                  />
                )}
              </Box>
            );
          })}
          {!disableEdit && (
            <Button
              variant={'secondarySmall'}
              onClick={() => append({ value: '' })}
              rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}>
              {t('Common.Add')}
            </Button>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Quantity;
