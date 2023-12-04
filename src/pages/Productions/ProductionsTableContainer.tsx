import {
  Grid,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import PDCell from './PDCell';

type Production = {
  no: string;
  client: string;
  sourcing: {
    name: string;
    ventors: {
      name: string;
      comment: string;
      sl: number;
      qty: number[];
    }[];
  }[];
};

const productions: Production[] = [
  {
    no: '001',
    client: 'ABC Corp',
    sourcing: [
      {
        name: 'Sourcing A',
        ventors: [
          {
            name: 'Vendor 1',
            comment: 'Good quality',
            sl: 1,
            qty: [100, 200, 150],
          },
          {
            name: 'Vendor 2',
            comment: 'On-time delivery',
            sl: 2,
            qty: [50, 120, 80],
          },
          {
            name: 'Vendor 2.2',
            comment: 'On-time delivery',
            sl: 22,
            qty: [50, 120, 80],
          },
        ],
      },
      {
        name: 'Sourcing B',
        ventors: [
          {
            name: 'Vendor 3',
            comment: 'Excellent service',
            sl: 3,
            qty: [80, 150, 200],
          },
        ],
      },
    ],
  },
  {
    no: '002',
    client: 'XYZ Ltd',
    sourcing: [
      {
        name: 'Sourcing C',
        ventors: [
          {
            name: 'Vendor 5',
            comment: 'Fast shipping',
            sl: 5,
            qty: [120, 180, 220],
          },
          {
            name: 'Vendor 6',
            comment: 'Flexible payment terms',
            sl: 6,
            qty: [40, 80, 120],
          },
        ],
      },
      {
        name: 'Sourcing D',
        ventors: [
          {
            name: 'Vendor 7',
            comment: 'Highly recommended',
            sl: 7,
            qty: [90, 130, 170],
          },
          {
            name: 'Vendor 8',
            comment: 'Quality control',
            sl: 8,
            qty: [60, 100, 140],
          },
        ],
      },
    ],
  },
  {
    no: '003',
    client: 'LMN Inc',
    sourcing: [
      {
        name: 'Sourcing E',
        ventors: [
          {
            name: 'Vendor 9',
            comment: 'Competitive pricing',
            sl: 9,
            qty: [200, 250, 300],
          },
          {
            name: 'Vendor 10',
            comment: 'Consistent performance',
            sl: 10,
            qty: [70, 110, 150],
          },
        ],
      },
      {
        name: 'Sourcing F',
        ventors: [
          {
            name: 'Vendor 11',
            comment: 'Great customer support',
            sl: 11,
            qty: [120, 160, 200],
          },
          {
            name: 'Vendor 12',
            comment: 'Environmentally friendly',
            sl: 12,
            qty: [80, 120, 160],
          },
        ],
      },
    ],
  },
  // Add more production data as needed
];
type FlattenedDataItem = {
  PD: string;
  Client: string;
  Sourcing: string;
  Vendor: string;
  Comment: string;
  SL: number;
  QTY: number[];
};

const flattenData = (productions: Production[]) => {
  const flattenedData: FlattenedDataItem[] = [];

  productions.forEach(production => {
    production.sourcing.forEach(sourcing => {
      sourcing.ventors.forEach(vendor => {
        flattenedData.push({
          PD: production.no,
          Client: production.client,
          Sourcing: sourcing.name,
          Vendor: vendor.name,
          Comment: vendor.comment,
          SL: vendor.sl,
          QTY: vendor.qty,
        });
      });
    });
  });

  return flattenedData;
};
const ProductionsTableContainer = () => {
  const flattenedData = flattenData(productions);

  const calculateRowspan = <K extends keyof FlattenedDataItem>(
    row: FlattenedDataItem,
    key: K
  ) => {
    return flattenedData.filter(s => s[key] === row[key]).length;
  };

  const showRow = <K extends keyof FlattenedDataItem>(
    row: FlattenedDataItem,
    key: K
  ) => {
    return flattenedData.filter(s => s[key] === row[key]).indexOf(row) === 0;
  };

  return (
    <>
      <Grid gridTemplateColumns={'2fr 1fr 1fr 1fr 2fr 1fr 1fr'} gap={'1px'}>
        <GridItem bgColor={COLORS.GRAY[60]}>PD</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>Client</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>Sourcing</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>Vendor</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>Comment</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>SL</GridItem>
        <GridItem bgColor={COLORS.GRAY[60]}>QTY</GridItem>
        {productions.map(p => (
          <>
            <GridItem>
              <PDCell no={p.no} />
            </GridItem>
            <GridItem>{p.client}</GridItem>
            <GridItem colSpan={5}>
              <Grid gridTemplateColumns={'1fr 1fr 2fr 1fr 1fr'} gap={'1px'}>
                {p.sourcing.map(s => (
                  <>
                    <GridItem colSpan={1} rowSpan={s.ventors.length}>
                      {s.name}
                    </GridItem>
                    {s.ventors.map(v => (
                      <>
                        <GridItem>{v.name}</GridItem>
                        <GridItem>{v.comment}</GridItem>
                        <GridItem>{v.sl}</GridItem>
                        <GridItem>
                          <VStack align={'left'}>
                            {v.qty.map(q => (
                              <Text>{q}</Text>
                            ))}
                          </VStack>
                        </GridItem>
                      </>
                    ))}
                  </>
                ))}
              </Grid>
            </GridItem>
          </>
        ))}
      </Grid>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>PD</Th>
              <Th>Client</Th>
              <Th>Sourcing</Th>
              <Th>Vendor</Th>
              <Th>Comment</Th>
              <Th>SL</Th>
              <Th>QTY</Th>
            </Tr>
          </Thead>
          {productions.map((production, productionIndex) => (
            <Tbody>
              {production.sourcing.map((sourcing, sourcingIndex) =>
                sourcing.ventors.map((vendor, vendorIndex) => {
                  const bgColor =
                    sourcingIndex % 2 !== 0 ? COLORS.GRAY[10] : COLORS.WHITE;
                  return (
                    <Tr
                      key={`${production.no}-${sourcingIndex}-${vendorIndex}`}>
                      {sourcingIndex === 0 && vendorIndex === 0 && (
                        <>
                          <Td
                            rowSpan={
                              production.sourcing.length *
                              sourcing.ventors.length
                            }>
                            <PDCell no={production.no} />
                          </Td>
                          <Td
                            rowSpan={
                              production.sourcing.length *
                              sourcing.ventors.length
                            }>
                            {production.client}
                          </Td>
                        </>
                      )}
                      {vendorIndex === 0 && (
                        <>
                          <Td rowSpan={sourcing.ventors.length} bg={bgColor}>
                            {sourcing.name}
                          </Td>
                        </>
                      )}
                      <Td bg={bgColor}>{vendor.name}</Td>
                      <Td bg={bgColor}>{vendor.comment}</Td>
                      <Td bg={bgColor}>{vendor.sl}</Td>
                      <Td bg={bgColor}>
                        <VStack>
                          {vendor.qty.map((qty, qtyIndex) => (
                            <Text
                              key={`${production.no}-${sourcingIndex}-${vendorIndex}-${qtyIndex}`}>
                              {qty}
                            </Text>
                          ))}
                        </VStack>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          ))}
        </Table>
      </TableContainer>

      <hr />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>PD</Th>
              <Th>Client</Th>
              <Th>Sourcing</Th>
              <Th>Vendor</Th>
              <Th>Comment</Th>
              <Th>SL</Th>
              <Th>QTY</Th>
            </Tr>
          </Thead>
          <Tbody>
            {flattenedData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {showRow(row, 'PD') && (
                  <>
                    <Td rowSpan={calculateRowspan(row, 'PD')}>
                      <PDCell no={row.PD} />
                    </Td>
                    <Td rowSpan={calculateRowspan(row, 'Client')}>
                      {row.Client}
                    </Td>
                  </>
                )}
                {showRow(row, 'Sourcing') && (
                  <Td rowSpan={calculateRowspan(row, 'Sourcing')}>
                    {row.Sourcing}
                  </Td>
                )}
                <Td>{row.Vendor}</Td>
                <Td>{row.Comment}</Td>
                <Td>{row.SL}</Td>
                <Td>
                  <VStack>
                    {row.QTY.map((qty, qtyIndex) => (
                      <Text key={`${row.PD}-${rowIndex}-${qtyIndex}`}>
                        {qty}
                      </Text>
                    ))}
                  </VStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductionsTableContainer;
