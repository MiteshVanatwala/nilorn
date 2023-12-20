import { useSearchParams } from 'react-router-dom';
import {
  useClients,
  useFoldingType,
  useItemCategory,
  useProductGroup,
  useSalesPersonPurchasers,
  useSourcingCompanies,
  useVendors,
} from '../api/FilterInfo';
import {
  ClientDto,
  SalespersonPurchaserBriefDto,
  SourcingCompanyDto,
  VendorDto,
} from '../generate';
import { FilterKeys, SelectOption } from '../types/types';
import { useStatusOptions } from './useStatus';

const mapClientsToOptions = (clients?: ClientDto[]) => {
  return (
    clients?.map(c => ({
      label: c.name,
      value: c.no,
    })) ?? []
  );
};

const mapVendorsToOptions = (vendors?: VendorDto[]) => {
  return (
    vendors?.map(v => ({
      label: v.name,
      value: v.no,
    })) ?? []
  );
};

const mapSourcingCompaniesToOptions = (
  sourcingCompanies?: SourcingCompanyDto[]
) => {
  return (
    sourcingCompanies?.map(sc => ({
      label: sc.name,
      value: sc.name,
    })) ?? []
  );
};

const mapSalesPersonPurchasersToOptions = (
  salesPersonPurchasers?: SalespersonPurchaserBriefDto[]
) => {
  return (
    salesPersonPurchasers?.map(spp => ({
      label: spp.name,
      value: spp.code,
    })) ?? []
  );
};

const useFilterOptions = (name?: FilterKeys) => {
  let [searchParams] = useSearchParams();

  const { data: clients } = useClients(name === 'clients' ?? false);
  const { data: vendors } = useVendors(name === 'vendor');
  const { data: sourcingCompanies } = useSourcingCompanies(
    name === 'sourcingCompanies' ?? false
  );
  const { data: salesPersonPurchasers } = useSalesPersonPurchasers(
    name === 'salespersonPurchaser' ?? false
  );
  const { data: foldingTypes } = useFoldingType(
    name === 'foldingTypes' ?? false
  );
  const { data: itemCategories } = useItemCategory(
    name === 'itemCategories' ?? false
  );
  const { data: productGroups } = useProductGroup(
    name === 'productGroups' ?? false
  );
  const includeClosed = searchParams.get('includeClosed') ? true : false;

  const { statuses } = useStatusOptions(includeClosed);

  if (!name) {
    return [];
  }

  const dataMap: Partial<Record<FilterKeys, SelectOption[]>> = {
    vendor: mapVendorsToOptions(vendors),
    sourcingCompanies: mapSourcingCompaniesToOptions(sourcingCompanies),
    salespersonPurchaser: mapSalesPersonPurchasersToOptions(
      salesPersonPurchasers
    ),
    clients: mapClientsToOptions(clients),
    statuses: statuses,
    foldingTypes: foldingTypes as SelectOption[],
    itemCategories: itemCategories as SelectOption[],
    productGroups: productGroups as SelectOption[],
  };

  return dataMap[name] || [];
};

export default useFilterOptions;
