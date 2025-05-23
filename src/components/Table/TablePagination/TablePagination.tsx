import { HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS, SPACE } from '../../../theme/Constants';
import PaginationButton from './PaginationButton';
import { createRangeArray } from '../../../app/utils/common';

type Props = {
  pageNumber: number;
  totalNumPages: number;
  totalCount: number;
  currentPageSize: number;
  chunkSizes: number[];
  nextHandler: () => void;
  previousHandler: () => void;
  pageNumberHandler: (page: number) => void;
  pageSizeHandler: (chunk: number) => void;
};

const TablePagination = ({
  pageNumber: currentPage,
  totalNumPages,
  totalCount: totalRecords,
  currentPageSize: currentChunkSize,
  chunkSizes,
  nextHandler,
  previousHandler,
  pageNumberHandler: currentPageHandler,
  pageSizeHandler: chunkSizeHandler,
}: Props) => {
  const { t } = useTranslation();
  const rangeLength = totalNumPages < 5 ? totalNumPages : 5;
  let [rangeStart, setRangeStart] = useState(1);
  const rangeEnd = rangeStart + (rangeLength - 1);

  useEffect(() => {
    if (currentPage > rangeEnd) {
      setRangeStart(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalNumPages]);

  const moveRangeLower = () => {
    if (rangeStart > 1) {
      setRangeStart(current => current - 1);
    }
  };
  const moveRangeHigher = () => {
    if (rangeEnd < totalNumPages) {
      setRangeStart(current => current + 1);
    }
  };
  const showStart = () => {
    setRangeStart(1);
  };
  const showEnd = () => {
    setRangeStart(totalNumPages - (rangeLength - 1));
  };
  const setChunkSize = (size: number) => {
    const newTotalPages = Math.ceil(totalRecords / size);
    if (currentPage > newTotalPages) {
      currentPageHandler(newTotalPages);
    }
    if (rangeLength > newTotalPages) {
      setRangeStart(1);
    }
    chunkSizeHandler(size);
  };

  return (
    <HStack
      position={'sticky'}
      bottom={0}
      paddingX={SPACE.SM}
      width={'100%'}
      height={'3.5rem'}
      zIndex={2}
      bgColor={COLORS.GRAY[80]}
      justifyContent={'space-between'}>
      {/* LEFT */}
      <HStack gap={SPACE.XL}>
        <Text color={COLORS.WHITE} flex={1}>{`${t('Common.Page')} ${
          totalNumPages !== 0 ? currentPage : 0
        } ${t('Common.Of')} ${totalNumPages}`}</Text>
        <Text whiteSpace={'nowrap'} color={COLORS.WHITE} flex={1}>{`${t(
          'Common.NumberOfHits'
        )}  ${totalRecords}`}</Text>
      </HStack>

      {/* CENTER */}
      {totalNumPages > 1 && (
        <HStack height={'100%'} spacing={0} flex={1}>
          <PaginationButton
            onClick={() => {
              if (currentPage !== 1) {
                previousHandler();
                if (currentPage === rangeStart) moveRangeLower();
              }
            }}
            disabled={currentPage === 1}>
            {t('Common.Previous')}
          </PaginationButton>

          <PaginationButton
            disabled={rangeStart === 1}
            onClick={showStart}
            width={'3.5rem'}>
            {'...'}
          </PaginationButton>

          <PaginationButton
            disabled={totalNumPages <= rangeLength || rangeStart === 1}
            onClick={moveRangeLower}>
            {'<'}
          </PaginationButton>

          {createRangeArray(
            rangeStart,
            rangeEnd > totalNumPages ? totalNumPages : rangeEnd
          ).map((num, i) => {
            return (
              <PaginationButton
                key={'currentPage-' + i}
                onClick={() => currentPageHandler(num)}
                width={'3.5rem'}
                active={num === currentPage}>
                {`${num}`}
              </PaginationButton>
            );
          })}

          <PaginationButton
            disabled={
              totalNumPages <= rangeLength || rangeEnd === totalNumPages
            }
            onClick={moveRangeHigher}>
            {'>'}
          </PaginationButton>

          <PaginationButton
            disabled={rangeEnd === totalNumPages}
            onClick={showEnd}
            width={'3.5rem'}>
            {'...'}
          </PaginationButton>

          <PaginationButton
            onClick={() => {
              if (currentPage !== totalNumPages) {
                nextHandler();
                if (currentPage === rangeEnd) moveRangeHigher();
              }
            }}
            disabled={currentPage === totalNumPages}>
            {t('Common.Next')}
          </PaginationButton>
        </HStack>
      )}

      {/* RIGHT */}
      <HStack height={'100%'} spacing={0} flex={1} justifyContent={'flex-end'}>
        <Text color={COLORS.WHITE} pr={'1.2rem'}>{`${t(
          'Common.RowsPerPage'
        )}`}</Text>
        {chunkSizes.map((size, i) => {
          return (
            <PaginationButton
              disabled={totalNumPages < 1}
              key={'chunksize-' + i}
              onClick={() => setChunkSize(size)}
              width={'4rem'}
              active={currentChunkSize === size}>
              {`${size}`}
            </PaginationButton>
          );
        })}
      </HStack>
    </HStack>
  );
};

export default TablePagination;
