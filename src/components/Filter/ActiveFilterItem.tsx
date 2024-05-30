import { FC } from 'react';
import { BORDER_RADIUS, COLORS, SPACE } from '../../theme/Constants';
import { Button, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { INCLUDE_CLOSED } from '../../app/utils/constant';

type Props = {
  label: string;
  queryItem: string;
  filterLabel?: string;
};
const ActiveFilterItem: FC<Props> = ({ label, queryItem, filterLabel }) => {
  const { resetField, setValue } = useFormContext();

  const removeFilterItem = (queryItem: string) => {
    if (queryItem === INCLUDE_CLOSED) {
      setValue(queryItem, undefined);
    } else {
      resetField(queryItem);
    }
  };

  return (
    <Button
      backgroundColor={COLORS.WHITE}
      zIndex={6}
      gap={SPACE.XXS}
      alignItems={'center'}
      border={`solid 1px ${COLORS.GRAY[30]}`}
      px={SPACE.SM}
      py={SPACE.XXS}
      rightIcon={<i className="ri-close-line" />}
      borderRadius={BORDER_RADIUS.SM}
      _hover={{
        backgroundColor: COLORS.GRAY[10],
      }}
      onClick={() => removeFilterItem(queryItem)}
      borderColor={COLORS.GRAY[30]}>
      <Text variant={'bodyBold'}>{filterLabel ? filterLabel + ': ' : ''}</Text>
      <Text variant={'bodyRegular'}> {label}</Text>
    </Button>
  );
};

export default ActiveFilterItem;
