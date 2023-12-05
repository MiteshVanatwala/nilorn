import { useMutation } from 'react-query';
import { ProductDevelopmentsService } from '../generate';

export const useCreateProductDevelopment = () => {
  return useMutation(
    // TODO: Waiting for API
    (body: any) =>
      ProductDevelopmentsService.postApiProductDevelopments(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        console.log('success');
      },
    }
  );
};
