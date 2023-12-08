import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SIZES, SPACE } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  root: {
    width: '100%',
  },
  container: {
    mb: SPACE.MD,
    borderTop: 'none',
    overflow: 'visible',
    '.chakra-collapse': {
      overflow: 'initial !important',
    },
  },
  button: {
    borderRadius: BORDER_RADIUS.SM,
    border: 'none',
    p: SPACE.SM,
  },
  icon: {
    color: COLORS.GRAY[80],
    fontSize: SIZES.ICON.LG,
  },
  panel: {
    px: SPACE.SM,
    py: SPACE.MD,
  },
});

const card = definePartsStyle({
  button: {
    bgColor: COLORS.GRAY[80],
    _hover: {
      bgColor: COLORS.GRAY[70],
    },
    '&[aria-expanded="true"]': {
      borderBottomRadius: 0,
    },
  },
  panel: {
    borderBottomRadius: BORDER_RADIUS.SM,
    border: `1px solid ${COLORS.GRAY[30]}`,
  },
  icon: {
    color: COLORS.WHITE,
  },
});
const light = definePartsStyle({
  button: {
    bgColor: COLORS.GRAY[10],
    color: COLORS.GRAY[80],
    _hover: {
      bgColor: COLORS.GRAY[20],
    },
  },
  icon: {
    color: COLORS.GRAY[80],
  },
});
export const accordion = defineMultiStyleConfig({
  defaultProps: {},
  variants: { card, light },
  baseStyle,
});
