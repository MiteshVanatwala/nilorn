import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { SearchProfilesService, UpsertSearchProfileCommand } from '../generate';
import { useToast } from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useSearchProfile() {
  return useQuery(
    [QueryKeysEnum.SearchProfiles],
    () => SearchProfilesService.getApiSearchProfiles().then(res => res),
    {
      retry: 1,
    }
  );
}

export const useCreateOrUpdateSearchProfile = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showToast } = useToast();

  return useMutation(
    (body: UpsertSearchProfileCommand) =>
      SearchProfilesService.postApiSearchProfiles(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        showToast({
          status: 'success',
          description: t('Filter.SearchProfile.Feedback.Success.Save'),
        });
        queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
      },
      onError: async () => {
        showToast({
          status: 'error',
          description: t('Filter.SearchProfile.Feedback.Error.Save'),
        });
      },
    }
  );
};

export const useDeleteSearchProfile = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showToast } = useToast();

  return useMutation(
    (name: string) => {
      return SearchProfilesService.deleteApiSearchProfiles(name).then(
        response => response
      );
    },
    {
      onSuccess: async () => {
        showToast({
          status: 'success',
          description: t('Filter.SearchProfile.Feedback.Success.Delete'),
        });
        queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
      },
      onError: async () => {
        showToast({
          status: 'error',
          description: t('Filter.SearchProfile.Feedback.Error.Delete'),
        });
      },
    }
  );
};
