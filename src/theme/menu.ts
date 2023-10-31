import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import COLORS from './Constants/colors';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    backgroundColor: COLORS.GRAY[5],
  },
});

export const menu = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
});

export default menu;
