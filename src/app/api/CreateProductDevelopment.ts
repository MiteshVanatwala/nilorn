import { useMutation } from 'react-query';
import {
  CreateProductDevelopmentCommand,
  ProductDevelopmentsService,
} from '../generate';

export const useCreateProductDevelopment = () => {
  return useMutation(
    (body: CreateProductDevelopmentCommand) =>
      ProductDevelopmentsService.postApiProductDevelopments(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        // queryClient.invalidateQueries([QueryKeysEnum.SearchProfiles]);
        console.log('success');
      },
    }
  );
};
