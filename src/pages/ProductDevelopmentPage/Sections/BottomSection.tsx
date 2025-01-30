import { Box, Grid, GridItem } from '@chakra-ui/layout';
import ContentSection from '../../Templates/ContentSection';
import { COLORS, GRID } from '../../../theme/Constants';
import { useProductDevelopmentNavigation } from '../../../app/api/productDevelopment';
import { useTranslation } from 'react-i18next';
import ArrowLink from '../../../components/Link/ArrowLink';

type Props = {
  no: string;
};
const BottomSection = ({ no }: Props) => {
  const { t } = useTranslation();
  const { data } = useProductDevelopmentNavigation(no);
  return (
    <Box
      position={'sticky'}
      bgColor={COLORS.WHITE}
      bottom={0}
      left={0}
      right={0}
      zIndex={3}
      borderTop={`solid 1px ${COLORS.GRAY[10]}`}>
      <ContentSection>
        <Grid justifyContent={'space-between'} display={'flex'} py={GRID.GAP}>
          <GridItem>
            <ArrowLink
              direction={'left'}
              to={`/product-development/${data?.previous}`}
              isDisabled={!data?.previous}>
              <>{t('Common.Previous')}</>
            </ArrowLink>
          </GridItem>
          <GridItem>
            <ArrowLink
              direction={'right'}
              to={`/product-development/${data?.next}`}
              isDisabled={!data?.next}>
              <>{t('Common.Next')}</>
            </ArrowLink>
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default BottomSection;
