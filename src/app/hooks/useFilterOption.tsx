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

const mapStringToOptions = (strArr?: string[]) => {
  return (
    strArr?.map(a => ({
      label: a,
      value: a,
    })) ?? []
  );
};

const useFilterOptions = (name?: FilterKeys) => {
  const { data: clients } = useClients(name !== 'clients');
  const { data: vendors } = useVendors(name !== 'vendor');
  const { data: sourcingCompanies } = useSourcingCompanies(
    name !== 'sourcingCompanies'
  );
  const { data: salesPersonPurchasers } = useSalesPersonPurchasers(
    name !== 'salespersonPurchaser'
  );
  const { data: foldingTypes } = useFoldingType(name !== 'foldingTypes');
  const { data: itemCategories } = useItemCategory(name !== 'itemCategories');
  const { data: productGroups } = useProductGroup('', name !== 'productGroups');

  const { statuses } = useStatusOptions();

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
    foldingTypes: mapStringToOptions(foldingTypes),
    itemCategories: mapStringToOptions(itemCategories),
    productGroups: mapStringToOptions(productGroups),
  };

  return dataMap[name] || [];
};

export default useFilterOptions;
