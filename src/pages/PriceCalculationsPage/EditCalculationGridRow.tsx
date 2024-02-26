import { ChangelogType, PriceDto } from '../../app/generate';
import { CSSProperties } from 'react';
import { TD_STYLE_CALCULATION } from '../../theme/Constants/tableGrid';
import { GridTd } from '../../components/GridTable/GridTableElements';
import { COLORS, SPACE } from '../../theme/Constants';
import ChangelogListItem from '../../components/Changelog/ChangelogListItem';
import { Box } from '@chakra-ui/react';

type Props = {
  calculation: PriceDto;
  style?: CSSProperties;
  index: number;
  showChanges: boolean;
};

function EditCalculationGridRow({
  calculation,
  style = TD_STYLE_CALCULATION,
  index,
  showChanges,
}: Props) {
  return (
    <>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        <>{calculation.purchasePrice}</>
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
        style={style}
        position={'relative'}>
        <>
          {calculation.margin}
          <Box position={'absolute'} right={SPACE.XS}>
            <ChangelogListItem
              showChanges={showChanges}
              type={ChangelogType.SALES_PRICE}
              propertyName="Margin"
              id={calculation.salesPriceId ?? ''}
            />
          </Box>
        </>
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
        style={style}
        position={'relative'}>
        <>
          {calculation.salesPrice}
          <Box position={'absolute'} right={SPACE.XS}>
            <ChangelogListItem
              showChanges={showChanges}
              type={ChangelogType.SALES_PRICE}
              propertyName="Price"
              id={calculation.salesPriceId ?? ''}
            />
          </Box>
        </>
      </GridTd>
    </>
  );
}

export default EditCalculationGridRow;
