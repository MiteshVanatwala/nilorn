import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getSortValue,
  onFilterChange,
  useDebounce,
} from '../Filter/FilterHelper';
import { useEffect } from 'react';
import { usePaginationContext } from '../../app/context/PaginationProvider';

export const SORT: string = 'sort';

export default function FormuQuerySubmit({
  children,
  style,
  form,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
}): JSX.Element {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { sortState } = usePaginationContext();

  useEffect(() => {
    if (sortState[0]) {
      form.setValue(SORT, getSortValue(sortState[0]));
    } else {
      form.unregister(SORT);
    }
  }, [form, sortState]);

  useEffect(() => {
    const searchParamItems = Array.from(searchParams.keys());
    searchParamItems.forEach(name => {
      const value = searchParams.get(name);
      const decodedValue = decodeURIComponent(value ?? '');
      form.setValue(name, decodedValue);
    });
    form.watch(value => formChange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formChange() {
    navigate(`?` + onFilterChange(form.getValues()));
    form.clearErrors('serverError');
  }

  //Prepared for api call on filter change
  const debouncedSearchTerm = useDebounce<string>(window.location.href, 300);

  useEffect(() => {
    // console.log('debouncedSearchTerm', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <FormProvider {...form}>
      <form style={style}>{children}</form>
    </FormProvider>
  );
}
