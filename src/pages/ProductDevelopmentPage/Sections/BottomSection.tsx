import { Box, Grid, GridItem } from '@chakra-ui/layout';
import ContentSection from '../../Templates/ContentSection';
import { COLORS } from '../../../theme/Constants';
import ArrowLink from '../../../components/Link/ArrowLink';
import { useProductDevelopmentNavigation } from '../../../app/api/productDevelopment';
import { useTranslation } from 'react-i18next';

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
      zIndex={99}
      borderTop={`solid 1px ${COLORS.GRAY[10]}`}>
      <ContentSection>
        <Grid justifyContent={'space-between'} display={'flex'}>
          <GridItem>
            {data?.previous && (
              <ArrowLink
                direction={'left'}
                path={`/product-development/${data?.previous}`}>
                <>{t('Common.Previous')}</>
              </ArrowLink>
            )}
          </GridItem>
          <GridItem>
            {data?.next && (
              <ArrowLink
                direction={'right'}
                path={`/product-development/${data?.next}`}>
                <>{t('Common.Next')}</>
              </ArrowLink>
            )}
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default BottomSection;
