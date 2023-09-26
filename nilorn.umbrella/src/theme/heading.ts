import { COLORS, SIZES } from './Constants';

const heading = {
  baseStyle: {
    color: COLORS.GRAY[80],
    letterSpacing: '0.02em',
  },
  variants: {
    h1: {
      fontSize: SIZES.FONT.XXL,
      fontWeight: '700',
    },
    h2: {
      fontSize: SIZES.FONT.XL,
      fontWeight: '700',
    },
    h3: {
      fontSize: SIZES.FONT.LG,
      fontWeight: '700',
    },
    h4: {
      fontSize: SIZES.FONT.MD,
      fontWeight: '700',
    },
    h5: {
      fontSize: SIZES.FONT.SM,
      fontWeight: '700',
    },
    bodyBold: {
      fontSize: SIZES.FONT.XS,
      fontWeight: '700',
    },
  },
};

export default heading;
