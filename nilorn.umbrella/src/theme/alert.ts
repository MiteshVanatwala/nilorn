import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SPACE } from './Constants';
import text from './text';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
  title: {
    ...text.variants.bodyBold,
  },
  description: {
    ...text.variants.bodyRegular,
  },
  container: {
    borderRadius: BORDER_RADIUS.SM,
    padding: SPACE.MD,
    color: COLORS.GRAY[100],
    bg: COLORS.GRAY[10],
    borderLeftStyle: 'solid',
    borderLeftWidth: '0.5rem',
    borderColor: COLORS.GRAY[30],
  },
});

const alert = defineMultiStyleConfig({
  baseStyle,
  variants: {
    success: {
      container: {
        color: COLORS.GRAY[0],
        bg: COLORS.GREEN.LIGHT,
        borderColor: COLORS.GREEN.DARK,
      },
    },
    error: {
      container: {
        color: COLORS.GRAY[0],
        bg: COLORS.RED.LIGHT,
        borderColor: COLORS.RED.DARK,
      },
    },
    warning: {
      container: {
        color: COLORS.GRAY[0],
        bg: COLORS.ORANGE.LIGHT,
        borderColor: COLORS.ORANGE.DARK,
      },
    },
  },
});

export default alert;
