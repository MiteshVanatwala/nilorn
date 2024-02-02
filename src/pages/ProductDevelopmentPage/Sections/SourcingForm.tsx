import { Button, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import InputField from '../../../components/Form/InputField';
import Quantity from './SectionComponents/Quantity';
import TextArea from '../../../components/Form/TextArea';
import { useProductions } from '../../../app/api/Productions';
import ReleasedProductions from './ReleasedProductions';
import ArrowLink from '../../../components/Link/ArrowLink';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { ModalContext } from '../../../app/context/ModalContext';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { useProductDevelopment } from '../../../app/api/productDevelopment';

type Props = {
  no: string;
  disableEdit: boolean;
  sourcingCompanyCode: string;
  sourcingIndexKey: string;
  onRemove: () => void;
};

const SourcingForm = ({
  no,
  disableEdit,
  sourcingCompanyCode,
  sourcingIndexKey,
  onRemove,
}: Props) => {
  const { t } = useTranslation();
  const { data: connectedProductions } = useProductions(
    no,
    sourcingCompanyCode
  );
  const { data: productDevelopmentData } = useProductDevelopment(no);
  const { formState } = useFormContext();
  const { handleModal, close } = useContext(ModalContext);

  function discardChanges(to: string) {
    window.location.href = to;
    close();
  }
  function openModal() {
    handleModal(
      <ConfirmModal
        title={t('PD.UnsavedChanges')}
        description={t('PD.UnsavedChangesMsg')}
        onConfirm={() =>
          discardChanges(`/productions/?productDevelopments=${no}`)
        }
        cancelText={t('Common.No')}
        confirmText={t('Common.Yes')}
      />
    );
  }

  const isSaved =
    productDevelopmentData &&
    productDevelopmentData.sourcings?.find(
      s => s.sourcingCompanyCode === sourcingCompanyCode
    );

  return (
    <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
      <GridItem
        colSpan={{
          base: 2,
          lg: 5,
          xl: 6,
        }}>
        <VStack gap={GRID.GAP} alignItems={'start'}>
          <TextArea
            placeholder={`${t('Common.Placeholder')}`}
            label={`${t('PD.FormContent.ClientRequirements')}`}
            name={`${sourcingIndexKey}.clientRequirement`}
            readonly={disableEdit}
            registerOptions={{
              maxLength: 500,
            }}
          />
          <InputField
            placeholder={`${t('Common.Placeholder')}`}
            label={`${t('PD.FormContent.TargetPurchasePrice')}`}
            name={`${sourcingIndexKey}.targetPurchasePrice`}
            readonly={disableEdit}
            registerOptions={{
              maxLength: 50,
            }}
          />

          {!disableEdit && connectedProductions?.length === 0 && (
            <Button
              mt={SPACE}
              variant={'secondarySmall'}
              onClick={onRemove}
              rightIcon={<i className={'ri-delete-bin-line'} />}>
              {t('PD.RemoveSourcing')}
            </Button>
          )}
        </VStack>
      </GridItem>
      <GridItem
        rowSpan={3}
        colSpan={{
          base: 2,
          lg: 2,
        }}
        colEnd={{
          base: 0,
          lg: 11,
          xl: 13,
        }}
        colStart={{
          base: 1,
          lg: 9,
          xl: 11,
        }}>
        <Quantity disableEdit={disableEdit} formKey={sourcingIndexKey} />
      </GridItem>
      <GridItem
        colSpan={{
          base: 1,
          lg: 8,
          xl: 10,
        }}>
        <ReleasedProductions
          data={connectedProductions?.filter(cp => cp.released) ?? []}
        />
      </GridItem>
      <GridItem
        colSpan={{
          base: 2,
          lg: 5,
          xl: 6,
        }}>
        {isSaved && (
          <HStack spacing={SPACE.XL}>
            <ArrowLink
              useAsBtn={formState.isDirty}
              onClick={formState.isDirty ? openModal : undefined}
              direction="right"
              to={`/productions/?productDevelopments=${no}`}>
              <>
                {(connectedProductions && connectedProductions?.length > 0) ||
                disableEdit
                  ? t('PD.ViewProductions')
                  : t('PD.AddProductions')}
              </>
            </ArrowLink>
            {connectedProductions && connectedProductions?.length > 0 && (
              <ArrowLink
                useAsBtn={formState.isDirty}
                onClick={formState.isDirty ? openModal : undefined}
                direction="right"
                to={`/price-calculations/?productDevelopments=${no}`}>
                <>
                  {(connectedProductions &&
                    connectedProductions?.filter(cp => cp.priceCalculations)
                      ?.length > 0) ||
                  disableEdit
                    ? t('PD.ViewCalculation')
                    : t('PD.AddCalculation')}
                </>
              </ArrowLink>
            )}
          </HStack>
        )}
      </GridItem>
    </Grid>
  );
};

export default SourcingForm;
