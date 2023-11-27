import { popoverAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { BOX_SHADOW, COLORS, SPACE } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys);

const baseStyle = definePartsStyle({
  content: {
    borderColor: COLORS.GRAY[30],
    p: SPACE.MD,
    width: 'max-content',
  },
  popper: {
    zIndex: 999,
    boxShadow: BOX_SHADOW.CARD,
  },
});

const small = definePartsStyle({
  content: {
    p: 0,
  },
  body: { p: 0 },
});

const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    small,
  },
});

export default popoverTheme;
