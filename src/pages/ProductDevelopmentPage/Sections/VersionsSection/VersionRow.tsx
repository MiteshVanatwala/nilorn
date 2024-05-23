import { GridItem, Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../../theme/Constants';
import ImagePopup from '../../../../components/ImagePopup/ImagePopup';
import StatusBadge from '../../../../components/Status/StatusBadge';
import { Version } from './VersionsSection';

type Props = {
  version: Version;
  bgColor?: string;
};

const VersionRow = ({ version, bgColor }: Props) => {
  const { t } = useTranslation();

  const gridItemStyles = {
    colSpan: 1,
    bgColor: bgColor,
    px: SPACE.SM,
    py: SPACE.XS,
    alignContent: 'center',
  };

  return (
    <>
      <GridItem colStart={1} {...gridItemStyles}>
        <ImagePopup thumbnail={true} alt="Artwork" src={version.img} />
      </GridItem>

      <GridItem colStart={2} {...gridItemStyles}>
        <Text
          variant={'bodyBold'}
          maxW={'30ch'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}>
          {version.name}
        </Text>
      </GridItem>

      <GridItem colStart={3} {...gridItemStyles}>
        <Text
          maxW={'30ch'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}>
          {version.no}
        </Text>
      </GridItem>

      <GridItem colStart={4} {...gridItemStyles}>
        <StatusBadge status={version.status} />
      </GridItem>

      <GridItem colStart={5} {...gridItemStyles}>
        <Text>{version.artwork}</Text>
      </GridItem>

      <GridItem colStart={6} {...gridItemStyles}>
        <Tooltip label={version.specification}>
          <Text
            maxW={'30ch'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}>
            {version.specification}
          </Text>
        </Tooltip>
      </GridItem>

      <GridItem colStart={7} {...gridItemStyles}>
        <Text>{version.sourcings}</Text>
      </GridItem>
    </>
  );
};

export default VersionRow;
