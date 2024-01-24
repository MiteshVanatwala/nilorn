import { GridItem } from '@chakra-ui/react';
import { PriceDto, ProductionDto } from '../../app/generate';
import { CSSProperties, Fragment } from 'react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import CommentPopup from '../../components/CommentPopup/CommentPopup';
import {
  GridInlineTbody,
  GridTd,
} from '../../components/GridTable/GridTableElements';
import { SPACE } from '../../theme/Constants';

type Props = {
  calculation: PriceDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

function EditCalculationGridRow({
  calculation,
  style = TD_STYLE,
  tableMenu,
}: Props) {
  return (
    <>
      <GridTd py={SPACE.XS} style={style}>
        <>{calculation.quantity}</>
      </GridTd>
      <GridTd py={SPACE.XS} style={style}>
        {calculation.quantity}
      </GridTd>
      <GridTd py={SPACE.XS} style={style}>
        {calculation.cost}
      </GridTd>
      <GridTd py={SPACE.XS} style={style}>
        {calculation.margin}
      </GridTd>
      <GridTd py={SPACE.XS} style={style}>
        {calculation.salesPrice}
      </GridTd>
      {/* <GridItem
        style={calculation.purchasePrices?.length === 0 ? style : undefined}
        colSpan={2}>
        <GridInlineTbody gridTemplateColumns={'repeat(2, 1fr)'}>
          {calculation.purchasePrices?.map(pp => (
            <Fragment key={pp.id}>
              <GridTd style={style}>{pp.quantity}</GridTd>
              <GridTd style={style}>{pp.price}</GridTd>
            </Fragment>
          ))}
        </GridInlineTbody>
      </GridItem> */}
    </>
  );
}

export default EditCalculationGridRow;
