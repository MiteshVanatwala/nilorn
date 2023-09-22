import { checkboxAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS } from './Constants';
import text from './text';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const sizes = {
  default: definePartsStyle({
    control: { w: '2rem', h: '2rem' },
    label: { ...text.variants.bodyRegular },
  }),
};

const baseStyle = definePartsStyle({
  control: {
    borderColor: COLORS.GRAY[60],
    borderRadius: BORDER_RADIUS.XS,
    bg: COLORS.WHITE,
    _hover: {
      borderColor: COLORS.GRAY[50],
    },
    _checked: {
      bg: COLORS.GRAY[70],
      borderColor: COLORS.GRAY[70],
      _hover: {
        borderColor: COLORS.BLUE[100],
        bg: COLORS.BLUE[100],
      },
    },
  },
});

const light = (props: StyleFunctionProps) =>
  definePartsStyle({
    control: {
      borderColor: COLORS.GRAY[20],
    },
  });

export const checkboxTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'default',
    variant: 'default',
  },
  baseStyle,
  sizes,
  variants: {
    default: {},
    light,
  },
});
