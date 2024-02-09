import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { getSortValue, onFilterChange } from '../Filter/FilterHelper';
import { useEffect } from 'react';
import { usePaginationContext } from '../../app/context/PaginationProvider';

export default function FormuQuerySubmit({
  children,
  style,
  form,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
}): JSX.Element {
  let [searchParams] = useSearchParams();

  const { sortState } = usePaginationContext();

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
    if (sortState[0]?.id) {
      form.setValue('sortKey', getSortValue(sortState[0]));
    }
  }, [form, sortState]);

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
