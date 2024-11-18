import { GridItem, HStack, VStack } from '@chakra-ui/react';
import { ProductionDto, PurchasePriceDto } from '../../app/generate';
import { CSSProperties, Fragment } from 'react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import { GridInlineTbody, GridTd } from '../GridTable/GridTableElements';
import CommentPopup from '../CommentPopup/CommentPopup';
import { SPACE } from '../../theme/Constants';
import { numToThousandSeparatedsStr } from '../../app/utils/common';

type Props = {
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

function ProductionGridRow({ production, style = TD_STYLE, tableMenu }: Props) {
  return (
    <>
      <GridTd style={style}>
        <HStack justify={'space-between'} w={'100%'}>
          <VStack align={'start'} gap={SPACE.XXS}>
            <>{production.vendorName}</>
          </VStack>
          <>{tableMenu}</>
        </HStack>
      </GridTd>
      <GridTd style={style}>
        <CommentPopup comment={production.comment} />
      </GridTd>
      <GridTd style={style}>
        {numToThousandSeparatedsStr(production.moq)}
      </GridTd>
      <GridTd style={style}>{production.currencyCode}</GridTd>
      <GridItem
        style={production.purchasePrices?.length === 0 ? style : undefined}
        colSpan={2}>
        <GridInlineTbody gridTemplateColumns={'repeat(2, 1fr)'}>
          {production.purchasePrices
            ?.sort(
              (a: PurchasePriceDto, b: PurchasePriceDto) =>
                (a.quantity || 0) - (b.quantity || 0)
            )
            .map(pp => (
              <Fragment key={pp.id}>
                <GridTd style={style}>
                  {numToThousandSeparatedsStr(pp.quantity)}
                </GridTd>
                <GridTd style={style}>
                  {numToThousandSeparatedsStr(pp.price)}
                </GridTd>
              </Fragment>
            ))}
        </GridInlineTbody>
      </GridItem>
    </>
  );
}

export default ProductionGridRow;
