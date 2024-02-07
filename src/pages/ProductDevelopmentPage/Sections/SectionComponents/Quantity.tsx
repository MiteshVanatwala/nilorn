import {
  Grid,
  FormLabel,
  Button,
  GridItem,
  VStack,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../../theme/Constants';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from '../../../../components/Form/InputField';
import { uniqueInArray } from '../../../../app/utils/common';

type Props = {
  formKey: string;
  disableEdit: boolean;
};

const Quantity = ({ formKey, disableEdit }: Props) => {
  const FORM_KEY = `${formKey}.quantities`;

  const { t } = useTranslation();
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_KEY,
  });

  const validateUniqueValues = (value: number, index: number) => {
    const values = getValues(FORM_KEY) as number[];
    return uniqueInArray(value, index, values);
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
                <InputField
                  placeholder={`${t('Common.Placeholder')}`}
                  name={`${FORM_KEY}.${index}`}
                  type="number"
                  readonly={disableEdit}
                  registerOptions={{
                    valueAsNumber: true,
                    validate: (value: number) =>
                      validateUniqueValues(value, index),
                  }}
                />
                {!disableEdit && (
                  <IconButton
                    position={'absolute'}
                    zIndex={2}
                    right={0}
                    top={4}
                    variant={'deleteIconBtn'}
                    aria-label={t('Filter.Remove')}
                    icon={<i className="ri-close-line" />}
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
              rightIcon={<i className={'ri-add-line'} />}>
              {t('Common.Add')}
            </Button>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Quantity;
