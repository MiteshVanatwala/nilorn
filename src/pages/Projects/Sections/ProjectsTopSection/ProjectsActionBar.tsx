import { Button, MenuItem, MenuList } from '@chakra-ui/react';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { SIZES } from '../../../../theme/Constants';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../app/hooks/useModal';
import { useDeleteProject } from '../../../../app/api/Projects';
import AddProjectModal from '../../../ProductDevelopmentPage/Sections/SectionComponents/AddProjectModal';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  lastModified?: string;
  clientNo?: string;
  projectId?: string;
  setSelectedProjectCode: Dispatch<SetStateAction<string | undefined>>;
};

const ProjectsActionBar = ({ lastModified, clientNo, projectId, setSelectedProjectCode}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  const { mutate: deleteProject } = useDeleteProject();

  const onDelete = () => {
    deleteProject(projectId ?? '', {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <ActionBarTemplate
      isDisabled={!clientNo}
      lastModifiedDate={lastModified}
      moreMenuList={
        <MenuList>
          <MenuItem
            onClick={() => {
              handleModal(
                <AddProjectModal
                  clientNo={clientNo ?? ''}
                  setDefaultProject={(val: string) => {
                    setSelectedProjectCode(val)
                  }}
                />
              );
            }}
            icon={
              <RemixIcon
                component="Text"
                fontSize={SIZES.ICON.MD}
                icon="ADD_LINE"
              />
            }>
            {t('Common.Add')}
          </MenuItem>
          <MenuItem
            isDisabled={!projectId}
            onClick={() => {
              handleModal(
                <ConfirmModal
                  title={t('Projects.DeleteModal.Title')}
                  description={t('Projects.DeleteModal.Description')}
                  confirmType={'PRIMARY'}
                  onConfirm={onDelete}
                />
              );
            }}
            icon={
              <RemixIcon
                component="Text"
                fontSize={SIZES.ICON.MD}
                icon={'DELETE_BIN_LINE'}
              />
            }>
            {t('Common.Delete')}
          </MenuItem>
        </MenuList>
      }
      actionButtons={
        <Button
          isDisabled={!projectId}
          variant={'primary'}
          rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}
          type="submit">
          {t('Common.Save')}
        </Button>
      }
    />
  );
};

export default ProjectsActionBar;
