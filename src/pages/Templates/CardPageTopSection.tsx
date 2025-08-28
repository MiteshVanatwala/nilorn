import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ControlWrapper from '../../components/Form/ControlWrapper';
import { GRID, SPACE } from '../../theme/Constants';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import { SESSION_STORAGE } from '../../app/utils/constant';
import SelectBase from '../../components/Form/SelectBase';

type Props = {
  selectedClientNo?: string;
  setSelectedClientNo: Dispatch<SetStateAction<string>>;
  selectedProjectCode?: string;
  actionBar: JSX.Element;
};

const CardPageTopSection = ({
  selectedClientNo,
  setSelectedClientNo,
  actionBar,
}: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions('clients', true);
  const clientNo = useWatch({ name: 'no' });
  const { setValue } = useFormContext();
  const [showLeavePageBlocker, setShowLeavePageBlocker] = useState(false);
  const [nextClientNo, setNextClientNo] = useState('');

  useEffect(() => {
    setSelectedClientNo(clientNo);
    sessionStorage.setItem(SESSION_STORAGE.CLIENT_PAGE, clientNo || '');
  }, [clientNo]);

  const defaultClientOption = clientOptions?.find(
    (option: any) => option.value === selectedClientNo
  );

  const handleConfirmClientChange = (accepted?: boolean) => {
    if (accepted && nextClientNo) {
      setValue('no', nextClientNo, { shouldDirty: true });
      setSelectedClientNo(nextClientNo);
    }
    setShowLeavePageBlocker(false);
    setNextClientNo('');
  };

  return (
    <>
      <LeavePageBlocker
        isOpen={showLeavePageBlocker}
        closeModal={handleConfirmClientChange}
      />
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
            <Controller
              name={'no'}
              rules={{ required: true }}
              render={() => (
                <SelectBase
                  isSearchable
                  isControlled
                  name={'no'}
                  options={clientOptions}
                  onChange={(option: any) => {
                    if (
                      sessionStorage.getItem(SESSION_STORAGE.IS_DIRTY) ===
                      'false'
                    ) {
                      setValue('no', option?.value, { shouldDirty: true });
                      setSelectedClientNo(option?.value);
                    } else {
                      setNextClientNo(option?.value);
                      setShowLeavePageBlocker(true);
                    }
                  }}
                  value={defaultClientOption}
                  hideSelected={false}
                />
              )}
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
    </>
  );
};

export default CardPageTopSection;
