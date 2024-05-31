import { Row, flexRender } from '@tanstack/react-table';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Td, Tr } from '@chakra-ui/table';
import { COLORS } from '../../theme/Constants';
import { useLocation } from 'react-router';
import { Input, Tooltip } from '@chakra-ui/react';
import { Target, useLastVisited } from '../../app/hooks/useLastVisited';

export type TBodyRowProps<Data extends object> = {
  row: Row<Data>;
  bgColor?: string;
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
  onUpload?: (file: File) => void;
  acceptFileType?: string;
  tooltipMsg?: string;
  hoverBgColor?: string;
  id?: string;
  isLoading?: boolean;
};

export function TBodyRow<Data extends object>({
  row,
  bgColor,
  onClick,
  onUpload,
  tooltipMsg,
  hoverBgColor,
  id,
  isLoading,
  acceptFileType,
}: TBodyRowProps<Data>) {
  const location = useLocation();
  const ref = useRef<HTMLTableRowElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { lastVisited, setLastVisited } = useLastVisited(
    Target.PRODUCT_DEVELOPMENT
  );

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  useEffect(() => {
    if (!hasScrolled) {
      if (
        !!ref?.current &&
        id &&
        (location.hash === `#${id}` || id === lastVisited)
      ) {
        setTimeout(() => {
          ref?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          setHasScrolled(true);
          setLastVisited('');
        }, 100);
      }
    }
  }, [hasScrolled, location.hash, lastVisited, id, ref, setLastVisited]);

  const tRow = useMemo(() => {
    const handleDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.items;

      if (
        files.length === 1 &&
        files[0].kind === 'file' &&
        ((acceptFileType && files[0].type === acceptFileType) || false)
      ) {
        setIsDraggingOver(event.type === 'dragover');
      } else {
        setIsDraggingOver(false);
      }
    };
    const handleUpload = (file: File) => {
      setIsDraggingOver(false);
      onUpload && onUpload(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleUpload(files[0]);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e?.currentTarget;
      if (files && files[0]) {
        handleUpload(files[0]);
      }
    };

    return (
      <Tooltip
        display={'inline'}
        placement={'top'}
        label={tooltipMsg}
        isOpen={isDraggingOver}
        portalProps={{
          containerRef: ref,
        }}>
        <Tr
          ref={ref}
          id={id}
          pointerEvents={'auto'}
          bgColor={bgColor}
          onClick={e => onClick && onClick(e)}
          {...(onUpload && {
            onDragOver: handleDragEvent,
            onDragLeave: handleDragEvent,
            onDrop: handleDrop,
          })}
          _hover={{
            cursor: onClick ? 'pointer' : undefined,
            backgroundColor: COLORS.GRAY[20],
          }}
          _focusWithin={{ bg: hoverBgColor }}
          backgroundColor={isDraggingOver ? COLORS.GRAY[10] : 'inherit'}
          borderStyle={isDraggingOver ? 'dashed' : 'inherit'}>
          {onUpload && (
            <Td display={'none'}>
              <Input
                type="file"
                onChange={handleFileChange}
                ref={inputRef}
                multiple={false}
                display={'none'}
              />
            </Td>
          )}
          {row.getVisibleCells().map((cell, i) => {
            return (
              <Td key={i}>
                {flexRender(cell.column.columnDef.cell, {
                  ...cell.getContext(),
                  isLoading: isLoading,
                })}
              </Td>
            );
          })}
        </Tr>
      </Tooltip>
    );
  }, [
    acceptFileType,
    bgColor,
    hoverBgColor,
    id,
    isDraggingOver,
    isLoading,
    onClick,
    onUpload,
    row,
    tooltipMsg,
  ]);

  return tRow;
}
