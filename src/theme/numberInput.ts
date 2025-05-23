import { numberInputAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { COLORS } from './Constants';
import input from './input';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const outline = (props: StyleFunctionProps) =>
  definePartsStyle({
    ...input.variants?.outline(props),
  });

const baseStyle = definePartsStyle({
  root: {
    borderBottom: '1px solid',
    borderColor: 'inherit',
  },
  field: {
    ...input.baseStyle?.field,
  },
  stepperGroup: {
    border: 'none',
  },
  stepper: {
    border: 'none',
    color: COLORS.GRAY[80],
  },
});

const numberInput = defineMultiStyleConfig({
  baseStyle,
  variants: {
    outline,
  },
  defaultProps: { variant: 'outline' },
});

export default numberInput;
