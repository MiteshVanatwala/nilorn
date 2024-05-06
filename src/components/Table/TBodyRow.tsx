import { Row, flexRender } from '@tanstack/react-table';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Td, Tr } from '@chakra-ui/table';
import { COLORS } from '../../theme/Constants';
import { useLocation } from 'react-router';
import { Input, Tooltip } from '@chakra-ui/react';

export type TBodyRowProps<Data extends object> = {
  row: Row<Data>;
  bgColor?: string;
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
  onUpload?: (file: File) => void;
  tooltipMsg?: string;
  hoverBgColor?: string;
  id?: string;
};

export function TBodyRow<Data extends object>({
  row,
  bgColor,
  onClick,
  onUpload,
  tooltipMsg,
  hoverBgColor,
  id,
}: TBodyRowProps<Data>) {
  const location = useLocation();
  const ref = useRef<HTMLTableRowElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  useEffect(() => {
    if (!!ref?.current && id && location.hash === `#${id}`) {
      ref.current.scrollIntoView({ block: 'start', inline: 'center' });
      location.hash = '';
    }
  }, [location, id]);

  const handleDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(event.type === 'dragover');
  };

  const tRow = useMemo(() => {
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
        isOpen={isDraggingOver}>
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
            <Input
              type="file"
              onChange={handleFileChange}
              ref={inputRef}
              multiple={false}
              display={'none'}
            />
          )}
          {row.getVisibleCells().map((cell, i) => {
            return (
              <Td key={i}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            );
          })}
        </Tr>
      </Tooltip>
    );
  }, [
    bgColor,
    hoverBgColor,
    id,
    isDraggingOver,
    onClick,
    onUpload,
    row,
    tooltipMsg,
  ]);

  return tRow;
}
