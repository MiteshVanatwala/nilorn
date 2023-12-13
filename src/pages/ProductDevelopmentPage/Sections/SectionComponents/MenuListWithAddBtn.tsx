import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../../app/types/types';
import { MenuListProps } from 'chakra-react-select';
import { Box, Button } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import { COLORS, SPACE } from '../../../../theme/Constants';
import AddProjectModal from './AddProjectModal';

const MenuListWithAddBtn = ({
  children,
  setDefaultProject,
}: MenuListProps<SelectOption, boolean, any> & {
  setDefaultProject: (val: string) => void;
}) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();

  return (
    <Box bg={COLORS.GRAY[10]}>
      <Button
        ml={SPACE.XXS}
        mt={SPACE.XXS}
        variant={'secondarySmall'}
        onClick={() =>
          handleModal(<AddProjectModal setDefaultProject={setDefaultProject} />)
        }
        rightIcon={<i className={'ri-add-line'} />}>
        {t('Common.Add')}
      </Button>
      {children}
    </Box>
  );
};
export default MenuListWithAddBtn;
