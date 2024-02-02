import { useChangelog } from '../../app/api/changelog';
import { ChangelogType } from '../../app/generate';
import { useChangelogByPropertyName } from '../../app/hooks/useChangelog';
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
  const changelog = useChangelogByPropertyName(propertyName, type, id);

  return <>{changelog && <ChangelogPopup data={changelog} />}</>;
};

export default ChangelogListItem;
