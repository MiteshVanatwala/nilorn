import { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import { Status } from '../../pages/Overview/mock';
import { useTranslation } from 'react-i18next';
import fontSizes from '../../theme/fontSizes';

type Props = {
  status: Status;
};
const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation();
  const { color, label } = useMemo(() => {
    switch (status) {
      case Status.NEW:
        return { color: 'blue', label: 'new' };
      case Status.WAITING:
        return { color: 'yellow', label: 'waiting' };
      case Status.DONE:
        return { color: 'green', label: 'done' };
      default:
        return { color: 'blue', label: 'new' };
    }
  }, [status]);

  return (
    <Badge variant="subtle" fontSize={fontSizes.SX} colorScheme={color}>
      {t(`PD.statusLabel.${label}`)}
    </Badge>
  );
};

export default StatusBadge;
