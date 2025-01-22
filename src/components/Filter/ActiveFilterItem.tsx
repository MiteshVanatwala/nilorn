import { Button, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { BORDER_RADIUS, COLORS, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import { numToThousandSeparatedsStr } from '../../app/utils/common';
import {
  ACTIVE_SEARCH_PROFILE_NAME,
  INCLUDE_CLOSED,
} from '../../app/utils/constant';

type Props = {
  label: string;
  queryItem: string;
  filterLabel?: string;
};
const ActiveFilterItem: FC<Props> = ({ label, queryItem, filterLabel }) => {
  const { setValue } = useFormContext();

  const removeFilterItem = (queryItem: string) => {
    setValue(queryItem, undefined);
    if (queryItem !== INCLUDE_CLOSED) setValue(ACTIVE_SEARCH_PROFILE_NAME, '');
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
      rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}
      borderRadius={BORDER_RADIUS.SM}
      _hover={{
        backgroundColor: COLORS.GRAY[10],
      }}
      onClick={() => removeFilterItem(queryItem)}
      borderColor={COLORS.GRAY[30]}>
      <Text variant={'bodyBold'}>{filterLabel ? filterLabel + ': ' : ''}</Text>
      <Text variant={'bodyRegular'}>
        {isNaN(Number(label)) ? label : numToThousandSeparatedsStr(label)}
      </Text>
    </Button>
  );
};

export default ActiveFilterItem;
