import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS } from './Constants';
import text from './text';

const baseStyle = defineStyle({
  ...text.variants.bodyRegular,
  background: COLORS.GRAY[90],
  color: COLORS.GRAY[0],
  borderRadius: BORDER_RADIUS.SM,
  transitionDelay: '200ms',
  transitionDuration: '200ms',
});

export const tooltip = defineStyleConfig({
  baseStyle,
});
