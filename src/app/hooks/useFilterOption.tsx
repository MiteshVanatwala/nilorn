import {
  useClients,
  useFoldingType,
  useItemCategory,
  useOpCompOption,
  useProductGroup,
  useMembers,
  useVendors,
  useClientFilterOptions,
} from '../api/FilterInfo';
import { useGetProjectsOptions } from '../api/Projects';
import { useCertificateCodes } from '../api/production';
import { ClientDto, MemberBriefDto, VendorDto } from '../generate';
import { FilterKey, SelectOption } from '../types/types';
import { useStatusOptions } from './useStatus';

const mapClientsToOptions = (clients?: ClientDto[]) => {
  return (
    clients?.map(c => ({
      label: c.name,
      value: c.no,
    })) ?? []
  );
};

export const mapVendorsToOptions = (vendors?: VendorDto[], useId?: boolean) => {
  return (
    vendors?.map(v => ({
      label: v.name,
      value: useId ? v.id : v.no,
    })) ?? []
  );
};

const mapMembersToOptions = (members?: MemberBriefDto[]) => {
  return (
    members?.map(spp => ({
      label: spp.name,
      value: spp.code,
    })) ?? []
  );
};

const useFilterOptions = (name?: FilterKey, filterByAccess?: boolean, isProductDevelopment?: boolean, filterByUser?: boolean) => {
  const { data: clients } = useClientFilterOptions(
    name === 'clients',
    filterByAccess,
    filterByUser
  );
  const { data: projects } = useGetProjectsOptions(
    undefined,
    name === 'projects',
    filterByUser
  );
  const { data: vendors } = useVendors(name === 'vendors');
  const { data: sourcingCompanies } = useOpCompOption(
    name === 'sourcingCompanies' ?? false,
    isProductDevelopment ?? false
  );
  const { data: opComp } = useOpCompOption(name === 'opComps' ?? false);
  const { data: members } = useMembers(name === 'members' ?? false);
  const { data: foldingTypes } = useFoldingType(
    name === 'foldingTypes' ?? false
  );
  const { data: itemCategories } = useItemCategory(
    name === 'itemCategories' ?? false
  );
  const { data: productGroups } = useProductGroup(
    name === 'productGroups' ?? false
  );
  const { data: certificates } = useCertificateCodes(
    name === 'certificates' ?? false
  );

  const { statuses } = useStatusOptions(true);

  if (!name) {
    return [];
  }

  const dataMap: Partial<Record<FilterKey, SelectOption[]>> = {
    vendors: mapVendorsToOptions(vendors),
    members: mapMembersToOptions(members),
    clients: clients as SelectOption[],
    statuses: statuses,
    sourcingCompanies: sourcingCompanies as SelectOption[],
    opComps: opComp as SelectOption[],
    foldingTypes: foldingTypes as SelectOption[],
    itemCategories: itemCategories as SelectOption[],
    productGroups: productGroups as SelectOption[],
    projects: projects as SelectOption[],
    certificates: certificates as SelectOption[],
  };

  return dataMap[name] || [];
};

export default useFilterOptions;
