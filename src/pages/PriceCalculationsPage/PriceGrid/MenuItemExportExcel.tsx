import { Center, MenuItem } from '@chakra-ui/react';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { COLORS, SIZES } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useDownloadFile } from '../../../app/hooks/useDownloadFile';
import Spinner from '../../../components/Spinner/Spinner';
import { DownloadFileType } from '../../../app/types/types';

type Props = {
  priceCalculationId: string;
};

const MenuItemExportExcel = ({ priceCalculationId }: Props) => {
  const { t } = useTranslation();
  const { downloadFile, isLoading, isError, isSuccess } = useDownloadFile();

  const onExportExcel = () => {
    downloadFile(
      DownloadFileType.EXCEL,
      priceCalculationId,
      `Export-${priceCalculationId}.xlsx`
    );
  };

  const icon = isSuccess ? 'CHECK_LINE' : isError ? 'CLOSE_LINE' : 'EXCEL';
  const iconColor = isSuccess
    ? COLORS.BLUE[200]
    : isError
    ? COLORS.ERROR
    : undefined;

  return (
    <MenuItem
      closeOnSelect={false}
      onClick={onExportExcel}
      icon={
        <Center w={SIZES.ICON.MD} h={SIZES.ICON.MD}>
          {isLoading ? (
            <Spinner size={'md'} />
          ) : (
            <RemixIcon
              component="Text"
              color={iconColor}
              fontSize={SIZES.ICON.MD}
              icon={icon}
            />
          )}
        </Center>
      }>
      {t('PriceCalc.ExportToExcel')}
    </MenuItem>
  );
};

export default MenuItemExportExcel;
