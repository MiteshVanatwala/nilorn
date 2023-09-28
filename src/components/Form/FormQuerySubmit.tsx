import React, { useEffect } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function FormuQuerySubmit({
  children,
  style,
  form,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
}): JSX.Element {
  const { formState } = form;
  let [searchParams, setSearchParams] = useSearchParams();

  async function onSubmit(formValues: any): Promise<void> {
    type QueryParams = Record<string, string | undefined>;

    const filteredQueryParams: QueryParams = {
      search: formValues.search,
      filter: formValues.filter,
    };
    const queryParamString = Object.entries(filteredQueryParams)
      .filter(([_, value]) => value !== undefined)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const newSearchParams = new URLSearchParams(queryParamString);
    setSearchParams(newSearchParams);
  }

  return (
    <FormProvider {...form}>
      <form
        style={style}
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => form.clearErrors('serverError')}>
        {children}
      </form>
    </FormProvider>
  );
}
