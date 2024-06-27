import ContentPage from '../Templates/ContentPage';
import { Text } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

function ProjectsPage() {
  const form = useForm();

  const onSubmit = (fieldValues: FieldValues) => {
    console.log(fieldValues);
  };

  return (
    <ContentPage>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Text>{'Projects'}</Text>
        </form>
      </FormProvider>
    </ContentPage>
  );
}

export default ProjectsPage;
