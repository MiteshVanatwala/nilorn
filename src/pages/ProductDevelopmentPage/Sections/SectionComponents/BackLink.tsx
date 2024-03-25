import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../../components/Link/ArrowLink';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();

  let backLink = sessionStorage.getItem('backLink') ?? '/';
  if (backLink.indexOf('product-development/create')) {
    backLink = backLink.replace('product-development/create', '');
  }
  if (scrolledPast) {
    return <></>;
  }

  return (
    <>
      <ArrowLink to={`${backLink}`} direction="left">
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
    </>
  );
};

export default BackLink;
