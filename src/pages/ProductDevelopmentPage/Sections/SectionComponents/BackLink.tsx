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
  const backLink = sessionStorage.getItem('backLink') ?? '/';
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
        onConfirm={() => discardChanges(`${backLink}`)}
        cancelText={t('Common.No')}
        confirmText={t('Common.Yes')}
      />
    );
  }

  return (
    <ArrowLink
      useAsBtn={formState.isDirty}
      to={`${sessionStorage.getItem('backLink') ?? '/'}`}
      onClick={formState.isDirty ? openModal : undefined}
      direction="left">
      <>
        {backLink != null && backLink.indexOf('productions') > -1 && (
          <> {t(`PD.BackToProductions`)}</>
        )}
        {backLink != null && backLink.indexOf('price-calculations') > -1 && (
          <> {t(`PD.BackToCalculations`)}</>
        )}
        {backLink != null &&
          backLink.indexOf('price-calculations') === -1 &&
          backLink.indexOf('productions') === -1 && (
            <>{t(`PD.BackToOverview`)}</>
          )}
      </>
    </ArrowLink>
  );
};

export default BackLink;
