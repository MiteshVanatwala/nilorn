import { inputAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
  theme,
} from '@chakra-ui/react';
import COLORS from './Constants/colors';
import { SPACE } from './Constants';
import fontSizes from './fontSizes';

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
    paddingBottom: '0.5625rem',
    color: COLORS.GRAY[80],
    fontWeight: 400,
    ':focus-visible': {
      borderColor: importantValue(COLORS.GRAY[20]),
      // boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.GRAY[60]),
    },
    _invalid: {
      borderColor: importantValue(COLORS.ERROR),
      boxShadow: importantValue('0px 1px 0px 0px ' + COLORS.ERROR),
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
  },
  defaultProps: { variant: 'standard' },
});

export default input;
