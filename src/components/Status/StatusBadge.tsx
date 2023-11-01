import { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import fontSizes from '../../theme/fontSizes';
import { ProductDevelopmentStatus } from '../../generate';

type Props = {
  status?: ProductDevelopmentStatus;
};

const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation();
  const { color, label } = useMemo(() => {
    // TODO: Request enum name not index.
    switch (status) {
      case ProductDevelopmentStatus._0:
        return { color: 'blue', label: 'New' };
      case ProductDevelopmentStatus._1:
        return { color: 'yellow', label: 'Waiting' };
      case ProductDevelopmentStatus._2:
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
