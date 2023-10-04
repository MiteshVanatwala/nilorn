import { Button } from '@chakra-ui/react';
import { COLORS } from '../../../theme/Constants';

type Props = {
  children: string;
  onClick: () => void;
  width?: string;
  paddingX?: string;
  disabled?: boolean;
  active?: boolean;
};

const PaginationButton = ({
  children,
  onClick,
  disabled,
  width,
  paddingX,
  active,
}: Props) => {
  return (
    <Button
      height={'100%'}
      borderRadius={0}
      color={disabled ? COLORS.GRAY[30] : COLORS.WHITE}
      bgColor={active ? COLORS.GRAY[80] : 'transparent'}
      _hover={{
        bg: COLORS.GRAY[70],
      }}
      cursor={'pointer'}
      width={width}
      paddingX={paddingX}
      textAlign={'center'}
      onClick={onClick}
      pointerEvents={disabled ? 'none' : 'auto'}>
      {children}
    </Button>
  );
};

export default PaginationButton;
