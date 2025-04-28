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

const ClientsPage = () => {
  const [selectedClientNo, setSelectedClientNo] = useState<string>();

  const { data: clientOptions } = { data: [] }; // TODO: New endpoint - useClientsFilterOption();
  const { data: client } = { data: {} as ClientDto }; // TODO: New endpoint - useClient(selectedClientNo);

  const form = useForm<ClientDto>();
  const { reset } = form;

  useEffect(() => {
    if (!!client) {
      reset({ ...client });
    } else {
      reset({
        no: undefined,
        name: undefined,
        keyAccountManager: undefined,
        accountManager: undefined,
        targetMargin: undefined,
        // TODO: new fields to DTO
        // members: null,
        // clientRequirements: null,
      });
    }
  }, [client, reset, selectedClientNo]);

  const onSubmit = (fieldValues: FieldValues) => {
    console.log(fieldValues);
  };

  return (
    <ContentPage>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardPageTopSection
            selectedClientNo={selectedClientNo}
            setSelectedClientNo={setSelectedClientNo}
            clientOptions={clientOptions}
            actionBar={
              <ClientActionBar
                clientNo={client.no ?? undefined}
                // TODO: Date from loaded data
                lastModified={new Date()?.toISOString()}
              />
            }
          />
          <Accordion variant={'card'} marginBottom={SPACE.XXL} allowMultiple>
            <ClientGeneralSection disableEdit={client === undefined} />
            <MemberSection
              no={''} // Remove when merge with changes from project page
              // disableAdd={client === undefined}
              disableEdit={client === undefined}
            />
            <ClientSourcingSection disableEdit={client === undefined} />
          </Accordion>
        </form>
      </FormProvider>
    </ContentPage>
  );
};

export default ClientsPage;
