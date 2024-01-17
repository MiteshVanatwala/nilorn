import { GridItem } from '@chakra-ui/react';
import { ProductionDto } from '../../app/generate';
import { CSSProperties } from 'react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import { GridInlineTbody, GridTd } from '../GridTable/GridTableElements';

type Props = {
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

export const PRODUCTIONS_NUM_OF_FR = 8;

function ProductionGridRow({ production, style = TD_STYLE, tableMenu }: Props) {
  return (
    <>
      <GridTd style={style}>
        <>
          {production.vendorName}
          {tableMenu}
        </>
      </GridTd>
      <GridTd style={style}>{production.comment}</GridTd>
      <GridTd style={style}>{production.sampleLeadTime}</GridTd>
      <GridTd style={style}>{production.productionLeadTime}</GridTd>
      <GridTd style={style}>{production.moq}</GridTd>
      <GridTd style={style}>{production.currencyCode}</GridTd>
      <GridItem
        style={production.purchasePrices?.length === 0 ? style : undefined}
        colSpan={2}>
        {production.purchasePrices?.map(pp => (
          <GridInlineTbody numFr={2}>
            <GridTd style={style}>{pp.quantity}</GridTd>
            <GridTd style={style}>{pp.price}</GridTd>
          </GridInlineTbody>
        ))}
      </GridItem>
    </>
  );
}

export default ProductionGridRow;
