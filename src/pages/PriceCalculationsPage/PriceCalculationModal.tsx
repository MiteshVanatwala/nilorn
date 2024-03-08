import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  MediaFileDto,
  PriceCalculationDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import { Box } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useCreateCalculation,
  usePatchCalculation,
} from '../../app/api/calculation';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';

type Props = {
  createNew?: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  lastModified?: string;
  artwork?: MediaFileDto;
  production: ProductionDto;
  calculation: PriceCalculationDto | undefined;
};

const PriceCalculationModal = ({
  createNew,
  productDevelopment,
  sourcedProduction,
  lastModified,
  artwork,
  production,
  calculation,
}: Props) => {
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    calculation?.id ?? ''
  );

  const margins =
    calculation?.priceDtos !== null && calculation?.priceDtos !== undefined
      ? calculation?.priceDtos.map(item => item.margin)
      : null;

  const form = useForm({
    defaultValues: {
      id: calculation?.id,
      currencyRate: calculation?.currencyRate,
      currencyCode: calculation?.currencyCode,
      internalCommission: calculation?.internalCommission,
      indirectCost: calculation?.indirectCost,
      freightIncluded: calculation?.freightIncluded,
      margin:
        margins !== null && margins.every(m => m === margins[0])
          ? margins[0]
          : null,
    },
  });

  const { mutate: updateCalculation } = usePatchCalculation();
  const { mutate: createCalculation } = useCreateCalculation();
  const { close } = useContext(ModalContext);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        createCalculation(form, {
          onSuccess: () => {
            close();
          },
        });
      } else {
        updateCalculation(form, {
          onSuccess: () => {
            close();
          },
        });
      }
    }
    onSubmit(form);
  }

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
            vendorName={production?.vendorName}
            actionBar={
              <PriceCalculationActionBar
                artwork={artwork}
                createNew={createNew}
                lastModified={lastModified}
                id={calculation?.id ?? ''}
                showChanges={showChanges}
                setShowChanges={(s: boolean) => setShowChanges(s)}
              />
            }
          />
          <PriceCalculationForm
            calculation={calculation}
            production={production}
            createNew={createNew ?? false}
            showChanges={showChanges}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
