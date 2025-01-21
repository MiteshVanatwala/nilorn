import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSortValue, onFilterChange } from '../../app/utils/FilterHelper';
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


  const formChange = useCallback(() => {
    let filterChangeUrl = onFilterChange(getValues());
    const search = window.location.search;
    if (search !== filterChangeUrl && search !== `?` + filterChangeUrl) {
      navigate(`${location.pathname}?${filterChangeUrl}`, { replace: true });
    }
    clearErrors('serverError');
  }, [getValues, navigate, clearErrors, location.pathname]);

  useEffect(() => {
    const unregister = watch(() => {
      formChange();
    });

    return () => unregister.unsubscribe();
  }, [watch, formChange]);

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
