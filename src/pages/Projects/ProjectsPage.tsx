import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';
import { useEffect, useMemo, useState } from 'react';
import ProjectGeneralSection from './Sections/ProjectGeneralSection';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProjectsTopSection from './Sections/ProjectsTopSection/ProjectsTopSection';
import {
  useCreateProjectPage,
  useGetProjectCard,
} from '../../app/api/Projects';
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

  // const { data: projectCard } = useGetProjectCard(
  //   selectedClientNo ?? '',
  //   selectedProjectCode ?? ''
  // );

  const form = useForm();
  // const { reset } = form;
  const { mutate: createProject } = useCreateProjectPage();

  // useEffect(() => {
  //   console.log(projectCard);
  //   console.log(!!selectedClientNo);
  //   console.log(!!selectedProjectCode);
  //   console.log(!!projectCard);
  //   if (!!selectedClientNo && !!selectedProjectCode && !!projectCard) {
  //     reset({ ...projectCard });
  //   } else {
  //     reset();
  //   }
  // }, [projectCard]);

  const onSubmit = (fieldValues: FieldValues) => {
    createProject(
      {
        clientId: fieldValues.id,
        ...fieldValues,
      },
      {
        onSuccess: () => {},
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
            clientOptions={clientOptions}
          />

          <Accordion
            variant={'card'}
            defaultIndex={[0, 1, 2, 3, 4]}
            marginBottom={SPACE.XXL}
            allowMultiple>
            <ProjectGeneralSection />
            <MemberSection disableEdit={false} showAllMembers={true} />
            <AttachmentInfoSection disableEdit={false} />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
}

export default ProjectsPage;
