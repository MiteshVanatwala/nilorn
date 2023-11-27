import {} from '@chakra-ui/react';
import {
  FieldValues,
  FormProvider,
  FormState,
  UseFormReturn,
} from 'react-hook-form';
import { useToast } from '../../app/hooks/useToast';
import { useTranslation } from 'react-i18next';
export const apiUrl = 'https://umbrella-api-test.nilorn.com/api/';

export default function Form({
  children,
  style,
  form,
  postUrl,
  successMsg,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  form: UseFormReturn<FieldValues>;
  postUrl: string;
  successMsg?: string;
}): JSX.Element {
  const { formState } = form;
  const { showToast } = useToast();
  const { t } = useTranslation();

  async function onSubmit(formValues: FieldValues): Promise<void> {
    console.log('formv', formValues, postUrl);
    const resp = await fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
    });
    if (resp.ok) {
      showToast({
        status: 'success',
        title: `${t('Common.Success')}`,
        description: successMsg ?? '',
      });
    } else {
      const serverErrorMessage = await parseServerErrorMsg(resp);
      showToast({
        status: 'error',
        title: 'Server error',
        description: serverErrorMessage,
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => form.clearErrors('serverError')}
        style={style}>
        {children}
      </form>
    </FormProvider>
  );
}
async function parseServerErrorMsg(resp: Response) {
  let serverError = 'See log for more info';

  if (resp.headers.get('content-type')?.includes('application/json')) {
    const data = await resp.json();
    serverError = data.Message || serverError;
  } else {
    const text = await resp.text();

    if (text && text.length < 100) {
      serverError = text;
    }
  }

  return serverError;
}
