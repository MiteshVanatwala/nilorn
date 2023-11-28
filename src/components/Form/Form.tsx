import { Text, Spinner } from '@chakra-ui/react';
import { FieldState } from '../../app/types/types';
import { COLORS, SIZES } from '../../theme/Constants';

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
          <Text
            as={'i'}
            color={'inherit'}
            className="ri-close-circle-line"
            fontSize={SIZES.ICON.SM}
          />
        ),
      };
    case FieldState.VALID:
      return {
        color: COLORS.GREEN.PRIMARY,
        icon: (
          <Text
            as={'i'}
            color={'inherit'}
            className="ri-check-line"
            fontSize={SIZES.ICON.SM}
          />
        ),
      };
    default:
      return { color: COLORS.GRAY[80], icon: <></> };
  }
}
