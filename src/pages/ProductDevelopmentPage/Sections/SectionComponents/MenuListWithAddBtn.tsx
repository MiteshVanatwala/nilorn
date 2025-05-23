import { Box, Button } from '@chakra-ui/react';
import { MenuListProps } from 'chakra-react-select';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../app/hooks/useModal';
import { SelectOption } from '../../../../app/types/types';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { COLORS, SPACE } from '../../../../theme/Constants';
import AddProjectModal from './AddProjectModal';

const MenuListWithAddBtn = ({
  children,
  setDefaultProject,
  clientNo,
}: MenuListProps<SelectOption, boolean, any> & {
  setDefaultProject: (val: string) => void;
  clientNo: string;
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
          handleModal(
            <AddProjectModal
              clientNo={clientNo}
              setDefaultProject={setDefaultProject}
            />
          )
        }
        rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}>
        {t('Common.CreateNew')}
      </Button>
      {children}
    </Box>
  );
};
export default MenuListWithAddBtn;
