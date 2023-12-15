import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { ProjectsService } from '../generate';

export function useGetProjects(clientNo: string) {
  return useQuery(
    [QueryKeysEnum.Projects, clientNo],
    () => ProjectsService.getFilterOption().then(res => res),
    {
      retry: 1,
    }
  );
}

// export const useCreateOrUpdateSearchProfile = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (body: UpsertSearchProfileCommand) =>
//       SearchProfilesService.postApiSearchProfiles(body).then(
//         response => response
//       ),
//     {
//       onSuccess: async () => {
//         queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
//       },
//     }
//   );
// };
