import ContentPage from '../Templates/ContentPage';
import { Accordion } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { SPACE } from '../../theme/Constants';
import MemberSection from '../ProductDevelopmentPage/Sections/MemberSection';
import { FieldValues, FormProvider, useForm, useWatch } from 'react-hook-form';
import { ClientDto } from '../../app/generate';
import CardPageTopSection from '../Templates/CardPageTopSection';
import ClientActionBar from './Sections/TopSection/ClientActionBar';
import ClientGeneralSection from './Sections/ClientGeneralSection';
import ClientSourcingSection from './Sections/ClientSourcingSection';
import AttachmentInfoSection from './Sections/AttachmentInfoSection';
import { useClient, useClients } from '../../app/api/FilterInfo';
import { SelectOption } from '../../app/types/types';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';

const ClientsPage = () => {
  const [selectedClientNo, setSelectedClientNo] = useState<string>();
  const { setUnsavedChanges } = useUnsavedChanges();
  const { data: clients } = useClients();
  const clientOptions = useMemo(() => {
    return clients?.map(client => {
      return { label: client.name, value: client.no };
    }) as SelectOption[];
  }, [clients]);

  const { data: client } = useClient(selectedClientNo ?? '');

  const form = useForm<ClientDto>({
    defaultValues: {
      requirement: '',
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (client) {
      reset({ ...client }); // Assuming you want to reset with the first client
    } else {
      reset();
    }
  }, [client, reset]);

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
          <CardPageTopSection
            selectedClientNo={selectedClientNo}
            setSelectedClientNo={setSelectedClientNo}
            clientOptions={clientOptions}
            actionBar={
              <ClientActionBar
                // clientNo={client?.no ?? undefined}
                // TODO: Date from loaded data
                lastModified={new Date()?.toISOString()}
              />
            }
          />
          <Accordion 
          variant={'card'} 
          defaultIndex={[0, 1, 2, 3, 4]}
          marginBottom={SPACE.XXL} 
          allowMultiple>
            <ClientGeneralSection disableEdit={true} />
            <MemberSection
              no={''} // Remove when merge with changes from project page
              // disableAdd={client === undefined}
              disableEdit={client === undefined}
            />
            <ClientSourcingSection
              disableEdit={client === undefined}
              client={client}
            />
            <AttachmentInfoSection disableEdit={client === undefined} />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
};

export default ClientsPage;
