import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../../components/Link/ArrowLink';
import { useFormContext } from 'react-hook-form';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import { useContext } from 'react';
import { ModalContext } from '../../../../app/context/ModalContext';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();
  const { formState } = useFormContext();
  const { handleModal, close } = useContext(ModalContext);

  if (scrolledPast) {
    return <></>;
  }
  function discardChanges(to: string) {
    window.location.href = to;
    close();
  }
  function openModal() {
    handleModal(
      <ConfirmModal
        title={t('PD.UnsavedChanges')}
        description={t('PD.UnsavedChangesMsg')}
        onConfirm={() =>
          discardChanges(`${sessionStorage.getItem('prevFilter') ?? '/'}`)
        }
        cancelText={t('Common.No')}
        confirmText={t('Common.Yes')}
      />
    );
  }

  return (
    <ArrowLink
      useAsBtn={formState.isDirty}
      to={`${sessionStorage.getItem('prevFilter') ?? '/'}`}
      onClick={formState.isDirty ? openModal : undefined}
      direction="left">
      <>{t(`PD.BackToOverview`)}</>
    </ArrowLink>
  );
};

export default BackLink;
