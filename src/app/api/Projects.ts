import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { ApiError, CreateProjectCommand, ProjectsService } from '../generate';
import { useToast } from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useGetProjects(clientNo: string, enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.Projects, clientNo],
    () => ProjectsService.getFilterOption().then(res => res),
    {
      retry: 1,
      enabled: enable,
    }
  );
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    (body: CreateProjectCommand) =>
      ProjectsService.postApiProjects(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: t('PD.ProjectCreated'),
        });
      },
      onError: async () => {
        showToast({
          status: 'error',
          title: t('Errors.ProjectCreate'),
        });
      },
    }
  );
};
