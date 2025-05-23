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
  const { control, getValues, setValue } = useFormContext();
  const { append } = useFieldArray({
    control,
    name: FORM_KEY,
  });
  const fields = (getValues(FORM_KEY) as number[]) || [];
  const validateUniqueValues = (value: number, index: number) => {
    const values = getValues(FORM_KEY) as number[];
    return uniqueInArray(value, index, values) || t('Errors.UniqueValue');
  };

  const remove = (index: number) => {
    const values = getValues(FORM_KEY) as number[];
    values.splice(index, 1);
    setValue(FORM_KEY, values, {
      shouldDirty: true,
    });
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
              <Box key={`${item}_${index}`} position={'relative'}>
                <HStack w="80%">
                  <FormattedNumberInputField
                    placeholder={`${t('Common.Placeholder')}`}
                    name={`${FORM_KEY}.${index}`}
                    readonly={disableEdit}
                    required={true}
                    validateNumber={(value: number) =>
                      validateUniqueValues(value, index)
                    }
                    type={'integer'}
                    focusOnMount={focusOnAdd}
                    showErrorIcon={true}
                    min={0}
                  />
                  {!disableEdit && (
                    <Tooltip label={t('Common.Remove')}>
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
                    </Tooltip>
                  )}
                </HStack>
              </Box>
            );
          })}
          {!disableEdit && (
            <Button
              variant={'secondarySmall'}
              onClick={() => setValue(FORM_KEY, [...fields, ''])}
              rightIcon={<RemixIcon component={'i'} icon={'ADD_LINE'} />}>
              {t('Common.Add')}
            </Button>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Quantity;
