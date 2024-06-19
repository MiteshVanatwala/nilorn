import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getSortValue,
  onFilterChange,
  parseSearchParams,
} from '../../app/utils/FilterHelper';
import { useCallback, useEffect } from 'react';
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
  const navigate = useNavigate();
  const { sortState } = usePaginationContext();
  const { watch, getValues, clearErrors } = form;

  useEffect(() => {
    const filters = parseSearchParams(location.search ?? '');
    form.reset();
    for (const name in filters) {
      const value = filters[name];
      form.setValue(name, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formChange = useCallback(() => {
    let filterChangeUrl = onFilterChange(getValues());
    const search = location.search;
    if (search !== filterChangeUrl && search !== `?` + filterChangeUrl) {
      navigate(`${location.pathname}?${filterChangeUrl}`, { replace: true });
    }
    clearErrors('serverError');
  }, [location, getValues, navigate, clearErrors]);

  useEffect(() => {
    const unregister = watch(() => {
      formChange();
    });

    return () => unregister.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    if (sortState[0]?.id) {
      form.setValue('sortKey', getSortValue(sortState[0]));
    }
  }, [form, sortState]);

  return (
    <FormProvider {...form}>
      <form style={style}>{children}</form>
    </FormProvider>
  );
}
