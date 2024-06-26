import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../../theme/Constants';
import { ProductDevelopmentVersionDto } from '../../../../app/generate';
import AccordionItem from '../../../../components/AccordionItem/AccordionItem';
import VersionRow from './VersionRow';

type Props = {
  versions: ProductDevelopmentVersionDto[];
};

const VersionsSection = ({ versions }: Props) => {
  const { t } = useTranslation();

  return (
    <AccordionItem title={t('PD.AccordionLabels.Versions')} panelPadding="0">
      <>
        <Grid
          w={'100%'}
          templateColumns={
            'max-content repeat(4, min-content) 1fr min-content'
          }>
          {versions.map((version, i) => {
            const bgColor = i % 2 === 1 ? COLORS.GRAY[5] : undefined;
            return <VersionRow key={i} version={version} bgColor={bgColor} />;
          })}
        </Grid>
      </>
    </AccordionItem>
  );
};

export default VersionsSection;
