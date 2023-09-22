import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { COLORS } from './Constants';
import text from './text';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const sizes = {
  default: definePartsStyle({
    control: { w: '2rem', h: '2rem' },
    label: { ...text.variants.bodyRegular },
  }),
};

const baseStyle = definePartsStyle({
  control: {
    borderColor: COLORS.GRAY[60],
    _checked: {
      borderColor: COLORS.GRAY[70],
      bg: COLORS.GRAY[70],
      _hover: {
        borderColor: COLORS.BLUE[100],
        bg: COLORS.BLUE[100],
      },
    },
  },
});

const radioTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'default',
  },
  baseStyle,
  sizes,
});

export default radioTheme;
