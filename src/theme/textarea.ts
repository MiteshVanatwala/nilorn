import { inputAnatomy } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';
import COLORS from './Constants/colors';
import { SPACE } from './Constants';
import fontSizes from './fontSizes';
import input from './input';

const importantValue = (value: string) => {
  return `${value} !important`;
};

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);
const standard = defineStyle({
  borderRadius: '0',
  borderBottom: '1px solid' + COLORS.GRAY[20],
  px: '0',
  pt: '0',
});
const outline = defineStyle({
  border: '1px solid' + COLORS.GRAY[20],
  padding: SPACE.XS,
  paddingTop: '0.5625rem',
});

const filled = defineStyle({
  bgColor: COLORS.GRAY[10],
  paddingX: SPACE.XS,
  paddingTop: '0.5625rem',
  border: '2px solid' + COLORS.GRAY[20],

  _hover: {
    borderColor: COLORS.GRAY[20],
    bgColor: COLORS.GRAY[10],
  },
  _focusWithin: {
    bgColor: COLORS.GRAY[10],
    boxShadow: importantValue('none'),
  },
});

const sizes = {
  xs: definePartsStyle({
    field: { fontSize: fontSizes.xs, p: SPACE.XXS, height: '2.2rem' },
  }),
};

const baseStyle = definePartsStyle({
  ...input.baseStyle?.field,

  field: {},
});
export const textarea = defineStyleConfig({
  baseStyle,
  sizes: sizes,
  variants: {
    standard,
    outline,
    filled,
  },
  defaultProps: { variant: 'standard' },
});

export default textarea;
