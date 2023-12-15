import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { CreateProjectCommand, ProjectsService } from '../generate';

export function useGetProjects(clientNo: string) {
  return useQuery(
    [QueryKeysEnum.Projects, clientNo],
    () => ProjectsService.getFilterOption().then(res => res),
    {
      retry: 1,
    }
  );
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: CreateProjectCommand) =>
      ProjectsService.postApiProjects(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
      },
    }
  );
};
