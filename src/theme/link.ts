import { SPACE, COLORS } from './Constants/';
import fontSizes from './fontSizes';
import text from './text';

export const link = {
  baseStyle: {
    color: COLORS.BLACK,
    letterSpacing: '0.02em',
    ...text.variants.bodyBlack,
  },
  variants: {
    textLink: {
      color: COLORS.BLACK,
      fontSize: fontSizes.xs,
      fontWeight: 400,
      padding: '0',
    },
    headerLink: {
      px: SPACE.LG,
      height: '6.9rem',
      display: 'flex',
      alignItems: 'center',
      _activeLink: { backgroundColor: COLORS.GRAY[0], color: COLORS.BLUE[200] },
      _hover: {
        bg: COLORS.GRAY[0],
        color: COLORS.BLUE[200],
        textDecoration: 'none',
      },
    },
    headerMenulink: {
      px: SPACE.LG,
      py: '1.4rem',
      w: '100%',
      backgroundColor: COLORS.GRAY[5],
      _hover: {
        color: COLORS.GRAY[0],
        backgroundColor: COLORS.GRAY[70],
      },
    },
  },
};
