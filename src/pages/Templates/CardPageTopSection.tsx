import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ControlWrapper from '../../components/Form/ControlWrapper';
import { GRID, SPACE } from '../../theme/Constants';
import Select from '../../components/Form/Select';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { useFormContext, useWatch } from 'react-hook-form';
import { useClient } from '../../app/api/FilterInfo';

type Props = {
  selectedClientNo?: string;
  setSelectedClientNo: Dispatch<SetStateAction<string | undefined>>;
  selectedProjectCode?: string;
  actionBar: JSX.Element;
};

const CardPageTopSection = ({ setSelectedClientNo, actionBar }: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions('clients', true);
  const { reset } = useFormContext();
  const clientNo = useWatch({ name: 'no' });
  const { data: client } = useClient(clientNo ?? '');

  useEffect(() => {
    setSelectedClientNo(clientNo);
  }, [clientNo]);

  useEffect(() => {
    if (client) {
      reset({ ...client });
    } else {
      reset({
        accountManager: {},
        keyAccountManager: {},
        no: '',
        name: '',
        members: [],
        lastModified: '',
        requirement: '',
        teamsName: '',
        channelName: '',
        artWorkFolderName: '',
        attachmentFolderName: '',
      });
    }
  }, [client]);

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
          <Select
            placeholder={t('PD.Client')}
            name="no"
            options={clientOptions}
            registerOptions={{ required: true }}
          />
        </ControlWrapper>
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
