import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { CreateProjectCommand, ProjectsService } from '../generate';
import { useToast } from '../hooks/useToast';
import { useTranslation } from 'react-i18next';
import { ProjectPageDto } from '../generate/models/ProjectPageDto';

export function useGetProjectsOptions(
  clientNo?: string,
  enable: boolean = true,
  filterByUser: boolean = false
) {
  return useQuery(
    [QueryKeysEnum.Projects, clientNo],
    () => ProjectsService.getApiProjectsFilterOption(clientNo, filterByUser).then(res => res),
    {
      retry: 1,
      enabled: enable
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
          description: t('ManageData.Feedback.Success.ProjectCreated'),
        });
      },
      onError: async () => {
        showToast({
          status: 'error',
          title: t('ManageData.Feedback.Error.ProjectCreate'),
        });
      },
    }
  );
};

export function useGetProjectCard(clientNo: string, projectCode: string) {
  return useQuery(
    [QueryKeysEnum.Projects, clientNo, projectCode],
    () =>
      ProjectsService.getApiProjects1(clientNo, projectCode).then(res => res),
    {
      retry: 1,
      enabled: !!clientNo && !!projectCode,
    }
  );
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    (projectId: string) =>
      ProjectsService.deleteApiProjects(projectId).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: t('ManageData.Feedback.Success.ProjectDelete'),
        });
      },
      onError: async () => {
        showToast({
          status: 'error',
          title: t('ManageData.Feedback.Error.ProjectDelete'),
        });
      },
    }
  );
};

export const useCreateProjectPage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    (body: ProjectPageDto) =>
      ProjectsService.patchApiProjects(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: t('Projects.Messages.Success'),
        });
      },
      onError: async () => {
        showToast({
          status: 'error',
          title: t('Projects.Messages.Fail'),
        });
      },
    }
  );
};
