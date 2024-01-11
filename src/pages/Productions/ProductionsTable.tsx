import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import React from 'react';
import TabelMenu from './TableMenu';
import { ProductDevelopmentProductionDto } from '../../app/generate';

type Props = {
  productions: ProductDevelopmentProductionDto[];
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
            {production?.sourcedProductions?.map(
              (sourcedProductions, sourcingIndex) => (
                <React.Fragment key={`${productionIndex}-${sourcingIndex}`}>
                  {sourcedProductions?.productions?.map(
                    (vendor, vendorIndex) => {
                      const bgColor =
                        sourcingIndex % 2 !== 0
                          ? COLORS.GRAY[10]
                          : COLORS.WHITE;
                      return (
                        <React.Fragment
                          key={`${productionIndex}-${sourcingIndex}-${vendorIndex}`}>
                          <Tr
                            bgColor={bgColor}
                            verticalAlign={
                              sourcingIndex === 1 ? 'baseline' : 'center'
                            }
                            key={`${production?.productDevelopmentBriefDto?.no}-${sourcingIndex}-${vendorIndex}`}>
                            <h2>{sourcingIndex}</h2>
                            {sourcingIndex === 0 && vendorIndex === 0 && (
                              <>
                                <Td
                                  rowSpan={production?.sourcedProductions?.reduce(
                                    (sum, s) =>
                                      sum +
                                      (s?.productions
                                        ? s?.productions?.length
                                        : 1) *
                                        (vendor?.purchasePrices
                                          ? vendor?.purchasePrices?.length
                                          : 1),
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
                                        : 1) *
                                        (vendor?.purchasePrices
                                          ? vendor?.purchasePrices?.length
                                          : 1),
                                    0
                                  )}>
                                  {
                                    production.productDevelopmentBriefDto
                                      ?.client
                                  }
                                </Td>
                              </>
                            )}
                            {vendorIndex === 0 && (
                              <>
                                <Td
                                  rowSpan={
                                    (sourcedProductions?.productions
                                      ? sourcedProductions?.productions.length
                                      : 1) *
                                    (vendor?.purchasePrices
                                      ? vendor?.purchasePrices?.length
                                      : 1)
                                  }>
                                  {sourcedProductions.name}
                                  <TabelMenu />
                                </Td>
                              </>
                            )}
                            {vendor?.purchasePrices?.map((qty, qtyIndex) => (
                              <>
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
                              </>
                            ))}
                          </Tr>
                        </React.Fragment>
                      );
                    }
                  )}
                </React.Fragment>
              )
            )}
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductionsTable;
