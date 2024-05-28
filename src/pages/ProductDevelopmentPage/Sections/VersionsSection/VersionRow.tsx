import { GridItem, Text, TextProps, Tooltip } from '@chakra-ui/react';
import { SPACE } from '../../../../theme/Constants';
import ImagePopup from '../../../../components/ImagePopup/ImagePopup';
import StatusBadge from '../../../../components/Status/StatusBadge';
import { Version } from './VersionsSection';

type Props = {
  version: Version;
  bgColor?: string;
};

const VersionRow = ({ version, bgColor }: Props) => {
  const gridItemStyles = {
    colSpan: 1,
    bgColor: bgColor,
    px: SPACE.SM,
    py: SPACE.XS,
    alignContent: 'center',
  };

  const commonTextStyles: TextProps = {
    maxW: '30ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <GridItem colStart={1} {...gridItemStyles}>
        <ImagePopup thumbnail={true} alt="Artwork" src={version.artwork} />
      </GridItem>

      <GridItem colStart={2} {...gridItemStyles}>
        <Text variant={'bodyBold'} {...commonTextStyles}>
          {version.name}
        </Text>
      </GridItem>

      <GridItem colStart={3} {...gridItemStyles}>
        <Text {...commonTextStyles}>{version.no}</Text>
      </GridItem>

      <GridItem colStart={4} {...gridItemStyles}>
        <StatusBadge status={version.status} />
      </GridItem>

      <GridItem colStart={5} {...gridItemStyles}>
        <Text>{version.artwork}</Text>
      </GridItem>

      <GridItem colStart={6} {...gridItemStyles}>
        <Tooltip label={version.versionSpecification}>
          <Text {...commonTextStyles}>{version.versionSpecification}</Text>
        </Tooltip>
      </GridItem>

      <GridItem colStart={7} {...gridItemStyles}>
        <Text {...commonTextStyles}>{version.sourcings}</Text>
      </GridItem>
    </>
  );
};

export default VersionRow;
