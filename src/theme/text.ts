import { COLORS, SIZES } from './Constants';

const text = {
  baseStyle: {
    color: COLORS.BLACK,
    letterSpacing: '0.02em',
  },
  variants: {
    bodyBigBlack: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '900',
    },
    bodyBigBold: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '700',
    },
    bodyBigRegular: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '400',
    },
    bodyDetailsBold: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '700',
    },
    bodyDetailsRegular: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '400',
    },
    bodyBlack: {
      fontSize: SIZES.FONT.XS,
      fontWeight: '900',
    },
    bodyBold: {
      fontSize: SIZES.FONT.XS,
      fontWeight: '700',
    },
    bodyRegular: {
      fontSize: SIZES.FONT.XS,
      fontWeight: '400',
    },
    disabled: {
      color: 'inherit',
    },
  },
};

export default text;
