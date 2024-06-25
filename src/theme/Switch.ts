import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { COLORS } from './Constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    p: '2px',
    bg: COLORS.GRAY[30],
    _checked: {
      bg: COLORS.GRAY[70],
    },
    _readOnly: {
      cursor: 'default',
    },
  },
});

const invalid = definePartsStyle({
  track: {
    bg: COLORS.ERROR,
  },
});

const switchTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'lg',
  },
  baseStyle,
  variants: {
    invalid,
  },
});

export default switchTheme;
