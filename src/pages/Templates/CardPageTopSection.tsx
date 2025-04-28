import { Grid, GridItem, VStack } from '@chakra-ui/react';
import SelectBase from '../../components/Form/SelectBase';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { SelectOption } from '../../app/types/types';
import { useGetProjectsOptions } from '../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import ControlWrapper from '../../components/Form/ControlWrapper';
import { GRID, SPACE } from '../../theme/Constants';

type Props = {
  selectedClientNo?: string;
  setSelectedClientNo: Dispatch<SetStateAction<string | undefined>>;
  selectedProjectCode?: string;
  setSelectedProjectCode?: Dispatch<SetStateAction<string | undefined>>;
  clientOptions?: SelectOption[];
  actionBar: JSX.Element;
};

const CardPageTopSection = ({
  selectedProjectCode,
  selectedClientNo,
  setSelectedProjectCode,
  setSelectedClientNo,
  clientOptions,
  actionBar,
}: Props) => {
  const { t } = useTranslation();

  const { data: projectOptionItems } = useGetProjectsOptions(
    selectedClientNo,
    !!setSelectedProjectCode
  );

  const projectOptions = useMemo(() => {
    return !!projectOptionItems ? (projectOptionItems as SelectOption[]) : [];
  }, [projectOptionItems]);

  const onChangeProject = (option: SelectOption) => {
    setSelectedProjectCode && setSelectedProjectCode(option.value);
  };

  const onChangeClient = (option: SelectOption) => {
    setSelectedClientNo(option.value);
    setSelectedProjectCode && setSelectedProjectCode(undefined);
  };

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.md,
        lg: GRID.TEMPLATE_COLUMNS.xl,
      }}
      gap={{
        base: SPACE.XXS,
        lg: SPACE.SM,
      }}
      pt={{
        base: SPACE.XS,
        md: SPACE.SM,
      }}
      pb={{
        base: SPACE.XS,
        md: SPACE.LG,
      }}>
      <GridItem
        colSpan={{
          base: 2,
          md: 2,
        }}>
        <ControlWrapper name={'client'} label={t('Menu.HypClients')}>
          <SelectBase
            name={'client'}
            onChange={onChangeClient}
            options={clientOptions}
            value={clientOptions?.find(
              option => option.value === selectedClientNo
            )}
          />
        </ControlWrapper>
      </GridItem>
      <GridItem
        colSpan={{
          base: 2,
          md: 2,
        }}>
        {!!setSelectedProjectCode && (
          <ControlWrapper name={'project'} label={t('Menu.HypProjects')}>
            <SelectBase
              name={'project'}
              isDisabled={!selectedClientNo}
              onChange={onChangeProject}
              options={projectOptions as SelectOption[]}
              value={
                !!selectedProjectCode
                  ? (projectOptions?.find(
                      option => option.value === selectedProjectCode
                    ) as SelectOption)
                  : undefined
              }
            />
          </ControlWrapper>
        )}
      </GridItem>
      <GridItem colSpan={3} colStart={-4}>
        <VStack
          alignItems={{
            base: 'start',
            lg: 'end',
          }}
          h={'full'}
          justifyContent={'end'}>
          {actionBar}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default CardPageTopSection;
