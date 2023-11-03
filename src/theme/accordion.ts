import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SIZES, SPACE } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderTop: 'none',
    overflow: 'visible',
    '.chakra-collapse': {
      overflow: 'initial !important',
    },
  },
  icon: {
    color: COLORS.GRAY[80],
    fontSize: SIZES.ICON.LG,
  },
  panel: {
    py: SPACE.MD,
    px: 0,
  },
});

const card = definePartsStyle({
  root: {
    width: '100%',
  },
  button: {
    bgColor: COLORS.GRAY[80],
    borderRadius: BORDER_RADIUS.SM,
    p: SPACE.SM,
    _hover: {
      bgColor: COLORS.GRAY[70],
    },
    '&[aria-expanded="true"]': {
      borderBottomRadius: 0,
    },
  },
  container: {
    mb: SPACE.MD,
  },
  panel: {
    p: SPACE.SM,
    borderBottomRadius: BORDER_RADIUS.SM,
    border: `1px solid ${COLORS.GRAY[30]}`,
  },
  icon: {
    color: COLORS.WHITE,
  },
});

export const accordion = defineMultiStyleConfig({
  defaultProps: {},
  variants: { card },
  baseStyle,
});
