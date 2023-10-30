import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { onFilterChange, useDebounce } from '../Filter/FilterHelper';
import { useEffect } from 'react';

export default function FormuQuerySubmit({
  children,
  style,
  form,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
}): JSX.Element {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParamItems = Array.from(searchParams.keys());
    searchParamItems.forEach(name => {
      const value = searchParams.get(name);
      form.setValue(name, value);
    });
  }, []);

  useEffect(() => {
    form.watch(value => formChange());
  });

  function formChange() {
    setSearchParams(new URLSearchParams(onFilterChange(form.getValues())));
    form.clearErrors('serverError');
  }

  //Prepared for api call on filter change
  const debouncedSearchTerm = useDebounce<string>(window.location.href, 300);

  useEffect(() => {
    // console.log('debouncedSearchTerm', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <FormProvider {...form}>
      <form style={style} onChange={e => {}}>
        {children}
      </form>
    </FormProvider>
  );
}
