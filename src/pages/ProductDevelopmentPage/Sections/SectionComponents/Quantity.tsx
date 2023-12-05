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
import { GRID } from '../../../../theme/Constants';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from '../../../../components/Form/InputField';

const Quantity = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quantities',
  });

  //TODO - ONLY TO GET VALUES WHEN API IS MISSING
  useEffect(() => {
    append({ value: '1' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.base,
      }}>
      <GridItem>
        <FormLabel>{t('PD.FormContent.Quantities')}</FormLabel>
        <VStack gap={GRID.GAP} alignItems={'baseline'}>
          {fields.map((item, index) => {
            return (
              <Box key={item.id} position={'relative'}>
                <InputField
                  placeholder={`${t('Common.Placeholder')}`}
                  name={`quantities.${index}.value`}
                  type="number"
                />
                <IconButton
                  position={'absolute'}
                  zIndex={2}
                  right={0}
                  top={0}
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
            onClick={() => append({ value: '' })}
            rightIcon={<i className={'ri-add-line'} />}>
            {t('Common.Add')}
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Quantity;
