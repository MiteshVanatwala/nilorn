import { Button, Grid, VStack } from '@chakra-ui/react';
import { SPACE } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useCompositionMaterial } from '../../../app/api/compositionMaterial';
import CompositionMaterialHeader from './CompositionMaterialHeader';
import CompositionMaterialRow from './CompositionMaterialRow';
import { SelectOption } from '../../../app/types/types';

const CompositionMaterialSection = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const fieldName = 'compositionMaterial';
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });
  const registerdCompositionMaterial = useWatch({ name: fieldName }) as any[];
  const { data } = useCompositionMaterial();

  const filteredOptions = registerdCompositionMaterial?.length
    ? data?.filter(
        cm => !registerdCompositionMaterial.some(rcm => rcm.value === cm.value)
      )
    : data;

  return (
    <VStack align={'start'} gap={SPACE.SM}>
      <Grid
        templateColumns={'repeat(3, 1fr)'}
        columnGap={SPACE.SM}
        rowGap={SPACE.SM}>
        <CompositionMaterialHeader />
        {fields.map((field, index) => (
          <CompositionMaterialRow
            key={field.id}
            fieldName={fieldName}
            index={index}
            options={filteredOptions as SelectOption[]}
            onDelete={() => remove(index)}
          />
        ))}
      </Grid>
      {filteredOptions?.length && fields?.length < filteredOptions?.length && (
        <Button
          isDisabled={!data}
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
    </VStack>
  );
};

export default CompositionMaterialSection;
