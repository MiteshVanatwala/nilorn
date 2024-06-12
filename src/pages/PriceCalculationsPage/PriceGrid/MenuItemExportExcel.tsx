import { MenuItem } from '@chakra-ui/react';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { SIZES } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useDownloadFile } from '../../../app/hooks/useDownloadFile';
import { OpenAPI } from '../../../app/generate';

type Props = {
  productionId: string;
};

const MenuItemExportExcel = ({ productionId }: Props) => {
  const { t } = useTranslation();
  const { downloadFile } = useDownloadFile();

  const onExportExcel = () => {
    downloadFile(
      `${OpenAPI.BASE}/api/Excel/GetExcel/${encodeURIComponent(productionId)}`,
      `Export-${productionId}.xlsx`,
      'GET'
    );
  };

  return (
    <MenuItem
      onClick={onExportExcel}
      icon={
        <RemixIcon component="Text" fontSize={SIZES.ICON.MD} icon={'EXCEL'} />
      }>
      {t('PriceCalc.ExportToExcel')}
    </MenuItem>
  );
};

export default MenuItemExportExcel;
