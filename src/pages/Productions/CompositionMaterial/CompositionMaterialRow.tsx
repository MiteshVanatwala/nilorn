import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../app/types/types';
import { GridItem, IconButton, Text } from '@chakra-ui/react';
import Select from '../../../components/Form/Select';

type Props = {
  options: SelectOption[];
  fieldName: string;
  index: number;
  onDelete: () => void;
};

const CompositionMaterialRow = ({
  fieldName,
  index,
  options,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const meterial = `${fieldName}.${index}.meterial`; // TODO: Match with API
  const value = `${fieldName}.${index}.value`; // TODO: Match with API

  return (
    <>
      <GridItem>
        <Select name={meterial} options={options} />
      </GridItem>
      <GridItem>Field</GridItem>
      <GridItem>
        <IconButton
          variant={'ghost'}
          aria-label={t('Common.Remove')}
          onClick={onDelete}
          icon={<Text as={'i'} className="ri-close-line" />}
        />
      </GridItem>
    </>
  );
};

export default CompositionMaterialRow;
