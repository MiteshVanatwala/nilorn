import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../../components/Link/ArrowLink';
import { useFormContext } from 'react-hook-form';
import { useUnsavedChanges } from '../../../../app/hooks/useUnsavedChanges';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();
  const { formState } = useFormContext();
  const { onLeavePage } = useUnsavedChanges();

  const backLink = sessionStorage.getItem('backLink') ?? '/';
  if (scrolledPast) {
    return <></>;
  }

  return (
    <ArrowLink
      useAsBtn={formState.isDirty}
      to={`${sessionStorage.getItem('backLink') ?? '/'}`}
      onClick={() => onLeavePage(`${backLink}`)}
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
