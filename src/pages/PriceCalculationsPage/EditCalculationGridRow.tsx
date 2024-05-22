import { ChangelogType, PriceDto } from '../../app/generate';
import { CSSProperties } from 'react';
import { TD_STYLE_CALCULATION } from '../../theme/Constants/tableGrid';
import { GridTd } from '../../components/GridTable/GridTableElements';
import { COLORS, SPACE } from '../../theme/Constants';
import ChangelogListItem from '../../components/Changelog/ChangelogListItem';
import { Box } from '@chakra-ui/react';
import { numToThousandSeparatedsStr, roundUp } from '../../app/utils/common';
import { useWatch } from 'react-hook-form';
import { useGetCurrency } from '../../app/api/currency';

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
  const currencyCode = useWatch({ name: 'currencyCode' });
  const { data: currencyData } = useGetCurrency(currencyCode);

  return (
    <>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {numToThousandSeparatedsStr(calculation.quantity)}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {numToThousandSeparatedsStr(calculation.purchasePrice)}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}>
        {numToThousandSeparatedsStr(
          roundUp(calculation.cost, currencyData?.costDecimals)
        )}
      </GridTd>
      <GridTd
        bg={`${index % 2 === 0 ? '' : COLORS.GRAY[10]}`}
        py={SPACE.XS}
        style={style}
        position={'relative'}>
        <>
          {numToThousandSeparatedsStr(
            roundUp(calculation.margin, currencyData?.marginDecimals)
          )}
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
        style={style}
        position={'relative'}>
        <>
          {numToThousandSeparatedsStr(
            roundUp(calculation.salesPrice, currencyData?.salesDecimals)
          )}
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
