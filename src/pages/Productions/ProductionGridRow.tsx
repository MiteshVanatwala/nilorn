import { Grid, GridItem } from '@chakra-ui/react';
import { ProductionDto } from '../../app/generate';
import { CSSProperties } from 'react';
import { TD_STYLE } from './ProductionsTable';

type Props = {
  productions: ProductionDto[];
  style: CSSProperties;
  tableMenu: JSX.Element;
};

const PRODUCTIONS_NUM_OF_FR = 8;

function ProductionGridRow({
  productions,
  style = TD_STYLE,
  tableMenu,
}: Props) {
  return (
    <Grid
      gap={'1px'}
      gridTemplateColumns={'repeat(8, 1fr)'}
      alignItems={'stretch'}
      height={'100%'}>
      {productions?.map(production => (
        <>
          <GridItem style={style} overflow={'hidden'}>
            {production.vendorName}
            {tableMenu}
          </GridItem>
          <GridItem style={style}>{production.comment}</GridItem>
          <GridItem style={style}>{production.sampleLeadTime}</GridItem>
          <GridItem style={style}>{production.productionLeadTime}</GridItem>
          <GridItem style={style}>{production.moq}</GridItem>
          <GridItem style={style} overflow={'hidden'}>
            {production.currencyCode}
          </GridItem>
          <GridItem
            style={production.purchasePrices?.length === 0 ? style : undefined}
            colSpan={2}>
            {production.purchasePrices?.map(pp => (
              <Grid
                gap={'1px'}
                gridTemplateColumns={'repeat(2, 1fr)'}
                alignItems={'stretch'}
                height={'100%'}>
                <GridItem style={style}>{pp.quantity}</GridItem>
                <GridItem style={style}>{pp.price}</GridItem>
              </Grid>
            ))}
          </GridItem>
        </>
      ))}
    </Grid>
  );
}

export default ProductionGridRow;
