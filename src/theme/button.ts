import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { SPACE, COLORS, BORDER_RADIUS, SIZES } from './Constants/';
import text from './text';
import fontSizes from './fontSizes';
import { link } from './link';

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
  ...primary,
  color: COLORS.WHITE,
  background: COLORS.GRAY[70],
  fontSize: fontSizes.xs,
  fontWeight: 500,
  _hover: {
    background: COLORS.GRAY[80],
  },
});

const deleteBtn = defineStyle({
  ...secondary,
  color: COLORS.WHITE,
  background: COLORS.RED.PRIMARY,
  _hover: {
    background: COLORS.RED.DARK,
  },
});

const secondarySmall = defineStyle({
  ...secondary,
  px: SPACE.SM,
  py: SPACE.XXS,
  fontSize: SIZES.FONT.XXS,
  height: 'auto',
});

const primarySmall = defineStyle({
  ...primary,
  px: SPACE.SM,
  py: SPACE.XXS,
  fontSize: SIZES.FONT.XXS,
  height: 'auto',
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
  ...link.baseStyle,
  ...link.variants.textLink,
  lineHeight: 1.5,
  textAlign: 'left',
  whiteSpace: 'normal',
  height: 'auto',
  _hover: {
    textDecoration: 'underline',
  },
});

const iconBtn = defineStyle({
  fontSize: SIZES.FONT.XS,
  h: '2.1rem',
  w: '2.1rem',
  p: 0,
  cursor: 'pointer',
  _hover: {
    bg: COLORS.GRAY[10],
  },
});

const deleteIconBtn = defineStyle({
  ...iconBtn,
  _hover: {
    backgroundColor: COLORS.RED.PRIMARY,
    color: COLORS.WHITE,
  },
});

const backButton = defineStyle({
  ...text.variants.bodyBlack,
  type: 'a',
  padding: '0rem',
  borderRadius: 'none',
  i: {
    transition: 'transform 250ms ease-in-out',
  },
  _hover: {
    i: {
      transform: 'translateX(-0.8rem)',
    },
  },
});

const forwardButton = defineStyle({
  ...backButton,
  _hover: {
    i: {
      transform: 'translateX(0.8rem)',
    },
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
    secondarySmall,
    primarySmall,
    menuButton,
    textBtn,
    iconBtn,
    deleteBtn,
    deleteIconBtn,
    backButton,
    forwardButton,
    ghost: {
      height: SPACE.XL,
      '&:hover': {
        color: '#000',
        background: COLORS.GRAY[20],
      },
    },
  },
});

export default button;
