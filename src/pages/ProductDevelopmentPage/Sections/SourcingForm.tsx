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
import { useProductDevelopment } from '../../../app/api/productDevelopment';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';

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

  const { onLeavePage } = useUnsavedChanges();

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

          {!disableEdit && !connectedProductions?.length && (
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
              onClick={() =>
                onLeavePage(
                  `/productions/?productDevelopments=${no}&pageSize=25&pageNumber=1`
                )
              }
              to={`/productions/?productDevelopments=${no}&pageSize=25&pageNumber=1`}
              direction="right">
              <>
                {(connectedProductions && connectedProductions?.length > 0) ||
                disableEdit
                  ? t('PD.ViewProductions')
                  : t('PD.AddProductions')}
              </>
            </ArrowLink>
            {connectedProductions &&
              connectedProductions?.filter(
                cp => cp.priceCalculations && cp.released
              )?.length > 0 && (
                <ArrowLink
                  useAsBtn={formState.isDirty}
                  onClick={() =>
                    onLeavePage(
                      `/price-calculations/?productDevelopments=${no}&pageSize=25&pageNumber=1`
                    )
                  }
                  to={`/price-calculations/?productDevelopments=${no}&pageSize=25&pageNumber=1`}
                  direction="right">
                  <>
                    {(connectedProductions &&
                      connectedProductions?.filter(
                        cp =>
                          cp.priceCalculations &&
                          cp.released &&
                          cp.priceCalculations.length > 0
                      )?.length > 0) ||
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
