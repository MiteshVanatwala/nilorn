import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { SPACE, COLORS, BORDER_RADIUS, SIZES } from './Constants/';
import text from './text';
import fontSizes from './fontSizes';

const primary = defineStyle({
  colorScheme: 'primary',
  color: COLORS.GRAY[90],
  background: COLORS.BLUE[100],
  fontSize: fontSizes.xs,
  fontWeight: 900,
  px: SPACE.XL,
  height: SPACE.XL,
  letterSpacing: '0.5px',
  _hover: {
    background: COLORS.BLUE[200],
  },
});

const secondary = defineStyle({
  color: COLORS.WHITE,
  background: COLORS.GRAY[70],
  fontSize: fontSizes.xs,
  fontWeight: 500,
  px: SPACE.XL,
  height: SPACE.XL,
  letterSpacing: '0.5px',
  _hover: {
    background: COLORS.GRAY[80],
  },
});
const menuButton = defineStyle({
  ...text.variants.bodyBlack,
  borderRadius: 0,
  px: '1.75rem',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  height: '6.9rem',
  color: COLORS.GRAY[80],
  _hover: { backgroundColor: COLORS.GRAY[0], color: COLORS.BLUE[200] },
});
const textBtn = defineStyle({
  ...text.variants.bodyBold,
  color: COLORS.BLACK,
  padding: '0',
  borderRadius: 'none',
  borderBottom: '2px solid transparent',
  height: '2rem',
  _hover: {
    borderColor: COLORS.BLACK,
  },
});

const tableButton = defineStyle({
  fontSize: '1.6rem',
  fontWeight: 100,
  p: '0rem',
  cursor: 'pointer',
  _hover: {
    backgroundColor: COLORS.GRAY[60],
    color: '#fff',
  },
});

const deleteBtn = defineStyle({
  ...tableButton,
  _hover: {
    backgroundColor: COLORS.RED.PRIMARY,
    color: COLORS.WHITE,
  },
});

const button = defineStyleConfig({
  defaultProps: {},
  baseStyle: {
    borderRadius: BORDER_RADIUS.SM,
    fontSize: SIZES.FONT.SM,
    _disabled: {
      pointerEvents: 'none',
    },
  },
  variants: {
    primary,
    secondary,
    menuButton,
    textBtn,
    tableButton,
    deleteBtn,
    ghost: {
      height: SPACE.XL,
      '&:hover': {
        color: '#000',
      },
    },
  },
});

export default button;
