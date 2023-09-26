import { Image, Skeleton } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { SPACE } from '../../theme/Constants';
import React from 'react';

interface Props {
  langTagLcid: string;
}

const Flag = ({ langTagLcid }: Props) => {
  const langCode = langTagLcid.split('-')[1].toLowerCase();

  const { data: flag, isSuccess } = useQuery(
    ['flag', langCode],
    () =>
      fetch(
        `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/${langCode}.svg`
      ),
    { staleTime: Infinity, cacheTime: Infinity }
  );

  return (
    <Skeleton w={'3rem'} h={'2rem'} mr={SPACE.XS} isLoaded={isSuccess}>
      <Image alt={langTagLcid} src={flag?.url} />
    </Skeleton>
  );
};

export default Flag;
