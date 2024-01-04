import { Text, IconButton, Tooltip, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, GRID, SPACE } from '../../theme/Constants';

type Props = {
  name: string;
  code: string;
  role: string;
  even: boolean;
  onRemove: () => void;
};
export const Member = ({ name, code, role, even, onRemove }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid
      px={SPACE.XS}
      py={SPACE.XXS}
      border={'1px solid'}
      borderColor={COLORS.GRAY[10]}
      bgColor={even ? COLORS.GRAY[5] : COLORS.WHITE}
      alignItems={'center'}
      templateColumns={GRID.TEMPLATE_COLUMNS.xl}
      gap={SPACE.XXS}>
      <GridItem colSpan={3}>
        <Text fontWeight={700}>{code}</Text>
      </GridItem>
      <GridItem
        colSpan={{
          base: 5,
          xl: 4,
        }}>
        <Text>{name}</Text>
      </GridItem>
      <GridItem
        colSpan={{
          base: 3,
          xl: 4,
        }}>
        <Text>{role}</Text>
      </GridItem>
      <GridItem>
        <Tooltip label={t('Common.Remove')}>
          <IconButton
            variant={'deleteBtn'}
            aria-label={t('Common.Remove')}
            icon={<i className={'ri-close-line'} />}
            mr={0}
            onClick={onRemove}
          />
        </Tooltip>
      </GridItem>
    </Grid>
  );
};

export default Member;
