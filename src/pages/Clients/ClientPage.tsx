import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ClientDto } from '../../app/generate';
import CardPageTopSection from '../Templates/CardPageTopSection';
import ClientActionBar from './Sections/TopSection/ClientActionBar';
import ClientGeneralSection from './Sections/ClientGeneralSection';
import ClientSourcingSection from './Sections/ClientSourcingSection';
import AttachmentInfoSection from './Sections/AttachmentInfoSection';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useCreateClientPage } from '../../app/api/Clients';
import { useClient } from '../../app/api/FilterInfo';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';

const ClientsPage = () => {
  const { clientNo } = useParams();
  const navigate = useNavigate();
  const [selectedClientNo, setSelectedClientNo] = useState<string>(
    clientNo || ''
  );
  const { setUnsavedChanges } = useUnsavedChanges();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const form = useForm<ClientDto>({
    defaultValues: {
      no: clientNo || '',
      requirement: '',
    },
  });

  useEffect(() => {
    setSelectedClientNo(clientNo || '');
    // Reset initial load state when clientNo changes
    if (clientNo) {
      setIsInitialLoad(true);
    }
  }, [clientNo]);

  // Initialize form with client number from URL
  useEffect(() => {
    if (clientNo && form) {
      form.setValue('no', clientNo, { shouldDirty: false });
    }
  }, [clientNo, form]);
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
        form.setValue('requirement', client.requirement, {
          shouldDirty: false,
        });
      }

      // After setting all values, mark the form as pristine
      form.clearErrors();
      setTimeout(() => {
        setIsInitialLoad(false);
        form.formState.isDirty && form.reset(form.getValues());
      }, 0);
    } else {
      form.reset();
      setIsInitialLoad(false);
    }
  }, [selectedClientNo, form, client]);

  if (!hasClientCardAccess) return <PermissionDenied />;

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
          <CardPageTopSection
            selectedClientNo={selectedClientNo}
            manageDirtyState={false}
            setSelectedClientNo={(
              clientNo: string | ((prev: string) => string)
            ) => {
              const newValue =
                typeof clientNo === 'function'
                  ? clientNo(selectedClientNo)
                  : clientNo;
              
              // Only navigate if the value actually changed
              if (newValue !== selectedClientNo) {
                setSelectedClientNo(newValue);
                if (newValue) {
                  navigate(`/clients/${newValue}`, { replace: true });
                } else {
                  navigate('/clients', { replace: true });
                }
              }
            }}
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
