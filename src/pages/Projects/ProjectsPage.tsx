import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import ProjectGeneralSection from './Sections/ProjectGeneralSection';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import { useCreateProjectPage, useGetProjectCard, useGetProjectsOptions } from '../../app/api/Projects';
import QueryKeysEnum from '../../app/api/queryKeys';
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
  const { setUnsavedChanges } = useUnsavedChanges();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const memberSectionRef = useRef<{ replaceMembers: (members: any[]) => void }>(null);

  useEffect(() => {
    if (!isInitialLoad) {
      let newPath = '/projects';
      if (selectedClientNo) {
        newPath += `/${selectedClientNo}`;
        if (selectedProjectCode) {
          newPath += `/${selectedProjectCode}`;
        }
      }
      
      // Only navigate if the path is different from current location
      const currentPath = window.location.pathname;
      if (currentPath !== newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [selectedClientNo, selectedProjectCode, isInitialLoad, navigate]);

  const form = useForm({
    defaultValues: {
      clientNo: params.clientNo || selectedClientNo,
      code: params.projectNo || selectedProjectCode,
      project: params.projectNo || selectedProjectCode,
      projectCode: params.projectNo || '',
      members: [] as any[],
      description: '',
      teamsName: '',
      channelName: '',
      artWorkFolderName: '',
      attachmentFolderName: '',
    },
    mode: 'onBlur',
  });
  const { mutate: createProject } = useCreateProjectPage();
  const queryClient = useQueryClient();
  const hasProjectCardAccess = useAuthorizedSee('project-card');

  // Fetch project data when both client and project are selected
  const { data: projectData } = useGetProjectCard(
    selectedClientNo || '', 
    selectedProjectCode || ''
  );

  // Fetch available projects for the selected client to validate project existence
  const { data: projectOptions } = useGetProjectsOptions(
    selectedClientNo,
    !!selectedClientNo
  );

  // Initialize form values from URL parameters on initial load
  useEffect(() => {
    if (params.clientNo && !selectedClientNo) {
      form.setValue('clientNo', params.clientNo, { shouldDirty: false });
    }
    if (params.projectNo && !selectedProjectCode) {
      // Check if the project still exists in session storage
      const storedProject = sessionStorage.getItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO);
      if (storedProject === '' || storedProject !== params.projectNo) {
        // Project was deleted or doesn't match, clear the URL
        setSelectedProjectCode(undefined);
        // navigate('/projects' + (params.clientNo ? `/${params.clientNo}` : ''), { replace: true });
      } else {
        // Only update form values if they're different
        if (form.getValues('projectCode') !== params.projectNo) {
          form.setValue('projectCode', params.projectNo, { shouldDirty: false });
          form.setValue('code', params.projectNo, { shouldDirty: false });
        }
      }
    }
  }, [params.clientNo, params.projectNo]);

  // Populate form with project data when it's fetched
  useEffect(() => {
    if (projectData && selectedClientNo && selectedProjectCode) {
      // Call the MemberSection's replace function if available
      if (memberSectionRef.current) {
        memberSectionRef.current.replaceMembers(projectData.members || []);
      }
      form.setValue('description', projectData.description || '', { shouldDirty: false });
    }
  }, [projectData, selectedClientNo, selectedProjectCode, form]);

  const onSubmit = (fieldValues: FieldValues) => {
    createProject(
      {
        clientId: fieldValues.id,
        ...fieldValues,
      },
      {
        onSuccess: async () => {
          setUnsavedChanges(false);
          
          // If a new project was created, navigate to it
          if ((fieldValues.code || fieldValues.projectCode) && fieldValues.clientNo) {
            const projectCode = fieldValues.code || fieldValues.projectCode;
            const clientNo = fieldValues.clientNo;
            
            try {
              // Wait a moment for the backend to process
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Fetch fresh project list to confirm the project exists
              await queryClient.invalidateQueries([QueryKeysEnum.Projects, clientNo]);
              const freshProjectOptions = await queryClient.fetchQuery([QueryKeysEnum.Projects, clientNo]) as any[];
              
              if (Array.isArray(freshProjectOptions)) {
                const projectExists = freshProjectOptions.some((option: any) => option.value === projectCode);
                
                if (projectExists) {
                  // Project confirmed to exist, update state and navigate
                  setSelectedProjectCode(projectCode);
                  setSelectedClientNo(clientNo);
                  sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO, projectCode);
                }
              }
            } catch (error) {
              console.error('Failed to navigate to new project:', error);
            }
          }
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
              // Preserve members and other data that might have been populated
              members: currentValues.members || [],
              description: currentValues.description || '',
              teamsName: currentValues.teamsName || '',
              channelName: currentValues.channelName || '',
              artWorkFolderName: currentValues.artWorkFolderName || '',
              attachmentFolderName: currentValues.attachmentFolderName || '',
            },
            {
              keepDirty: false,
              keepTouched: false,
              keepIsValid: false,
              keepErrors: false,
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
              ref={memberSectionRef}
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
