import { useParams } from 'react-router';
import { ChangelogDto, ChangelogItemDto, ChangelogType } from '../generate';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import QueryKeysEnum from '../api/queryKeys';
import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';
import { useChangelog } from '../api/changelog';

function getChangelogForKey(
  changelogMap: ChangelogDto[] | undefined,
  key: string
): ChangelogItemDto[] {
  return changelogMap && changelogMap?.length
    ? changelogMap?.find(cm => cm.propertyName === key)?.changes ?? []
    : [];
}

export function useProductDevelopmentChangelog(
  key: string
): ChangelogItemDto[] {
  const { no } = useParams();
  const { data: changelogMap } = useChangelog(
    no,
    ChangelogType.PRODUCT_DEVELOPMENT,
    undefined,
    false
  );

  return getChangelogForKey(changelogMap, key);
}
export function useProductionChangelog(
  key: string,
  id: string
): ChangelogItemDto[] {
  const { data: changelogMap } = useChangelog(
    undefined,
    ChangelogType.PRODUCTION,
    id,
    false
  );

  return getChangelogForKey(changelogMap, key);
}
export function useCalculationChangelog(key: string): ChangelogItemDto[] {
  const { no } = useParams();
  const { data: changelogMap } = useChangelog(
    no,
    ChangelogType.PRICE_CALCULATION,
    undefined,
    false
  );

  return getChangelogForKey(changelogMap, key);
}
export function useToggleChangelog(
  type: ChangelogType,
  no?: string,
  id?: string
) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [showChanges, setShowChanges] = useState<boolean>(false);
  const { refetch: fetchChanges, isError } = useChangelog(
    no,
    type,
    id,
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
