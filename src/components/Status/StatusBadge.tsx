import { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import fontSizes from '../../theme/fontSizes';
import { Status } from '../../app/generate';

type Props = {
  status?: Status;
};

const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation();
  const { color, label } = useMemo(() => {
    // TODO: Request enum name not index.
    switch (status) {
      case Status.NEW:
        return { color: 'blue', label: 'New' };
      case Status.DESIGN:
        return { color: 'yellow', label: 'Waiting' };
      case Status.ARTWORK:
        return { color: 'green', label: 'Done' };
      default:
        return { color: 'blue', label: 'New' };
    }
  }, [status]);

  return (
    <Badge variant="subtle" fontSize={fontSizes.xs} colorScheme={color}>
      {t(`PD.StatusLabel.${label}`)}
    </Badge>
  );
};

export default StatusBadge;
