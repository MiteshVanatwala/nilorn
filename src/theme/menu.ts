import { defineStyleConfig } from '@chakra-ui/react';
import COLORS from './Constants/colors';

const menu = defineStyleConfig({
  // Default types on text?
  defaultProps: {},
  baseStyle: {
    backgroundColor: COLORS.GRAY[5],
  },
});

export default menu;
