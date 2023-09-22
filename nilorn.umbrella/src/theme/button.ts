import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { SPACE, COLORS, BORDER_RADIUS } from './Constants/';
import text from './text';

const primary = defineStyle({
  colorScheme: 'primary',
  color: COLORS.GRAY[90],
  background: COLORS.BLUE[100],
  fontSize: '1.2rem',
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
  fontSize: '1.2rem',
  fontWeight: 900,
  px: SPACE.XL,
  height: SPACE.XL,
  letterSpacing: '0.5px',
  _hover: {
    background: COLORS.GRAY[80],
  },
});

const error = defineStyle({
  color: COLORS.WHITE,
  background: COLORS.RED.PRIMARY,
  fontSize: '1.2rem',
  fontWeight: 900,
  px: SPACE.XL,
  height: SPACE.XL,
  letterSpacing: '0.5px',
  _hover: {
    background: COLORS.RED.LIGHT,
  },
});

const tableText = defineStyle({
  color: COLORS.GRAY[80],
  fontSize: '1.2rem',
  fontWeight: 700,
  padding: '0',
  borderRadius: 'none',
  height: '2rem',
  border: 'none',
  boxShadow: `0 1px 0 0 ${COLORS.GRAY[60]}`,
  cursor: 'pointer',
  _hover: {
    boxShadow: `0 2px 0 0 ${COLORS.GRAY[80]}`,
  },
});

const backButton = defineStyle({
  ...text.variants.bodyBlack,
  type: 'button',
  padding: '0rem',
  i: {
    transition: 'transform 250ms ease-in-out',
  },
  _hover: {
    i: {
      transform: 'translateX(-0.8rem)',
    },
  },
});
const nextButton = defineStyle({
  ...text.variants.bodyBlack,
  type: 'button',
  position: 'absolute',
  bottom: '-5.2rem',
  right: '0',
  padding: '0rem',
  color: COLORS.GRAY[80],
  i: {
    transition: 'transform 250ms ease-in-out',
  },
  _hover: {
    color: COLORS.BLACK,
    i: {
      transform: 'translateX(+0.8rem)',
    },
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

const tableButtonDelete = defineStyle({
  ...tableButton,
  _hover: {
    backgroundColor: COLORS.ERROR,
    color: '#fff',
  },
});

const tableButtonTextIcon = defineStyle({
  fontSize: '1.2rem',
  fontWeight: 700,
  paddingX: SPACE.SM,
  cursor: 'pointer',
  _hover: {
    backgroundColor: COLORS.GRAY[70],
    color: '#fff',
  },
});

const button = defineStyleConfig({
  defaultProps: {},
  baseStyle: {
    borderRadius: BORDER_RADIUS.SM,
    fontSize: '1.6rem',
    _disabled: {
      pointerEvents: 'none',
    },
  },
  variants: {
    primary,
    secondary,
    error,
    tableText,
    backButton,
    nextButton,
    menuButton,
    textBtn,
    tableButton,
    tableButtonDelete,
    tableButtonTextIcon,
    ghost: {
      '&:hover': {
        color: '#000',
      },
    },
  },
});

export default button;
