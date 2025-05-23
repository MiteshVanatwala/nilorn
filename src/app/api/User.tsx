import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { MembersService } from '../generate';

export const useCurrentUser = () => {
  return useQuery(
    [QueryKeysEnum.User],
    () => MembersService.getApiMembersCurrent().then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      retry: 0,
    }
  );
};
