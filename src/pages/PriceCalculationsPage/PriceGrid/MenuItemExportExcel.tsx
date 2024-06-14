import { Center, MenuItem } from '@chakra-ui/react';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { SIZES } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useDownloadFile } from '../../../app/hooks/useDownloadFile';
import { OpenAPI } from '../../../app/generate';
import Spinner from '../../../components/Spinner/Spinner';

type Props = {
  productionId: string;
};

const MenuItemExportExcel = ({ productionId }: Props) => {
  const { t } = useTranslation();
  const { downloadFile, isLoading } = useDownloadFile();

  const onExportExcel = () => {
    downloadFile(
      `${OpenAPI.BASE}/api/Excel/GetExcel/${encodeURIComponent(productionId)}`,
      `Export-${productionId}.xlsx`,
      'GET'
    );
  };

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
              fontSize={SIZES.ICON.MD}
              icon={'EXCEL'}
            />
          )}
        </Center>
      }>
      {t('PriceCalc.ExportToExcel')}
    </MenuItem>
  );
};

export default MenuItemExportExcel;
