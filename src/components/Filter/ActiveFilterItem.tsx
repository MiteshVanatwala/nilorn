import { FC } from 'react';
import { BORDER_RADIUS, COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { onFilterChange } from './FilterHelper';
type Props = {
  label: string;
  value: string;
  queryItem: string;
};
const ActiveFilterItem: FC<Props> = ({ label, value, queryItem }) => {
  const { setValue: setFormContextValue, getValues } = useFormContext();
  let [searchParams, setSearchParams] = useSearchParams();

  const removeFilterItem = (queryItem: string) => {
    setFormContextValue(queryItem, '');

    const newSearchParams = new URLSearchParams(onFilterChange(getValues()));
    setSearchParams(newSearchParams);
  };

  return (
    <Button
      gap={'.5rem'}
      alignItems={'center'}
      border={`solid 1px ${COLORS.GRAY[30]}`}
      px={SPACE.SM}
      py={SPACE.XXS}
      rightIcon={<i className="ri-close-line" />}
      borderRadius={BORDER_RADIUS.SM}
      backgroundColor={'transparent'}
      _hover={{
        backgroundColor: COLORS.GRAY[10],
      }}
      onClick={() => removeFilterItem(queryItem)}
      borderColor={COLORS.GRAY[30]}>
      {label}
    </Button>
  );
};

export default ActiveFilterItem;
