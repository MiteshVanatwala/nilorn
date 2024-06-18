import { Spinner } from '@chakra-ui/react';
import { FieldState } from '../types/types';
import { COLORS, SIZES } from '../../theme/Constants';
import RemixIcon from '../../components/Icon/RemixIcon';

export function getValidationStyle(
  state?: FieldState,
  isLoading: boolean = false
): {
  color: string;
  icon: JSX.Element;
} {
  if (isLoading) {
    return { color: COLORS.GRAY[80], icon: <Spinner /> };
  }
  switch (state) {
    case FieldState.ERROR:
      return {
        color: COLORS.ERROR,
        icon: (
          <RemixIcon
            component="Text"
            icon="CLOSE_CIRCLE_LINE"
            color={'inherit'}
            fontSize={SIZES.ICON.SM}
          />
        ),
      };
    case FieldState.VALID:
      return {
        color: COLORS.GREEN.PRIMARY,
        icon: (
          <RemixIcon
            component="Text"
            icon="CHECK_LINE"
            color={'inherit'}
            fontSize={SIZES.ICON.SM}
          />
        ),
      };
    default:
      return { color: COLORS.GRAY[80], icon: <></> };
  }
}
