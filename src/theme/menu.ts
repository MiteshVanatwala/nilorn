import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import COLORS from './Constants/colors';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    bg: COLORS.WHITE,
  },
  item: {
    bg: COLORS.WHITE,
    _hover: {
      bg: COLORS.GRAY[5],
    },
    _focus: {
      bg: 'inherit',
    },
  },
});

export const menu = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
});

export default menu;
