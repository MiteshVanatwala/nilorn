import { Text } from '@chakra-ui/react';
import { CahngeType } from '../../components/Changelog/useChangelogColumns';

export function renderIcon(value: CahngeType): JSX.Element {
  switch (value) {
    case CahngeType.NEW:
      return <Text as={'i'} className={'ri-loader-2-line'} />;
    case CahngeType.UPDATE:
      return <Text as={'i'} className={'ri-arrow-left-right-line'} />;
    case CahngeType.DELETE:
      return <Text as={'i'} className={'ri-close-line'} />;
  }
}
