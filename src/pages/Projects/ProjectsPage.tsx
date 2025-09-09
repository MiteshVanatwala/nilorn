import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectGeneralSection from './Sections/ProjectGeneralSection';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import { useCreateProjectPage } from '../../app/api/Projects';
import AttachmentInfoSection from '../Clients/Sections/AttachmentInfoSection';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import { SESSION_STORAGE } from '../../app/utils/constant';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';

function ProjectsPage() {
  const navigate = useNavigate();
  const params = useParams<{ projectNo?: string; clientNo?: string }>();
  const [selectedProjectCode, setSelectedProjectCode] = useState<
    string | undefined
  >(params.projectNo);
  const [selectedClientNo, setSelectedClientNo] = useState<string | undefined>(
    params.clientNo
  );
  const { setUnsavedChanges, hasUnsavedChanges } = useUnsavedChanges();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isInitialLoad) {
      let newPath = '/projects';
      if (selectedClientNo) {
        newPath += `/${selectedClientNo}`;
        if (selectedProjectCode) {
          newPath += `/${selectedProjectCode}`;
        }
      }
      navigate(newPath, { replace: true });
    }
  }, [selectedClientNo, selectedProjectCode, isInitialLoad, navigate]);

  const form = useForm({
    defaultValues: {
      clientNo: selectedClientNo,
      code: selectedProjectCode,
      project: selectedProjectCode,
      projectCode: '',
      members: [],
      description: '',
      teamsName: '',
      channelName: '',
      artWorkFolderName: '',
      attachmentFolderName: '',
    },
    mode: 'onBlur',
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

    if (isInitialLoad) {
      sessionStorage.setItem(SESSION_STORAGE.IS_DIRTY, 'false');
      setUnsavedChanges(false);
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
        if (form.formState.isDirty) {
          const currentValues = form.getValues();
          form.reset(
            {
              ...currentValues,
              clientNo: selectedClientNo,
              code: selectedProjectCode,
              project: selectedProjectCode,
            },
            {
              keepDirty: false,
              keepTouched: false,
              keepIsValid: true,
              keepErrors: true,
            }
          );
        }
        // setTimeout(() => {
        //   sessionStorage.setItem(SESSION_STORAGE.IS_DIRTY, 'false');
        // }, 500);
      }, 200);
    } else {
      setIsInitialLoad(false);
    }
  }, [selectedClientNo, selectedProjectCode, form]);

  if (!hasProjectCardAccess) return <PermissionDenied />;

  return (
    <ContentPage>
      {form.formState.isDirty ? <LeavePageBlocker /> : <Fragment />}
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
