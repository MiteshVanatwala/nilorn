import { inputAnatomy } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';
import COLORS from './Constants/colors';
import { SPACE } from './Constants';
import fontSizes from './fontSizes';

const importantValue = (value: string) => {
  return `${value} !important`;
};

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);
const standard = defineStyle({
  borderColor: COLORS.GRAY[20],
  borderRadius: '0',
  borderBottom: '1px solid' + COLORS.GRAY[20],
  px: '0',
  paddingTop: '0',
  paddingBottom: '0.5625rem',
  textColor: COLORS.GRAY[80],
  fontWeight: 400,
  ':focus-visible': {
    borderColor: importantValue(COLORS.GRAY[60]),
    boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.GRAY[60]),
  },
  _invalid: {
    borderColor: importantValue(COLORS.ERROR),
  },
});
const outline = defineStyle({
  borderColor: COLORS.GRAY[20],
  borderRadius: SPACE.XXS,
  border: '1px solid' + COLORS.GRAY[20],
  padding: SPACE.XS,
  paddingBottom: '0.5625rem',
  textColor: COLORS.GRAY[80],
  fontWeight: 400,
  ':focus-visible': {
    borderColor: importantValue(COLORS.GRAY[60]),
    boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.GRAY[60]),
  },
  _invalid: {
    borderColor: importantValue(COLORS.ERROR),
  },
});

const filled = defineStyle({
  bgColor: COLORS.GRAY[10],
  paddingX: SPACE.XS,
  paddingY: '.85rem',
  borderRadius: SPACE.XXS,
  border: '2px solid' + COLORS.GRAY[20],
  padding: SPACE.XS,
  paddingBottom: '0.5625rem',
  textColor: COLORS.GRAY[80],
  fontWeight: 400,
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
  paddingBottom: '0.5625rem',
  color: COLORS.GRAY[80],
  fontWeight: 400,
  ':focus-visible': {
    borderColor: importantValue(COLORS.GRAY[60]),
    boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.GRAY[60]),
  },
  _invalid: {
    borderColor: importantValue(COLORS.ERROR),
  },
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
