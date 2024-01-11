import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import COLORS from './Constants/colors';
import text from './text';
import { tableAnatomy } from '@chakra-ui/anatomy';
import fontSizes from './fontSizes';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyle = definePartsStyle({
  borderWidth: '0.1rem',
  borderColor: COLORS.GRAY[80],
  py: '10rem',

  tr: {
    height: '3.5rem',
  },
  th: {
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    height: '3.5rem',
    borderColor: COLORS.GRAY[60],
    borderWidth: 1,
    backgroundColor: COLORS.GRAY[80],
    color: COLORS.WHITE,
    fontSize: fontSizes.xs,
    textTransform: 'none',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    fontWeight: 700,
  },
  td: {
    ...text.variants.bodyRegular,
    borderWidth: 1,
    borderColor: COLORS.GRAY[20],
    color: COLORS.GRAY[80],
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    pY: 0,
    height: '3.5rem',
    verticalAlign: 'middle',
  },
});

const sizes = {
  lg: definePartsStyle({
    td: { py: '1rem' },
  }),
};
export const table = defineMultiStyleConfig({
  baseStyle,
  sizes: sizes,

  defaultProps: {
    size: 'lg',
    variant: 'default',
  },
});

export default table;
