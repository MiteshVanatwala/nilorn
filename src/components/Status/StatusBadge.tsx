import { useMemo } from 'react';
import { Badge, Box, HStack, Text } from '@chakra-ui/react';
import fontSizes from '../../theme/fontSizes';
import { Status } from '../../app/generate';
import { COLORS, SPACE } from '../../theme/Constants';
import { useStatusOptions } from '../../app/hooks/useStatus';

type Props = {
  status?: Status;
};

const StatusBadge = ({ status }: Props) => {
  const { statuses } = useStatusOptions();
  const { color, label } = useMemo(() => {
    return statuses.find(s => s.value === status) || { label: '', color: '' };
  }, [status, statuses]);

  return (
    <Badge
      variant="subtle"
      fontSize={fontSizes.xs}
      colorScheme={color}
      px={SPACE.XS}>
      <HStack spacing={SPACE.XS}>
        <Box w={'6px'} h={'6px'} borderRadius={'2px'} bg={color}></Box>
        <Text
          variant={'bodyRegular'}
          color={COLORS.BLACK}
          textTransform={'capitalize'}>
          {label}
        </Text>
      </HStack>
    </Badge>
  );
};

export default StatusBadge;
