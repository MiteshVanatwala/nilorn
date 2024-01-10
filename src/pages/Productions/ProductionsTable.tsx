import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import React from 'react';
import TabelMenu from './TableMenu';
import { ProductDevelopmentProductionDto } from '../../app/generate';
import { ProductionQuery } from './ProductionsTableContainer';

type Props = {
  productions: ProductDevelopmentProductionDto[];
  productionsTwo: ProductionQuery[];
};

const ProductionsTable = ({ productions, productionsTwo }: Props) => {
  const { t } = useTranslation();
  console.log('s', productions);
  console.log('2', productionsTwo);

  return (
    <Table variant={'default'} size={'sm'}>
      <Thead position={'sticky'} top={0}>
        <Tr>
          <Th>{t('Production.ProductDevelopments')}</Th>
          <Th>{t('PD.Client')}</Th>
          <Th>{t('PD.SourcingCompany')}</Th>
          <Th>{t('PD.AccordionLabels.Vendor')}</Th>
          <Th>{t('Production.Comment')}</Th>
          <Th>{t('Production.SL')}</Th>
          <Th>{t('Production.BL')}</Th>
          <Th>{t('Production.MOQ')}</Th>
          <Th>{t('Production.Cur')}</Th>
          <Th>{t('Production.Qty')}</Th>
          <Th>{t('Production.PUR')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {productions.map((production, productionIndex) => (
          <React.Fragment key={productionIndex}>
            {production?.sourcedProductions?.map((sourcing, sourcingIndex) => (
              <React.Fragment key={`${productionIndex}-${sourcingIndex}`}>
                {sourcing?.productions?.map((vendor, vendorIndex) => {
                  const bgColor =
                    sourcingIndex % 2 !== 0 ? COLORS.GRAY[10] : COLORS.WHITE;
                  return (
                    <React.Fragment
                      key={`${productionIndex}-${sourcingIndex}-${vendorIndex}`}>
                      {vendor?.purchasePrices?.map((qty, qtyIndex) => (
                        <Tr
                          bgColor={bgColor}
                          verticalAlign={qtyIndex === 1 ? 'baseline' : 'center'}
                          key={`${production?.productDevelopmentBriefDto?.no}-${sourcingIndex}-${vendorIndex}-${qtyIndex}`}>
                          {sourcingIndex === 0 &&
                            vendorIndex === 0 &&
                            qtyIndex === 0 && (
                              <>
                                <Td
                                  rowSpan={production?.sourcedProductions?.reduce(
                                    (sum, s) =>
                                      sum +
                                      (s?.productions
                                        ? s?.productions?.length
                                        : 0) *
                                        (vendor?.purchasePrices
                                          ? vendor?.purchasePrices?.length
                                          : 0),
                                    0
                                  )}>
                                  <PDCell
                                    {...production.productDevelopmentBriefDto}
                                  />
                                </Td>
                                <Td
                                  rowSpan={production?.sourcedProductions?.reduce(
                                    (sum, s) =>
                                      sum +
                                      (s?.productions
                                        ? s?.productions?.length
                                        : 0) *
                                        (vendor?.purchasePrices
                                          ? vendor?.purchasePrices?.length
                                          : 0),
                                    0
                                  )}>
                                  {
                                    production.productDevelopmentBriefDto
                                      ?.client
                                  }
                                </Td>
                              </>
                            )}
                          {vendorIndex === 0 && qtyIndex === 0 && (
                            <>
                              <Td
                                rowSpan={
                                  (sourcing?.productions
                                    ? sourcing?.productions.length
                                    : 0) *
                                  (vendor?.purchasePrices
                                    ? vendor?.purchasePrices?.length
                                    : 0)
                                }>
                                {sourcing.name} <TabelMenu />
                              </Td>
                            </>
                          )}
                          {qtyIndex === 0 && (
                            <>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.vendorName}
                              </Td>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.comment}
                              </Td>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.sampleLeadTime}
                              </Td>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.productionLeadTime}
                              </Td>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.moq}
                              </Td>
                              <Td rowSpan={vendor.purchasePrices?.length}>
                                {vendor.sampleCharge}
                              </Td>
                            </>
                          )}
                          <Td>{qty.quantity}</Td>
                          <Td>{qty.price}</Td>
                        </Tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductionsTable;
