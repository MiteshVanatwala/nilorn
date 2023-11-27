import { useMemo } from 'react';
import { Badge, Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import fontSizes from '../../theme/fontSizes';
import { Status } from '../../app/generate';
import { COLORS, SPACE } from '../../theme/Constants';

type Props = {
  status?: Status;
};

const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation();
  const { color, label } = useMemo(() => {
    switch (status) {
      case Status.NEW:
        return { color: 'blue', label: 'New' };
      case Status.DESIGN:
        return { color: 'purple', label: 'Design' };
      case Status.ARTWORK:
        return { color: 'blue', label: 'Artwork' };
      case Status.SOURCING:
        return { color: 'gray', label: 'Sourcing' };
      case Status.CALCULATION:
        return { color: 'blue', label: 'Calcualtion' };
      case Status.APPROVED:
        return { color: 'green', label: 'Approved' };
      case Status.REJECTED:
        return { color: 'red', label: 'Rejected' };
      default:
        return { color: 'blue', label: 'New' };
    }
  }, [status]);

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
          {t(`PD.StatusLabel.${label}`)}
        </Text>
      </HStack>
    </Badge>
  );
};

export default StatusBadge;
