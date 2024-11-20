import { Box, Grid, GridItem } from '@chakra-ui/layout';
import ContentSection from '../../Templates/ContentSection';
import { COLORS, GRID } from '../../../theme/Constants';
import { useProductDevelopmentNavigation } from '../../../app/api/productDevelopment';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { useNavigate } from 'react-router';

type Props = {
  no: string;
};
const BottomSection = ({ no }: Props) => {
  const { t } = useTranslation();
  const { data } = useProductDevelopmentNavigation(no);
  const navigate = useNavigate();
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
            <Button
              color={COLORS.BLACK}
              variant={'link'}
              leftIcon={<RemixIcon component="i" icon="ARROW_LEFT_LINE" />}
              isDisabled={!data?.previous}
              onClick={() => {
                navigate(`/product-development/${data?.previous}`);
              }}>
              {t('Common.Previous')}
            </Button>
          </GridItem>
          <GridItem>
            <Button
              color={COLORS.BLACK}
              variant={'link'}
              rightIcon={<RemixIcon component="i" icon="ARROW_RIGHT_LINE" />}
              isDisabled={!data?.next}
              onClick={() => {
                navigate(`/product-development/${data?.next}`);
              }}>
              {t('Common.Next')}
            </Button>
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default BottomSection;
