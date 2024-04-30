import { FilterInput, FilterKeys } from '../types/types';
import { useEffect, useState } from 'react';

const allFilters: FilterInput[] = [
  { name: 'clients', type: 'select' },
  { name: 'projects', type: 'select' },
  { name: 'statuses', type: 'select' },
  { type: 'select', name: 'itemCategories' },
  { type: 'select', name: 'productGroups' },
  { type: 'select', name: 'foldingTypes' },
  { type: 'text', name: 'finishedLengths' },
  { type: 'text', name: 'finishedWidths' },
  { type: 'text', name: 'finishedHeights' },
  { type: 'select', name: 'vendor' },
  { type: 'select', name: 'opComp' },
  { type: 'select', name: 'sourcingCompanies' },
  { type: 'select', name: 'members' },
  { type: 'select', name: 'certificates' },
  { type: 'text', name: 'indirectCost' },
];

export const useFilterList = (
  standardFilterKeys: FilterKeys[]
): { standardFilters: FilterInput[]; advanceFilters: FilterInput[] } => {
  const [standardFilters, setStandardFilters] = useState<FilterInput[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<FilterInput[]>([]);

  useEffect(() => {
    const first = allFilters.filter(item =>
      standardFilterKeys.includes(item.name)
    );
    const second = allFilters.filter(
      item => !standardFilterKeys.includes(item.name)
    );

    setStandardFilters(first);
    setAdvanceFilters(second);
  }, [standardFilterKeys]);

  return { standardFilters, advanceFilters };
};
