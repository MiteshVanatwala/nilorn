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
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';

function ProjectsPage() {
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>();
  const [selectedClientNo, setSelectedClientNo] = useState<string>();
  const { setUnsavedChanges } = useUnsavedChanges();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const form = useForm({
    defaultValues: {
      clientNo: '',
      code: '',
      project: '',
      projectCode: '',
      members: [],
      description: '',
      teamsName: '',
      channelName: '',
      artWorkFolderName: '',
      attachmentFolderName: '',
    },
    mode: 'onChange',
  });
  const { mutate: createProject } = useCreateProjectPage();
  const hasProjectCardAccess = useAuthorizedSee('project-card');

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
    if (!isInitialLoad) {
      const formValues = form.getValues();
      const hasRequiredFields = selectedClientNo && selectedProjectCode;
      const hasFormValues = Object.values(formValues).some(value =>
        Array.isArray(value) ? value.length > 0 : Boolean(value)
      );

      if (!hasRequiredFields && !hasFormValues) {
        setUnsavedChanges(false);
        return;
      }

      if (
        form.formState.isDirty &&
        form.formState?.dirtyFields?.clientNo &&
        Object.keys(form.formState.dirtyFields).length === 1
      ) {
        setUnsavedChanges(false);
      } else if (
        form.formState.isDirty &&
        form.formState?.dirtyFields?.clientNo &&
        !form.formState?.dirtyFields?.projectCode &&
        !form.formState?.dirtyFields?.code &&
        Object.keys(form.formState.dirtyFields).length === 1
      ) {
        setUnsavedChanges(false);
      } else {
        setUnsavedChanges(form.formState.isDirty);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.formState.isDirty,
    form.formState.dirtyFields,
    isInitialLoad,
    selectedClientNo,
    selectedProjectCode,
  ]);

  useEffect(() => {
    if (selectedClientNo) {
      setTimeout(() => {
        setIsInitialLoad(false);
        form.formState.isDirty && form.reset(form.getValues());
      }, 200);
    } else {
      setIsInitialLoad(false);
    }
  }, [selectedClientNo, selectedProjectCode, form]);

  if (!hasProjectCardAccess) return <PermissionDenied />;

  return (
    <ContentPage>
      <LeavePageBlocker />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={e => {
            if (
              e.key === 'Enter' &&
              (e.target as HTMLElement).tagName === 'INPUT'
            ) {
              e.preventDefault();
            }
          }}>
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
              displayPlaecholder={!!selectedClientNo && !!selectedProjectCode}
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
