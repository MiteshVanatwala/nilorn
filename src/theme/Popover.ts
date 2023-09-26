import { popoverAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { COLORS, SPACE } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys);

const baseStyle = definePartsStyle({
  content: {
    borderColor: COLORS.GRAY[60],
    p: SPACE.MD,
    width: 'max-content',
  },
});

const popoverTheme = defineMultiStyleConfig({
  baseStyle,
});

export default popoverTheme;
