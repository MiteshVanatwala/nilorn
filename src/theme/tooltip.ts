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

const error = defineStyle({
  background: COLORS.ERROR,
});

const attachmentTooltip = defineStyle({
  padding: '1rem',
  '&.attachment-tooltip': {
    width: '20vw',
    maxWidth: '50vw',
    ol: {
      listStyle: 'decimal',
      paddingLeft: '3em',
      margin: 0,
    },
    ul: {
      listStyle: 'disc',
      paddingLeft: '3em',
      margin: 0,
    },
    li: {
      display: 'list-item',
    },
  },
});

export const tooltip = defineStyleConfig({
  baseStyle,
  variants: { error, attachmentTooltip },
});
