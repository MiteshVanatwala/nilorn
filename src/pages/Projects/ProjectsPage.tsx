import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';
import { useEffect, useMemo, useState } from 'react';
import ProjectGeneralSection from './Sections/ProjectGeneralSection';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import { useGetProjectCard } from '../../app/api/Projects';
import { useClients } from '../../app/api/FilterInfo';
import AttachmentInfoSection from '../Clients/Sections/AttachmentInfoSection';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';

function ProjectsPage() {
  const { data: clients } = useClients();
  const clientOptions = useMemo(() => {
    return clients?.map(client => {
      return { label: client.name, value: client.no };
    }) as SelectOption[];
  }, [clients]);

  const [selectedProjectCode, setSelectedProjectCode] = useState<string>();
  const [selectedClientNo, setSelectedClientNo] = useState<string>();
  const { setUnsavedChanges } = useUnsavedChanges();

  const { data: projectCard } = useGetProjectCard(
    selectedClientNo ?? '',
    selectedProjectCode ?? ''
  );

  const form = useForm();
  const { reset } = form;

  useEffect(() => {
    if (!!selectedClientNo && !!selectedProjectCode && !!projectCard) {
      reset({ ...projectCard });
    } else {
      reset();
    }
  }, [reset, projectCard, selectedClientNo, selectedProjectCode]);

  const onSubmit = (fieldValues: FieldValues) => {
    console.log(fieldValues);
  };

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  return (
    <ContentPage>
      <LeavePageBlocker />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ProjectsTopSection
            selectedProjectCode={selectedProjectCode}
            selectedClientNo={selectedClientNo}
            setSelectedProjectCode={setSelectedProjectCode}
            setSelectedClientNo={setSelectedClientNo}
            lastModified={new Date()}
            clientOptions={clientOptions}
          />

          <Accordion
            variant={'card'}
            defaultIndex={[0, 1, 2, 3, 4]}
            marginBottom={SPACE.XXL}
            allowMultiple>
            <ProjectGeneralSection />
            <MemberSection disableEdit={false} />
            <AttachmentInfoSection disableEdit={false} />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
}

export default ProjectsPage;
