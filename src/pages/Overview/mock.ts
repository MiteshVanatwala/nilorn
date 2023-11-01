import {
  ProductDevelopmentBriefDto,
  ProductDevelopmentStatus,
} from '../../generate';

export function generateMockData(count: number): ProductDevelopmentBriefDto[] {
  const mockData: ProductDevelopmentBriefDto[] = [];

  for (let i = 0; i < count; i++) {
    // const randomProduct: ProductType = getRandomEnumValue(ProductType);

    const mockOverview: ProductDevelopmentBriefDto = {
      // id: `pd-${i}`,
      // image: `image${i}.jpg`,
      name: `PD Name ${i}`,
      productDevelopmentNo: (i + 1).toString(),
      status: ProductDevelopmentStatus._0,
      image: `artwork${i}.jpg`,
      // client: `Client ${i}`,
      // type: randomProduct,
      // productGroup: `Product Group ${i}`,
    };

    mockData.push(mockOverview);
  }

  return mockData;
}
