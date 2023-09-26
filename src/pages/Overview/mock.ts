export enum Status {
  NEW,
  WAITING,
  DONE,
}

export enum ProductType {
  BOX,
  LABEL,
}

export type OverviewItem = {
  id: string;
  image: string;
  name: string;
  number: Number;
  status: Status;
  artwork: string;
  client: string;
  type: ProductType;
  productGroup: string;
};

function getRandomEnumValue(enumType: any): any {
  const enumValues = Object.values(enumType);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

export function generateMockData(count: number): OverviewItem[] {
  const mockData: OverviewItem[] = [];

  for (let i = 0; i < count; i++) {
    const randomStatus: Status = getRandomEnumValue(Status);
    const randomProduct: ProductType = getRandomEnumValue(ProductType);

    const mockOverview: OverviewItem = {
      id: `pd-${i}`,
      image: `image${i}.jpg`,
      name: `PD Name ${i}`,
      number: i + 1,
      status: randomStatus,
      artwork: `artwork${i}.jpg`,
      client: `Client ${i}`,
      type: randomProduct,
      productGroup: `Product Group ${i}`,
    };

    mockData.push(mockOverview);
  }

  return mockData;
}
