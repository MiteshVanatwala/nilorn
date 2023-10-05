import { SPACE, COLORS } from './Constants/';
import fontSizes from './fontSizes';
import text from './text';

export const link = {
  baseStyle: {
    color: COLORS.GRAY[80],
    letterSpacing: '0.02em',
    ...text.variants.bodyBlack,
  },
  variants: {
    textLink: {
      color: COLORS.GRAY[80],
      fontSize: fontSizes.xs,
      fontWeight: 700,
      padding: '0',
      borderRadius: 'none',
      height: '2rem',
      border: 'none',
      textDecoration: 'none !important',
      boxShadow: `0 1px 0 0 ${COLORS.GRAY[60]}`,
      _hover: {
        boxShadow: `0 2px 0 0 ${COLORS.GRAY[80]}`,
      },
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
    headerMenuButton: {
      px: SPACE.LG,
      py: '1.4rem',
      w: '100%',
      textAlign: 'start',
      backgroundColor: COLORS.GRAY[5],
      _focus: {
        backgroundColor: COLORS.GRAY[70],
      },
      _hover: {
        color: COLORS.GRAY[0],
        backgroundColor: COLORS.GRAY[70],
      },
    },
  },
};
