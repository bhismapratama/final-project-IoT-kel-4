import { RowData, Table } from '@tanstack/react-table';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Button from '@/components/Button';

type PaginationProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export function PaginationCount<T extends RowData>({
  table,
}: PaginationProps<T>) {
  return (
    <div className='flex gap-x-2'>
      <span className='flex items-center gap-1 whitespace-nowrap text-cwhite'>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <select
        className='w-full rounded-lg'
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 15, 20, 25].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PaginationControl<T extends RowData>({
  table,
}: PaginationProps<T>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const getButtonClass = (buttonIndex: number) => {
    let baseClass =
      'bg-white border-[1px] border-[#E4E7EB] drop-shadow active:border-[#E4E7EB] hover:bg-success-40 hover:text-white active:bg-success-40 disabled:brightness-100';
    if (pageIndex === buttonIndex) {
      baseClass += ' bg-success-40 text-white ';
    }
    if (buttonIndex >= pageCount) {
      baseClass +=
        ' disabled:bg-white disabled:hover:bg-white disabled:text-[#D1D5DC] disabled:hover:text-[#D1D5DC]';
    }
    return baseClass;
  };

  return (
    <div className='flex items-center justify-end gap-x-2 py-6 font-epliogue text-base font-medium text-[#687083]'>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className='w-[40px] h-[40px] bg-white border-[1px] border-[#E4E7EB] active:border-[#E4E7EB] drop-shadow hover:bg-success-40 hover:text-white disabled:text-[#D1D5DC] active:bg-success-40 disabled:bg-white disabled:hover:bg-white disabled:brightness-100'
      >
        <FaChevronLeft />
      </Button>
      {Array.from({ length: pageCount }, (_, index) => (
        <Button
          key={index}
          onClick={() => table.setPageIndex(index)}
          disabled={index >= pageCount}
          className={getButtonClass(index)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className='w-[40px] h-[40px] bg-white border-[1px] border-[#E4E7EB] drop-shadow active:border-[#E4E7EB] hover:bg-success-40 hover:text-white disabled:text-[#D1D5DC] active:bg-success-40 disabled:bg-white disabled:hover:bg-white disabled:brightness-100'
      >
        <FaChevronRight />
      </Button>
    </div>
  );
}
