import { PriceDto } from '../../app/generate';
import { CSSProperties, Fragment } from 'react';
import { TD_STYLE_CALCULATION } from '../../theme/Constants/tableGrid';
import { GridTd } from '../../components/GridTable/GridTableElements';
import { COLORS, SPACE } from '../../theme/Constants';

type Props = {
  calculation: PriceDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
  index: number;
};

function EditCalculationGridRow({
  calculation,
  style = TD_STYLE_CALCULATION,
  tableMenu,
  index,
}: Props) {
  return (
    <>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        <>{calculation.quantity}</>
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {calculation.quantity}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {calculation.cost}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {calculation.margin}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {calculation.salesPrice}
      </GridTd>
    </>
  );
}

export default EditCalculationGridRow;
