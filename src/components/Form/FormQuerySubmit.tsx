import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

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

  return (
    <FormProvider {...form}>
      <form style={style}>{children}</form>
    </FormProvider>
  );
}
