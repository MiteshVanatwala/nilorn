import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { SearchProfilesService } from '../generate';

export function useSearchProfile() {
  return useQuery(
    [QueryKeysEnum.SearchProfiles],
    () => SearchProfilesService.getApiSearchProfiles().then(res => res),
    {
      retry: 1,
    }
  );
}

export function useUpdateSearchProfile() {
  const queryClient = useQueryClient();

  return useMutation(
    (body: any) =>
      SearchProfilesService.postApiSearchProfiles(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
      },
    }
  );
}
