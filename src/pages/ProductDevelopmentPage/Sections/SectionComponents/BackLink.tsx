import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../../components/Link/ArrowLink';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();

  if (scrolledPast) {
    return <></>;
  }

  return (
    <ArrowLink
      to={`${sessionStorage.getItem('prevFilter') ?? '/'}`}
      direction="left">
      <>{t(`PD.BackToOverview`)}</>
    </ArrowLink>
  );
};

export default BackLink;
