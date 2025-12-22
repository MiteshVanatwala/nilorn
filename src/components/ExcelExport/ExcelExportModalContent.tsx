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
  ExcelExportFieldKey,
  ExcelExportFieldKeyList,
} from '../../app/types/types';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import { SelectedPrices } from '../../pages/PriceCalculationsPage/PriceCalculationsTable';

type Props = {
  selectedPrices: SelectedPrices;
};

const ExcelExportModalContent = ({ selectedPrices }: Props) => {
  const { t } = useTranslation();
  const { isLoading, downloadFile } = useDownloadFile();
  const { close } = useContext(ModalContext);
  const [selections, setSelections] = useState<ExcelExportFieldKeyList>({
    image: true,
    itemNo: true,
    description: true,
    versionSpec: true,
    finishedLength: true,
    finishedWidth: true,
    certificate: true,
    moq: true,
    vendor: false,
    purchasePrice: false,
  });
  const [fileName, setFileName] = useState<string>('UmbrellaExport');

  const handleCheckboxChange = (field: ExcelExportFieldKey) => {
    setSelections(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onCancel = () => {
    close();
  };

  const getUniqueClients = Object.values(selectedPrices)
    .filter(val => val.selected === true)
    .map(val => val.productDevelopmentNo)
    .filter((x, i, a) => a.indexOf(x) === i).length;

  async function onSubmit(): Promise<void> {
    const selectedIds = Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected === true)
      .map(([id]) => id);

    const excelExportOptions = selectedIds.map(id => ({
      PriceCalculationId: id,
      Valid: true,
      Included: true,
      No: true,
      Name: true,
      NameOfFile: fileName,
      ThumbnailData: selections.image,
      ItemNo: selections.itemNo,
      Description: selections.description,
      Version: selections.versionSpec,
      Quantity: true,
      Certificate: selections.certificate,
      SalesPrice: true,
      SalesCurrency: true,
      Sourcing: true,
      PurchaseCurrency: selections.purchasePrice,
      PurchasePrice: selections.purchasePrice,
      MOQ: selections.moq,
      Vendor: selections.vendor,
      FinishedLength: selections.finishedLength,
      FinishedWidth: selections.finishedWidth,
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
          {t('ExcelExport.ModalDesc')}
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
                    handleCheckboxChange(key as ExcelExportFieldKey)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCheckboxChange(key as ExcelExportFieldKey);
                    }
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
export default ExcelExportModalContent;
