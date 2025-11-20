import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import { SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import ModalHeading from '../Modal/ModalHeading';
import {
  ProductionExcelExportFieldKey,
  ProductionExcelExportFieldKeyList,
} from '../../app/types/types';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import { SelectedPriceCalculations } from '../../pages/Productions/ProductionsTable';

type Props = {
  selectedPriceCalculations: SelectedPriceCalculations;
};

const ProductionExcelExportModalContent = ({ selectedPriceCalculations }: Props) => {
  const { t } = useTranslation();
  const { isLoading, downloadFile } = useDownloadFile();
  const { close } = useContext(ModalContext);
  const [selections, setSelections] = useState<ProductionExcelExportFieldKeyList>({
    client: true,
    description: true,
    versionSpec: true,
    itemCategory: true,
    productGroup: true,
    foldingType: true,
    finishedLength: true,
    finishedWidth: true,
    vendor: true,
    dieSet: true,
    certificate: true,
    sourcing: false,
  });
  const [fileName, setFileName] = useState<string>('ProductionExport');

  const handleCheckboxChange = (field: ProductionExcelExportFieldKey) => {
    setSelections(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onCancel = () => {
    close();
  };

  const getUniqueClients = Object.values(selectedPriceCalculations)
    .filter(val => val.selected === true).length;

  async function onSubmit(): Promise<void> {
    const selectedIds = Object.entries(selectedPriceCalculations)
      .filter(([_, value]) => value.selected === true)
      .map(([id, value]) => ({ priceCalculationId: id, productionId: value.productionId }));

    const excelExportOptions = selectedIds.map(item => ({
      PriceCalculationId: item.priceCalculationId,
      ProductionId: item.productionId,
      Client: selections.client,
      Description: selections.description,
      Version: selections.versionSpec,
      ItemCategory: selections.itemCategory,
      ProductGroup: selections.productGroup,
      FoldingType: selections.foldingType,
      FinishedLength: selections.finishedLength,
      FinishedWidth: selections.finishedWidth,
      Sourcing: selections.sourcing,
      DieSet: selections.dieSet,
      Certificate: selections.certificate,
      Vendor: selections.vendor,
      IsProduction: true
    }));

    try {
      downloadFile(
        `${process.env.REACT_APP_API_URL}/api/Excel/GetExcel`,
        `${fileName.replace(/xlsx/gi, '').replace(/xls/gi, '')}.xlsx`,
        'PUT',
        excelExportOptions
      ).then(() => {
        close();
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <ModalBody>
        <ModalHeading
          textAlign={'center'}
          title={t('ExcelExport.ModalTitle')}
        />
        <Text pb={10} fontWeight={'bold'}>
          {t('ExcelExport.ProductionModalDesc')}
        </Text>
        <Stack spacing={2}>
          {Object.entries(selections).map(([key, value]) => (
            <Grid templateColumns="repeat(2, 1fr)" gap="6" key={key}>
              <GridItem>{t(`ExcelExport.${key}`)}</GridItem>
              <GridItem pb={2}>
                <Checkbox
                  key={key}
                  isChecked={value}
                  onChange={() =>
                    handleCheckboxChange(key as ProductionExcelExportFieldKey)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter')
                      handleCheckboxChange(key as ProductionExcelExportFieldKey);
                  }}
                />
              </GridItem>
            </Grid>
          ))}
        </Stack>
        <Box mt={10} mb={10}>
          <Text mb={1} fontWeight={'bold'}>
            {t('ExcelExport.FileName')}
          </Text>
          <Input
            value={fileName}
            onChange={e => {
              const sanitizedValue = e.target.value.replace(/[\/:*?"<>|]/g, '');
              setFileName(sanitizedValue);
            }}
          />
        </Box>
        <Text mt={2} fontSize="sm">
          {getUniqueClients} {t('ExcelExport.ProductDevelopmentIncluded')}
        </Text>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            type="submit"
            variant={'primary'}
            onClick={onSubmit}
            isLoading={isLoading}>
            {t('Common.Confirm')}
          </Button>

          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}
            isDisabled={isLoading}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </form>
  );
};
export default ProductionExcelExportModalContent;


