import { defineStyleConfig } from '@chakra-ui/react';
import COLORS from './Constants/colors';
import text from './text';

export const table = defineStyleConfig({
  baseStyle: {},
  variants: {
    default: {
      borderWidth: '0.1rem',
      borderColor: COLORS.GRAY[80],
      tr: {
        height: '3.5rem',
      },
      th: {
        py: 0,
        px: '0.6rem',
        height: '3.5rem',
        borderColor: COLORS.GRAY[60],
        borderWidth: 1,
        bg: COLORS.GRAY[80],
        color: COLORS.WHITE,
        fontSize: '1.2rem',
        textTransform: 'none',
      },
      td: {
        ...text.variants.bodyRegular,
        borderWidth: 1,
        borderColor: COLORS.GRAY[20],
        color: COLORS.GRAY[80],
        px: '0.6rem',
        py: 0,
        height: '3.5rem',
      },
    },
  },
});
