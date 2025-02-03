import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import COLORS from './Constants/colors';
import { SPACE } from './Constants';
import text from './text';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    bg: COLORS.WHITE,
  },
  item: {
    ...text.variants.bodyBlack,
    backgroundColor: COLORS.GRAY[5],
    px: SPACE.LG,
    py: '1.4rem',
    w: '100%',
    _hover: {
      color: COLORS.GRAY[0],
      bg: COLORS.GRAY[70],
      textDecor: 'underline',
    },
    _focus: {
      color: COLORS.GRAY[0],
      bg: COLORS.GRAY[70],
      textDecor: 'underline',
    },
  },
});

export const menu = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
});

export default menu;
