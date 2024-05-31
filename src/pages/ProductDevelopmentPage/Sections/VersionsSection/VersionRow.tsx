import { GridItem, Text, TextProps, Tooltip } from '@chakra-ui/react';
import { SPACE } from '../../../../theme/Constants';
import ImagePopup from '../../../../components/ImagePopup/ImagePopup';
import StatusBadge from '../../../../components/Status/StatusBadge';
import { ProductDevelopmentVersionDto } from '../../../../app/generate';
import ArtworkButton from '../../../../components/Button/ArtworkButton';

type Props = {
  version: ProductDevelopmentVersionDto;
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

  const {
    thumbnailData,
    artwork,
    name,
    no,
    status,
    versionSpecification,
    sourcings,
  } = version;

  return (
    <>
      <GridItem colStart={1} {...gridItemStyles}>
        <ImagePopup
          thumbnail={true}
          alt="Thumbnail image"
          src={thumbnailData ? `data:image/jpeg;base64,${thumbnailData}` : ''}
        />
      </GridItem>

      <GridItem colStart={2} {...gridItemStyles}>
        <Text variant={'bodyBold'} {...commonTextStyles}>
          {name}
        </Text>
      </GridItem>

      <GridItem colStart={3} {...gridItemStyles}>
        <Text {...commonTextStyles}>{no}</Text>
      </GridItem>

      <GridItem colStart={4} {...gridItemStyles}>
        <StatusBadge status={status} />
      </GridItem>

      <GridItem colStart={5} {...gridItemStyles}>
        {artwork && <ArtworkButton size={'SMALL'} artwork={artwork} />}
      </GridItem>

      <GridItem colStart={6} {...gridItemStyles}>
        <Tooltip label={versionSpecification}>
          <Text {...commonTextStyles}>{versionSpecification}</Text>
        </Tooltip>
      </GridItem>

      <GridItem colStart={7} {...gridItemStyles}>
        <Text {...commonTextStyles}>{sourcings}</Text>
      </GridItem>
    </>
  );
};

export default VersionRow;
