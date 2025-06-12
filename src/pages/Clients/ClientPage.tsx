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

const ClientsPage = () => {
  const [selectedClientNo, setSelectedClientNo] = useState<string>(
    sessionStorage.getItem(SESSION_STORAGE.CLIENT_PAGE) || ''
  );
  const { setUnsavedChanges } = useUnsavedChanges();
  const form = useForm<ClientDto>({
    defaultValues: {
      requirement: '',
    },
  });
  const { mutate: createClient } = useCreateClientPage();
  const { data: client } = useClient(selectedClientNo ?? '');

  const onSubmit = (fieldValues: FieldValues) => {
    createClient(fieldValues, {
      onSuccess: () => {
        setUnsavedChanges(false);
      },
    });
  };

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useEffect(() => {
    if (selectedClientNo) {
      form.reset({ ...client, no: selectedClientNo });
    } else {
      form.reset();
    }
  }, [selectedClientNo, form, client, form.reset]);

  return (
    <ContentPage>
      <LeavePageBlocker />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <AttachmentInfoSection disableEdit={!selectedClientNo} />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
};

export default ClientsPage;
