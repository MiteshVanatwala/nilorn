import { COLORS, SPACE } from './Constants';
import text from './text';

export const formLabel = {
  baseStyle: {
    ...text.variants.bodyBold,
    color: COLORS.GRAY[80],
    letterSpacing: '0.02em',
    marginBottom: SPACE.SM,
  },
  variants: {
    thin: {
      ...text.variants.bodyRegular,
      color: COLORS.BLACK,
    },
  },
};

export const inputGroup = {
  baseStyle: {
    ...text.variants.bodyBold,
  },
  variants: {},
};
