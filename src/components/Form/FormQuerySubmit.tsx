import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { onFilterChange } from '../Filter/FilterHelper';
import { useEffect } from 'react';

export default function FormuQuerySubmit({
  children,
  style,
  form,
  pageNumber,
  pageSize,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
  pageNumber: number;
  pageSize: number;
}): JSX.Element {
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParamItems = Array.from(searchParams.keys());

    searchParamItems.forEach(name => {
      const value = searchParams.get(name);
      const decodedValue = decodeURIComponent(value ?? '');

      if (form.getValues(name) !== decodedValue) {
        form.setValue(name, decodedValue);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unregister = form.watch(() => {
      formChange();
    });

    return () => unregister.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  useEffect(() => {
    if (form.getValues('pageSize') !== pageSize && pageSize !== 0) {
      form.setValue('pageSize', pageSize);
    }
  }, [form, pageSize]);
  useEffect(() => {
    if (form.getValues('pageNumber') !== pageNumber && pageNumber !== 0) {
      form.setValue('pageNumber', pageNumber);
    }
  }, [form, pageNumber]);

  const formChange = () => {
    let filterChangeUrl = onFilterChange(form.getValues());
    if (
      window.location.search !== filterChangeUrl &&
      window.location.search !== `?` + filterChangeUrl
    ) {
      window.history.replaceState({}, '', `?${filterChangeUrl}`);
    }
    form.clearErrors('serverError');
  };

  return (
    <FormProvider {...form}>
      <form style={style}>{children}</form>
    </FormProvider>
  );
}
