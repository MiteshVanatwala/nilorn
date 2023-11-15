import SPACE from './spaces';

const GRID = {
  TEMPLATE_COLUMNS: {
    base: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(1, 1fr)',
    lg: 'repeat(10, 1fr)',
    xl: 'repeat(12, 1fr)',
  },
  ROW_GAP: SPACE.XL,
  COLUM_GAP: '3.6rem', // Not common used elsewhere
  GAP_COMPOSITION: '7.6rem',
  GRID_GAP: {
    base: SPACE.SM,
    lg: SPACE.MD,
  },
};

export default GRID;
