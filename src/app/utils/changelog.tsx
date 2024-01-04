import { Text } from '@chakra-ui/react';
import { ChangeType } from '../generate';

export function renderIcon(value?: ChangeType): JSX.Element {
  switch (value) {
    case ChangeType.CREATED:
      return <Text as={'i'} className={'ri-loader-2-line'} />;
    case ChangeType.CHANGED:
      return <Text as={'i'} className={'ri-arrow-left-right-line'} />;
    case ChangeType.DELETED:
      return <Text as={'i'} className={'ri-close-line'} />;
    default:
      return <></>;
  }
}
