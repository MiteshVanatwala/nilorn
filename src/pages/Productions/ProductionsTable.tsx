import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import React from 'react';
import TabelMenu from './TableMenu';
import { ProductionQuery } from './ProductionsTableContainer';

type Props = {
  productions: ProductionQuery[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

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
            {production.sourcing.map((sourcing, sourcingIndex) => (
              <React.Fragment key={`${productionIndex}-${sourcingIndex}`}>
                {sourcing.productions.map((vendor, vendorIndex) => {
                  const bgColor =
                    sourcingIndex % 2 !== 0 ? COLORS.GRAY[10] : COLORS.WHITE;
                  return (
                    <React.Fragment
                      key={`${productionIndex}-${sourcingIndex}-${vendorIndex}`}>
                      {vendor.qtyPur.map((qty, qtyIndex) => (
                        <Tr
                          bgColor={bgColor}
                          verticalAlign={qtyIndex === 1 ? 'baseline' : 'center'}
                          key={`${production.productDevelopment.no}-${sourcingIndex}-${vendorIndex}-${qtyIndex}`}>
                          {sourcingIndex === 0 &&
                            vendorIndex === 0 &&
                            qtyIndex === 0 && (
                              <>
                                <Td
                                  rowSpan={production.sourcing.reduce(
                                    (sum, s) =>
                                      sum +
                                      s.productions.length *
                                        vendor.qtyPur.length,
                                    0
                                  )}>
                                  <PDCell {...production.productDevelopment} />
                                </Td>
                                <Td
                                  rowSpan={production.sourcing.reduce(
                                    (sum, s) =>
                                      sum +
                                      s.productions.length *
                                        vendor.qtyPur.length,
                                    0
                                  )}>
                                  {production.productDevelopment.client}
                                </Td>
                              </>
                            )}
                          {vendorIndex === 0 && qtyIndex === 0 && (
                            <>
                              <Td
                                rowSpan={
                                  sourcing.productions.length *
                                  vendor.qtyPur.length
                                }>
                                {sourcing.name} <TabelMenu />
                              </Td>
                            </>
                          )}
                          {qtyIndex === 0 && (
                            <>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.vendorName}
                              </Td>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.comment}
                              </Td>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.sl}
                              </Td>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.bl}
                              </Td>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.moq}
                              </Td>
                              <Td rowSpan={vendor.qtyPur.length}>
                                {vendor.sample}
                              </Td>
                            </>
                          )}
                          <Td>{qty.qty}</Td>
                          <Td>{qty.pur}</Td>
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
