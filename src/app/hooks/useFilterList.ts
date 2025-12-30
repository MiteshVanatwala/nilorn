import { FilterInput, FilterKey } from '../types/types';
import { useEffect, useState } from 'react';

export const allFilters: FilterInput[] = [
  { name: 'clients', type: 'select' },
  { name: 'projects', type: 'select' },
  { name: 'statuses', type: 'select' },
  { type: 'select', name: 'itemCategories' },
  { type: 'select', name: 'productGroups' },
  { type: 'select', name: 'foldingTypes' },
  { type: 'integer', name: 'finishedLengths' },
  { type: 'integer', name: 'finishedWidths' },
  { type: 'integer', name: 'finishedHeights' },
  { type: 'select', name: 'vendors' },
  { type: 'select', name: 'opComps' },
  { type: 'select', name: 'distributionCompanies' },
  { type: 'select', name: 'sourcingCompanies' },
  { type: 'select', name: 'members' },
  { type: 'select', name: 'certificates' },
  { type: 'decimal', name: 'indirectCosts' },
  { type: 'text', name: 'productDevelopments' },
];

export const useFilterList = (
  standardFilterKeys: FilterKey[]
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
