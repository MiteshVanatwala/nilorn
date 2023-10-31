import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { COLORS, SIZES, SPACE } from './Constants';

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

export const accordion = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
});
