import { Box } from '@chakra-ui/react';
import { useChangelog } from '../../app/api/changelog';
import { ChangelogType } from '../../app/generate';
import { useProductionChangelog } from '../../app/hooks/useChangelog';
import ChangelogPopup from './ChangelogPopup';

type Props = {
  showChanges?: boolean;
  propertyName: string;
  id: string;
  type: ChangelogType;
};

const ChangelogListItem = ({
  id,
  propertyName,
  type,
  showChanges = false,
}: Props) => {
  useChangelog(undefined, type, id, showChanges);
  const changelog = useProductionChangelog(propertyName, id);

  return (
    <Box position={'absolute'} top={'5px'} right={0}>
      {changelog && <ChangelogPopup data={changelog} />}
    </Box>
  );
};

export default ChangelogListItem;
