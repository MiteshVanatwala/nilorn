import { inputAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
  theme,
} from '@chakra-ui/react';
import COLORS from './Constants/colors';
import { SPACE } from './Constants';
import fontSizes from './fontSizes';
import text from './text';

const importantValue = (value: string) => {
  return `${value} !important`;
};

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const standard = (props: StyleFunctionProps) =>
  definePartsStyle({
    ...theme.components.Input.variants?.flushed(props),
  });

const outline = (props: StyleFunctionProps) =>
  definePartsStyle({
    ...theme.components.Input.variants?.outline(props),
    field: {
      ...theme.components.Input.variants?.outline(props).field,
      padding: SPACE.XS,
      borderRadius: 0,
      borderColor: COLORS.GRAY[20],
    },
  });

const filled = (props: StyleFunctionProps) =>
  definePartsStyle({
    ...theme.components.Input.variants?.filled(props),
    field: {
      ...theme.components.Input.variants?.filled(props).field,
      borderColor: COLORS.GRAY[10],
      bgColor: COLORS.GRAY[10],
      border: '2px solid',
      paddingX: SPACE.XS,
      paddingY: '.45rem',
      _hover: {
        borderColor: COLORS.GRAY[20],
        bgColor: COLORS.GRAY[10],
      },
      _focusWithin: {
        bgColor: COLORS.GRAY[10],
        boxShadow: importantValue('none'),
      },
    },
  });

const light = (props: StyleFunctionProps) =>
  definePartsStyle({
    ...theme.components.Input.variants?.flushed(props),
    field: {
      ...theme.components.Input.variants?.flushed(props).field,
      color: COLORS.WHITE,
      _placeholder: {
        color: COLORS.GRAY[5],
      },
      ':focus-visible': {
        borderColor: importantValue(COLORS.WHITE),
        boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.WHITE),
      },
    },
  });

const sizes = {
  xs: definePartsStyle({
    field: { fontSize: fontSizes.xs, p: SPACE.XXS, height: '2.2rem' },
  }),
};

const baseStyle = definePartsStyle({
  field: {
    paddingBottom: '0.2rem',
    h: '3.7rem',
    fontWeight: text.variants.bodyRegular.fontWeight,
    ':focus-visible': {
      borderColor: importantValue(COLORS.GRAY[60]),
      boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.GRAY[60]),
    },
    _readOnly: {
      _placeholder: {
        color: COLORS.GRAY[50],
      },
    },
    _autofill: {
      transition: 'background-color 0s 600000s, color 0s 600000s',
    },
    _invalid: {
      borderColor: importantValue(COLORS.ERROR),
      ':focus-visible': {
        borderColor: importantValue(COLORS.ERROR),
        boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.ERROR),
      },
    },
  },
});

const input = defineMultiStyleConfig({
  baseStyle,
  sizes: sizes,
  variants: {
    standard,
    light,
    outline,
    filled,
  },
  defaultProps: { variant: 'standard' },
});

export default input;
