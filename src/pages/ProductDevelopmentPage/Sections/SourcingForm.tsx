import { Button, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import InputField from '../../../components/Form/InputField';
import Quantity from './SectionComponents/Quantity';
import TextArea from '../../../components/Form/TextArea';
import { useProductions } from '../../../app/api/Productions';
import ReleasedProductions from './ReleasedProductions';
import ArrowLink from '../../../components/Link/ArrowLink';

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

  return (
    <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
      <GridItem
        colSpan={{
          base: 1,
          xl: 6,
        }}>
        <VStack gap={GRID.GAP} alignItems={'start'}>
          <TextArea
            placeholder={`${t('Common.Placeholder')}`}
            label={`${t('PD.FormContent.ClientRequirements')}`}
            name={`${sourcingIndexKey}.clientRequirement`}
            readonly={disableEdit}
          />
          <InputField
            placeholder={`${t('Common.Placeholder')}`}
            label={`${t('PD.FormContent.TargetPurchasePrice')}`}
            name={`${sourcingIndexKey}.targetPurchasePrice`}
            readonly={disableEdit}
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
        colSpan={{
          base: 1,
          xl: 2,
        }}
        colEnd={{
          base: 1,
          xl: 13,
        }}
        colStart={{
          base: 1,
          xl: 11,
        }}>
        <Quantity disableEdit={disableEdit} formKey={sourcingIndexKey} />
      </GridItem>
      <GridItem colSpan={12}>
        <ReleasedProductions
          data={connectedProductions?.filter(cp => cp.released) ?? []}
        />
      </GridItem>
      <GridItem colSpan={12}>
        <ArrowLink
          direction="right"
          to={`/productions/?productDevelopments=${no}`}>
          <>
            {connectedProductions && connectedProductions?.length > 0
              ? t('PD.ViewProductions')
              : t('PD.AddProductions')}
          </>
        </ArrowLink>
      </GridItem>
    </Grid>
  );
};

export default SourcingForm;
