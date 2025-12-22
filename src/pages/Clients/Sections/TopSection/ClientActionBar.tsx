import { Button } from '@chakra-ui/react';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';

const ClientActionBar = () => {
  const { t } = useTranslation();
  const clientNo = useWatch({ name: 'no' });
  const lastModified = useWatch({ name: 'lastModified' });
  return (
    <ActionBarTemplate
      lastModifiedDate={lastModified}
      actionButtons={
        <>
          {clientNo && (
            <Button
              isDisabled={!clientNo}
              variant={'primary'}
              rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}
              type="submit">
              {t('Common.Save')}
            </Button>
          )}
        </>
      }
    />
  );
};

export default ClientActionBar;
