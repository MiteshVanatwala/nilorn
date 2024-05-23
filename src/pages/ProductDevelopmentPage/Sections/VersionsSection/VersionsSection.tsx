import { Grid, GridItem, Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SPACE } from '../../../../theme/Constants';
import { Status } from '../../../../app/generate';
import AccordionItem from '../../../../components/AccordionItem/AccordionItem';
import ImagePopup from '../../../../components/ImagePopup/ImagePopup';
import StatusBadge from '../../../../components/Status/StatusBadge';
import { Fragment } from 'react';
import VersionRow from './VersionRow';

export type Version = {
  img: string;
  name: string;
  no: string;
  status: Status;
  artwork: string;
  specification: string;
  sourcings: string;
};

type Props = {
  versions: Version[];
};

const VersionsSection = ({ versions }: Props) => {
  const { t } = useTranslation();

  return (
    <AccordionItem title={t('PD.AccordionLabels.Versions')} panelPadding="0">
      <>
        <Grid w={'100%'} templateColumns={'repeat(7, 1fr)'}>
          {versions.map((version, i) => {
            const bgColor = i % 2 === 1 ? COLORS.GRAY[5] : undefined;
            return <VersionRow version={version} bgColor={bgColor} />;
          })}
        </Grid>
      </>
    </AccordionItem>
  );
};

export default VersionsSection;
