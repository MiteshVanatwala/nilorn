import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { MembersService } from '../generate';

export const useCurrentUser = () => {
  return useQuery(
    [QueryKeysEnum.User],
    () => MembersService.getApiMembersCurrent().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: 0,
    }
  );
};
