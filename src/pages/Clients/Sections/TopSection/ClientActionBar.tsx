import { Button } from '@chakra-ui/react';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { useTranslation } from 'react-i18next';

type Props = {
  lastModified?: string;
  clientNo?: string;
};

const ClientActionBar = ({ lastModified, clientNo }: Props) => {
  const { t } = useTranslation();

  return (
    <ActionBarTemplate
      lastModifiedDate={lastModified}
      actionButtons={
        <Button
          isDisabled={!clientNo}
          variant={'primary'}
          rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}
          type="submit">
          {t('Common.Save')}
        </Button>
      }
    />
  );
};

export default ClientActionBar;
