import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ClientService, ClientDto } from '../generate';
import { useToast } from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

export const useCreateClientPage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    (client: ClientDto) =>
      ClientService.patchApiClient(client.no || '', client).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: t('Client.Messages.Success'),
        });
      },
      onError: async () => {
        showToast({
          status: 'error',
          description: t('Client.Messages.Fail'),
        });
      },
    }
  );
};
