import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../../components/Link/ArrowLink';
import { useFormContext } from 'react-hook-form';
import ArrowLinkUnsavedChanges from '../../../../components/Link/ArrowLinkUnsavedChanges';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();
  const { formState } = useFormContext();

  if (scrolledPast) {
    return <></>;
  }
  if (formState.isDirty) {
    return (
      <ArrowLinkUnsavedChanges
        direction="left"
        to={`${sessionStorage.getItem('prevFilter') ?? '/'}`}>
        <>{t(`PD.BackToOverview`)}</>
      </ArrowLinkUnsavedChanges>
    );
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
