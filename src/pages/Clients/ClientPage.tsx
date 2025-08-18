import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ClientDto } from '../../app/generate';
import CardPageTopSection from '../Templates/CardPageTopSection';
import ClientActionBar from './Sections/TopSection/ClientActionBar';
import ClientGeneralSection from './Sections/ClientGeneralSection';
import ClientSourcingSection from './Sections/ClientSourcingSection';
import AttachmentInfoSection from './Sections/AttachmentInfoSection';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useCreateClientPage } from '../../app/api/Clients';
import { useClient } from '../../app/api/FilterInfo';
import { SESSION_STORAGE } from '../../app/utils/constant';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';

const ClientsPage = () => {
  const saveClientName = sessionStorage.getItem(SESSION_STORAGE.CLIENT_PAGE);
  const [selectedClientNo, setSelectedClientNo] = useState<string>(
    saveClientName != 'undefined' && saveClientName != undefined
      ? saveClientName
      : ''
  );
  const { setUnsavedChanges } = useUnsavedChanges();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const form = useForm<ClientDto>({
    defaultValues: {
      requirement: '',
    },
  });
  const { mutate: createClient } = useCreateClientPage();
  const { data: client } = useClient(selectedClientNo ?? '');
  const hasClientCardAccess = useAuthorizedSee('client-card');

  const onSubmit = (fieldValues: FieldValues) => {
    createClient(fieldValues, {
      onSuccess: () => {
        form.reset(fieldValues);
        setUnsavedChanges(false);
      },
    });
  };

  useEffect(() => {
    if (!isInitialLoad) {
      setUnsavedChanges(form.formState.isDirty);
    }
  }, [form.formState.isDirty, isInitialLoad, setUnsavedChanges]);

  useEffect(() => {
    if (selectedClientNo) {
      // First, reset the form with basic data
      form.reset({ ...client, no: selectedClientNo });

      // Then handle the requirement field separately
      if (client?.requirement !== undefined) {
        form.setValue('requirement', client.requirement);
      }

      // After setting all values, mark the form as pristine
      form.clearErrors();
      setTimeout(() => {
        setIsInitialLoad(false);
        form.formState.isDirty && form.reset(form.getValues());
      }, 200);
    } else {
      form.reset();
      setIsInitialLoad(false);
    }
  }, [selectedClientNo, form, client]);

  if (!hasClientCardAccess) return <PermissionDenied />;

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
          <CardPageTopSection
            selectedClientNo={selectedClientNo}
            setSelectedClientNo={setSelectedClientNo}
            actionBar={<ClientActionBar />}
          />
          <Accordion
            variant={'card'}
            defaultIndex={[0, 1, 2, 3, 4]}
            marginBottom={SPACE.XXL}
            allowMultiple>
            <ClientGeneralSection disableEdit={true} />
            <MemberSection
              no={''}
              disableEdit={!selectedClientNo}
              showAllMembers
            />
            <ClientSourcingSection
              disableEdit={!selectedClientNo}
              client={{}}
            />
            <AttachmentInfoSection
              disableEdit={!selectedClientNo}
              displayPlaecholder={!!selectedClientNo}
            />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
};

export default ClientsPage;
