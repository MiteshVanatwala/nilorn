import { useQuery } from 'react-query';
import { CertificateService } from '../generate';
import QueryKeysEnum from './queryKeys';

export const useCertificateCodes = () => {
  return useQuery(
    [QueryKeysEnum.Certificate],
    () => CertificateService.getApiCertificate().then(res => res),
    {
      retry: 0,
    }
  );
};

export const useCertificateClasses = (certificateCode: string) => {
  return useQuery(
    [QueryKeysEnum.CertificateClasses, certificateCode],
    () =>
      CertificateService.getApiCertificateClasses(certificateCode).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};

export const useCertificateCategories = (certificateCode: string) => {
  return useQuery(
    [QueryKeysEnum.CertificateCategories, certificateCode],
    () =>
      CertificateService.getApiCertificateCategories(certificateCode).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};
