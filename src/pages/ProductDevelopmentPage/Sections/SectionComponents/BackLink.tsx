import ArrowLink from '../../../../components/Link/ArrowLink';
import { useBackInfo } from '../../../../app/hooks/useBackInfo';

type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { backInfo } = useBackInfo();

  if (scrolledPast) {
    return <></>;
  }

  return (
    <>
      <ArrowLink to={`${backInfo?.link}`} direction="left">
        <>{backInfo?.label}</>
      </ArrowLink>
    </>
  );
};

export default BackLink;
