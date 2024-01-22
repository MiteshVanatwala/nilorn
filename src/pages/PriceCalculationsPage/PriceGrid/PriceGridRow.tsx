import { Box, Button, GridItem, VStack } from '@chakra-ui/react';
import {
  PriceCalculationDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';
import { CSSProperties, Fragment, useState } from 'react';
import { TD_STYLE } from '../../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTd,
} from '../../../components/GridTable/GridTableElements';
import { useTranslation } from 'react-i18next';
import { GRID_LAYOUT_PRICE } from '../PriceCalculationsTable';
import BaseValues from './BaseValues';
import { SPACE } from '../../../theme/Constants';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import SalesPriceCalculationForm from './SalesPriceCalculationForm';
import TableMenuCalculation from './TableMenuCalculation';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentBriefDto;
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

function PriceGridRow({
  production,
  style = TD_STYLE,
  productDevelopment,
  sourcedProduction,
}: Props) {
  // In phase one, only one calc!
  const calculation: PriceCalculationDto | undefined =
    production?.priceCalculations && production?.priceCalculations?.length > 0
      ? production?.priceCalculations[0]
      : undefined;
  const createNew = calculation === undefined;

  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      SalesPrice: calculation?.priceDtos,
    },
  });

  const [enableEdit, setEnableEdit] = useState<boolean>(false);

  const openRowForInlineEdit = () => {
    setEnableEdit(true);
  };

  const closeRowForInlineEdit = () => {
    setEnableEdit(false);
    form.reset();
  };

  const submitForm = (form: FieldValues) => {
    console.log('Submit Salce price form: ', form);
    setEnableEdit(false);
  };

  return (
    <GridItem colSpan={10}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <GridInlineTbody gridTemplateColumns={GRID_LAYOUT_PRICE}>
            <GridTd style={style}>
              <>
                <VStack alignItems={'start'} spacing={SPACE.XXS} pb={SPACE.XXS}>
                  <Box>
                    <>
                      {production.vendorName}
                      <TableMenuCalculation
                        sourcedProduction={sourcedProduction}
                        productDevelopment={productDevelopment}
                        onEditInline={openRowForInlineEdit}
                        createNew={
                          (production?.priceCalculations &&
                            production?.priceCalculations?.length <= 0) ??
                          true
                        }
                      />
                    </>
                  </Box>
                  {enableEdit && (
                    <>
                      <Button
                        type="submit"
                        variant={'primarySmall'}
                        rightIcon={<i className="ri-check-line" />}>
                        {t('Common.Save')}
                      </Button>
                      <Button
                        onClick={closeRowForInlineEdit}
                        variant={'secondarySmall'}
                        rightIcon={<i className="ri-close-line" />}>
                        {t('Common.Cancel')}
                      </Button>
                    </>
                  )}
                </VStack>
              </>
            </GridTd>
            <GridTd style={style}>{production.comment}</GridTd>
            {calculation && calculation?.priceDtos?.length ? (
              <>
                <GridTd style={style} gridColumn={'BaseValues'}>
                  <BaseValues calculation={calculation} />
                </GridTd>
                <GridItem colSpan={2}>
                  <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
                    {calculation.priceDtos?.map((pc, i) => (
                      <Fragment
                        key={calculation?.productionId + '-purchasePrice-' + i}>
                        <GridTd style={style}>{pc.quantity}</GridTd>
                        <GridTd style={style}>{pc.purchasePrice}</GridTd>
                      </Fragment>
                    ))}
                  </GridInlineTbody>
                </GridItem>
                <GridTd style={style}>{production.currencyCode}</GridTd>
                <GridTd style={style}>{calculation.currencyCode}</GridTd>
                <GridItem
                  colSpan={3}
                  onClick={createNew ? undefined : openRowForInlineEdit}>
                  <SalesPriceCalculationForm
                    enableEdit={enableEdit}
                    calculation={calculation}
                    style={style}
                  />
                </GridItem>
              </>
            ) : (
              <GridTd style={style} colSpan={8}></GridTd>
            )}
          </GridInlineTbody>
        </form>
      </FormProvider>
    </GridItem>
  );
}

export default PriceGridRow;
