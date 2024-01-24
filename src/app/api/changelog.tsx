import { useQuery } from 'react-query';
import { ChangelogService, ChangelogType } from '../generate';
import QueryKeysEnum from './queryKeys';

export const useChangelog = (
  productDevelopmentNo?: string,
  type?: ChangelogType,
  id?: string,
  enable: boolean = true
) => {
  return useQuery(
    [QueryKeysEnum.Changes],
    () =>
      ChangelogService.getApiChangelog(type, id, productDevelopmentNo).then(
        res => res
      ),
    {
      enabled: enable,
      retry: 0,
    }
  );
};
