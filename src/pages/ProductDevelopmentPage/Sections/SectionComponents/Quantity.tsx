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
import { SOURCING_KEY } from '../SourcingSection';

type Props = {
  sourcingIndex: number;
};

const Quantity = ({ sourcingIndex }: Props) => {
  const FORM_KEY = `${SOURCING_KEY}.${sourcingIndex}.quantities`;
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_KEY,
  });

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.base,
      }}>
      <GridItem>
        <FormLabel>{t('PD.FormContent.Quantities')}</FormLabel>
        <VStack gap={SPACE.XXS} alignItems={'baseline'}>
          {fields.map((item, index) => {
            return (
              <Box key={item.id} position={'relative'}>
                <InputField
                  placeholder={`${t('Common.Placeholder')}`}
                  name={`${FORM_KEY}.${index}`}
                  type="number"
                  registerOptions={{ valueAsNumber: true }}
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
