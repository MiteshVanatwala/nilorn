import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  getSortValue,
  onFilterChange,
  parseSearchParams,
} from '../../app/utils/FilterHelper';
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
  const location = useLocation();
  const { sortState } = usePaginationContext();

  useEffect(() => {
    const filters = parseSearchParams(location.search ?? '');
    form.reset();
    for (const name in filters) {
      const value = filters[name];
      form.setValue(name, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
