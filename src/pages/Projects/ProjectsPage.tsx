import ContentPage from '../Templates/ContentPage';
import { SelectOption } from '../../app/types/types';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import { useGetProjectCard } from '../../app/api/Projects';
import { useClients } from '../../app/api/FilterInfo';

function ProjectsPage() {
  const { data: clients } = useClients();
  const clientOptions = useMemo(() => {
    return clients?.map(client => {
      return { label: client.name, value: client.no };
    }) as SelectOption[];
  }, [clients]);

  const [selectedProject, setSelectedProject] = useState<SelectOption>();
  const [selectedClient, setSelectedClient] = useState<SelectOption>();

  const { data: projectCard } = useGetProjectCard(
    selectedClient?.value,
    selectedProject?.value
  );

  const form = useForm();
  const { reset } = form;

  useEffect(() => {
    if (!!selectedClient && !!selectedProject && !!projectCard) {
      reset({ ...projectCard });
    } else {
      reset();
    }
  }, [reset, projectCard, selectedClient, selectedProject]);

  const onSubmit = (fieldValues: FieldValues) => {
    console.log(fieldValues);
  };

  return (
    <ContentPage>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ProjectsTopSection
            selectedProject={selectedProject}
            selectedClient={selectedClient}
            setSelectedProject={setSelectedProject}
            setSelectedClient={setSelectedClient}
            lastModified={new Date()}
            clientOptions={clientOptions}
          />
        </form>
      </FormProvider>
    </ContentPage>
  );
}

export default ProjectsPage;
