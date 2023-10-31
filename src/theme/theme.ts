import { extendTheme, Accordion } from '@chakra-ui/react';
import alert from './alert';
import button from './button';
import colors from './Constants/colors';
import fonts from './fonts';
import { formLabel } from './form';
import heading from './heading';
import input from './input';
import { link } from './link';
import SIZES from './Constants/sizes';
import { table } from './table';
import text from './text';
import menu from './menu';
import { tooltip } from './tooltip';
import fontSizes from './fontSizes';
import switchTheme from './Switch';
import popoverTheme from './Popover';
import { checkboxTheme } from './checkbox';
import radioTheme from './radio';
import numberInput from './numberInput';
import { accordion } from './accordion';

const theme = extendTheme({
  fonts: fonts,
  fontSizes: fontSizes,
  sizes: SIZES,
  styles: {
    global: {
      html: {
        fontSize: '62.5%',
      },
      body: {
        fontSize: text.variants.bodyRegular.fontSize,
      },
    },
  },
  components: {
    Heading: { ...heading },
    Text: { ...text },
    Link: { ...link },
    Button: { ...button },
    Input: input,
    FormLabel: { ...formLabel },
    Table: { ...table },
    MenuList: { ...menu },
    Tooltip: tooltip,
    Alert: alert,
    Switch: switchTheme,
    Popover: popoverTheme,
    Checkbox: checkboxTheme,
    Radio: radioTheme,
    NumberInput: numberInput,
    Accordion: accordion,
  },
  colors: colors,
});

export default theme;
