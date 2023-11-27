import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../../app/generate';
import { useSearchParams } from 'react-router-dom';

export function useProductDevelopments(pageNumber: number, pageSize?: number) {
  return useQuery(
    [QueryKeysEnum.Overview, pageNumber, pageSize],
    () =>
      ProductDevelopmentsService.getApiProductDevelopments(
        pageNumber,
        pageSize
      ).then(res => res),
    {
      retry: 1,
      enabled: pageNumber > 0,
    }
  );
}

export function useProductDevelopmentsFilter(
  pageNumber?: number,
  pageSize?: number
) {
  const [searchParams] = useSearchParams();

  const sortKey = searchParams.get('sortKey') ?? undefined;

  const searchQuery = searchParams.get('searchQuery') ?? undefined;
  const number = searchParams.get('number') ?? undefined;
  const name = searchParams.get('name') ?? undefined;
  const description = searchParams.get('description') ?? undefined;
  const itemNo = searchParams.get('itemNo') ?? undefined;
  const statuses = searchParams.get('statusName') ?? undefined;
  const clients = searchParams.get('clientName') ?? undefined;
  const subClientName = searchParams.get('subClientName') ?? undefined;
  const itemCategoryCode = searchParams.get('itemCategoryCode') ?? undefined;
  const productGroupName = searchParams.get('productGroupName') ?? undefined;
  const foldingTypeName = searchParams.get('foldingTypeName') ?? undefined;
  const finishedLength = searchParams.get('finishedLength') ?? undefined;
  const finishedWidth = searchParams.get('finishedWidth') ?? undefined;
  const finishedHeight = searchParams.get('finishedHeight') ?? undefined;
  const sampleQuantity = searchParams.get('sampleQuantity') ?? undefined;

  return useQuery(
    [
      QueryKeysEnum.Overview,
      pageNumber,
      pageSize,
      sortKey,
      searchQuery,
      statuses,
      clients,
      itemCategories,
      productGroups,
      foldingTypes,
      finishedLengths,
      finishedWidths,
      finishedHeights,
      sampleQuantity,
    ],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsFilter(
        pageNumber,
        pageSize,
        sortKey,
        searchQuery
        // number,
        // name,
        // description,
        // itemNo,
        // statusName,
        // clientName,
        // subClientName,
        // itemCategoryCode,
        // productGroupName,
        // foldingTypeName
        // finishedLength,
        // finishedWidth,
        // finishedHeight
        // sampleQuantity
      ).then(res => res),
    {
      retry: 0,
    }
  );
}

export function useProductDevelopmentsTest() {
  return useQuery(
    [],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsTest().then(
        res => res
      ),
    {
      retry: 1,
    }
  );
}
