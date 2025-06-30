import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProjectGeneralSection from './Sections/ProjectGeneralSection';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import { useCreateProjectPage } from '../../app/api/Projects';
import AttachmentInfoSection from '../Clients/Sections/AttachmentInfoSection';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';

function ProjectsPage() {
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>();
  const [selectedClientNo, setSelectedClientNo] = useState<string>();
  const { setUnsavedChanges } = useUnsavedChanges();

  const form = useForm();
  const { mutate: createProject } = useCreateProjectPage();

  const onSubmit = (fieldValues: FieldValues) => {
    createProject(
      {
        clientId: fieldValues.id,
        ...fieldValues,
      },
      {
        onSuccess: () => {
          setUnsavedChanges(false);
        },
      }
    );
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
            setSelectedProjectCode={setSelectedProjectCode}
            setSelectedClientNo={setSelectedClientNo}
          />

          <Accordion
            variant={'card'}
            defaultIndex={[0, 1, 2, 3, 4]}
            marginBottom={SPACE.XXL}
            allowMultiple>
            <ProjectGeneralSection
              disableEdit={!selectedClientNo || !selectedProjectCode}
            />
            <MemberSection
              disableEdit={!selectedClientNo || !selectedProjectCode}
              showAllMembers={true}
            />
            <AttachmentInfoSection
              disableEdit={!selectedClientNo || !selectedProjectCode}
              displayPlaecholder={!!selectedClientNo && !!selectedProjectCode}
            />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
}

export default ProjectsPage;
