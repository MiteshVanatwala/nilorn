import { Link, Text } from '@chakra-ui/layout';
import { COLORS, SPACE } from '../../theme/Constants';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import fonts from '../../theme/fonts';
import TRANSITION from '../../theme/Constants/transition';
type Props = {
  scrolledPast: boolean;
};
const BackLink = ({ scrolledPast }: Props) => {
  const { t } = useTranslation();

  return (
    <Link href={sessionStorage.getItem('prevFilter') ?? '/'}>
      <IconButton
        display={scrolledPast ? 'none' : 'inline-flex'}
        aria-label={t(`PD.BackToOverview`)}
        bg={COLORS.WHITE}
        color={COLORS.GRAY[90]}
        as={'i'}
        mb={scrolledPast ? '0' : SPACE.MD}
        transition={TRANSITION.EASEOUT}
        className={'ri-arrow-left-s-line'}>
        <Text
          fontFamily={fonts.body}
          variant={'bodyBold'}
          pr={SPACE.XXS}
          ml={'1rem'}
          color={COLORS.GRAY[90]}>
          {t(`PD.BackToOverview`)}
        </Text>
      </IconButton>
    </Link>
  );
};

export default BackLink;
