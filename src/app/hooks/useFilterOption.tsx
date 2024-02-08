import {
  useClients,
  useFoldingType,
  useItemCategory,
  useOpCompOption,
  useProductGroup,
  useMembers,
  useVendors,
} from '../api/FilterInfo';
import { useGetProjectsOptions } from '../api/Projects';
import { ClientDto, MemberBriefDto, VendorDto } from '../generate';
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

const useFilterOptions = (name?: FilterKeys) => {
  const { data: clients } = useClients(name === 'clients' ?? false);
  const { data: projects } = useGetProjectsOptions(
    undefined,
    name === 'projects' ?? false
  );
  const { data: vendors } = useVendors(name === 'vendor');
  const { data: sourcingCompanies } = useOpCompOption(
    name === 'sourcingCompanies' ?? false,
    true
  );
  const { data: opComp } = useOpCompOption(name === 'opComp' ?? false);
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

  const { statuses } = useStatusOptions();

  if (!name) {
    return [];
  }

  const dataMap: Partial<Record<FilterKeys, SelectOption[]>> = {
    vendor: mapVendorsToOptions(vendors),
    members: mapMembersToOptions(members),
    clients: mapClientsToOptions(clients),
    statuses: statuses,
    sourcingCompanies: sourcingCompanies as SelectOption[],
    opComp: opComp as SelectOption[],
    foldingTypes: foldingTypes as SelectOption[],
    itemCategories: itemCategories as SelectOption[],
    productGroups: productGroups as SelectOption[],
    projects: projects as SelectOption[],
  };

  return dataMap[name] || [];
};

export default useFilterOptions;
