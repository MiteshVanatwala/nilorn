import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { SearchProfilesService, UpsertSearchProfileCommand } from '../generate';

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

  return useMutation(
    (body: UpsertSearchProfileCommand) =>
      SearchProfilesService.postApiSearchProfiles(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
      },
    }
  );
};
