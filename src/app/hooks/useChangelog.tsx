import { useParams } from 'react-router';
import { useProductDevelopmentChanges } from '../api/productDevelopment';
import { ChangelogDto, ProductDevelopmentChangelogDto } from '../generate';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import QueryKeysEnum from '../api/queryKeys';
import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';

function getChangelogForKey(
  changelogMap: ProductDevelopmentChangelogDto[] | undefined,
  key: string
): ChangelogDto[] {
  return changelogMap && changelogMap?.length
    ? changelogMap?.find(cm => cm.propertyName === key)?.changes ?? []
    : [];
}

export function useProductDevelopmentChangelog(key: string): ChangelogDto[] {
  const { no } = useParams();
  const { data: changelogMap } = useProductDevelopmentChanges(no ?? '', false);

  return getChangelogForKey(changelogMap, key);
}

export function useToggleProductDevelopmentChanges(no: string) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [showChanges, setShowChanges] = useState<boolean>(false);
  const { refetch: fetchChanges, isError } = useProductDevelopmentChanges(
    no,
    showChanges
  );

  useEffect(() => {
    if (showChanges) {
      fetchChanges();
    } else {
      queryClient.resetQueries([QueryKeysEnum.Changes]);
    }
  }, [fetchChanges, no, queryClient, showChanges]);

  useEffect(() => {
    if (isError) {
      setShowChanges(false);
      showToast({
        status: 'warning',
        description: t('PD.Feedback.Error.Changes'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { showChanges, setShowChanges };
}
