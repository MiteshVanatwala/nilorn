import {
  Accordion,
  Button,
  Grid,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { COLORS, SPACE } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import CompositionMaterialHeader from './CompositionMaterialHeader';
import CompositionMaterialRow from './CompositionMaterialRow';
import { SelectOption } from '../../../app/types/types';
import { useEffect } from 'react';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { CompositionDto } from '../../../app/generate';
import { useCompositionMaterials } from '../../../app/api/production';

type Props = {
  defaultValues?: CompositionDto[];
};

const CompositionMaterialSection = ({ defaultValues }: Props) => {
  const { t } = useTranslation();
  const { control, getValues, setValue } = useFormContext();
  const fieldName = 'compositions';
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });
  const registerdCompositionMaterial = useWatch({
    name: fieldName,
  }) as CompositionDto[];

  const { data: materialOptions } = useCompositionMaterials();

  const unSelectedMaterialOptions = registerdCompositionMaterial?.length
    ? materialOptions?.filter(
        cm =>
          !registerdCompositionMaterial.some(
            rcm => rcm.compositionMaterialCode === cm.value
          )
      )
    : materialOptions;

  useEffect(() => {
    if (defaultValues?.length && !getValues(fieldName)) {
      setValue(fieldName, defaultValues);
    }
  }, [defaultValues, getValues, setValue]);

  let sum = 0;
  registerdCompositionMaterial?.forEach(m => {
    sum = sum + (!m.quantity ? 0 : m.quantity);
  });

  return (
    <VStack align={'start'} gap={SPACE.SM} width={'min-content'} pt={SPACE.XL}>
      <Grid
        templateColumns={'20rem 7rem min-content'}
        columnGap={SPACE.SM}
        rowGap={SPACE.SM}
        w={'100%'}>
        <CompositionMaterialHeader />
        {fields.map((field, index) => (
          <CompositionMaterialRow
            key={field.id}
            fieldName={fieldName}
            index={index}
            unSelectedOptions={unSelectedMaterialOptions as SelectOption[]}
            options={materialOptions as SelectOption[]}
            onDelete={() => remove(index)}
          />
        ))}
      </Grid>
      <HStack justify={'space-between'} w={'100%'} pr={'4.5rem'}>
        {unSelectedMaterialOptions?.length &&
          fields?.length < unSelectedMaterialOptions?.length && (
            <Button
              isDisabled={!materialOptions}
              variant={'secondarySmall'}
              onClick={() =>
                append({
                  material: undefined,
                  value: undefined,
                })
              }
              rightIcon={<i className={'ri-add-line'} />}>
              {t('Common.Add')}
            </Button>
          )}
        {registerdCompositionMaterial?.length && (
          <Text
            variant={'bodyBold'}
            color={sum > 100 ? COLORS.ERROR : undefined}>
            {!sum ? '-' : sum} {t('Common.Percentage_sign')}
          </Text>
        )}
      </HStack>
    </VStack>
  );
};

export default CompositionMaterialSection;
