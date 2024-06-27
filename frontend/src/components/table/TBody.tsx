'use client';
import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '../Typography';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  isLoading,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody
      className={clsxm('divide-typo-divider divide-y bg-white', className)}
      {...rest}
    >
      {isLoading ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-3 px-3 col-span-full text-typo-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            Loading...
          </td>
        </tr>
      ) : table.getRowModel().rows.length == 0 ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-3 px-3 col-span-full text-typo-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            No Data
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={clsxm(index % 2 === 0 ? 'bg-white' : 'bg-typo-light')}
          >
            {row.getVisibleCells().map(cell => {
              return (
                <Typography
                  key={cell.id}
                  variant='c2'
                  as='td'
                  className='truncate whitespace-nowrap py-2 px-3'
                  style={{ maxWidth: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
