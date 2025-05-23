import RemixIcon from '../../components/Icon/RemixIcon';
import { ChangeType } from '../generate';

export function renderIcon(value?: ChangeType): JSX.Element {
  switch (value) {
    case ChangeType.CREATED:
      return <RemixIcon component="Text" icon="LOADER_2_LINE" />;
    case ChangeType.CHANGED:
      return <RemixIcon component="Text" icon="ARROW_LEFT_RIGHT_LINE" />;
    case ChangeType.DELETED:
      return <RemixIcon component="Text" icon="CLOSE_LINE" />;
    default:
      return <></>;
  }
}
