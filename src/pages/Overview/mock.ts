import { ProductDevelopmentBriefDto, Status } from '../../app/generate';

export function generateMockData(count: number): ProductDevelopmentBriefDto[] {
  const mockData: ProductDevelopmentBriefDto[] = [];

  for (let i = 0; i < count; i++) {
    // const randomProduct: ProductType = getRandomEnumValue(ProductType);

    const mockOverview: ProductDevelopmentBriefDto = {
      // id: `pd-${i}`,
      // image: `image${i}.jpg`,
      name: `PD Name ${i}`,
      number: (i + 1).toString(),
      status: Status._0.toString(),
      imageUrl: `artwork${i}.jpg`,
      // client: `Client ${i}`,
      // type: randomProduct,
      // productGroup: `Product Group ${i}`,
    };

    mockData.push(mockOverview);
  }

  return mockData;
}
