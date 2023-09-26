import SPACE from './spaces';

const GRID = {
  TEMPLATE_COLUMNS: {
    base: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)',
  },
  ROW_GAP: SPACE.XL,
  COLUM_GAP: '3.6rem', // Not common used elsewhere
  GAP_COMPOSITION: '7.6rem',
};

export default GRID;
