import { Skeleton } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import { BORDER_RADIUS, COLORS } from '../../theme/Constants';
import FormLabelComponent from './FormLabelComponent';

interface Props extends FormInputProps {
  label?: string;
  name: string;
}

const SelectSkeleton = ({ label, name }: Props) => {
  return (
    <>
      {label && <FormLabelComponent name={name} label={label} />}
      <Skeleton
        width={'100%'}
        height={'3.7rem'}
        bg={COLORS.ERROR}
        startColor={COLORS.GRAY[10]}
        endColor={COLORS.GRAY[30]}
        borderRadius={BORDER_RADIUS.XS}
      />
    </>
  );
};

export default SelectSkeleton;
