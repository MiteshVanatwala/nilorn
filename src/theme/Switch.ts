import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { COLORS } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    p: '2px',
    bg: COLORS.GRAY[60],
    _checked: {
      bg: COLORS.BLUE[100],
    },
  },
});

const switchTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'lg',
  },
  baseStyle,
});

export default switchTheme;
