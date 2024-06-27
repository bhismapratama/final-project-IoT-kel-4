'use client';
import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

import Typography from '../Typography';

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  return (
    <thead
      className={clsxm(
        'border-b text-typo-white border-gray-200 bg-secondary-80',
        className,
      )}
      {...rest}
    >
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th
              key={header.id}
              scope='col'
              className={clsxm(
                'group py-3 pr-3 text-left text-sm font-semibold sm:text-base',
                !omitSort && header.column.getCanSort() ? 'pl-4' : 'pl-[30px]',
              )}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={clsxm(
                    'relative flex items-center gap-2 py-1',
                    !omitSort && header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : '',
                  )}
                  onClick={
                    omitSort
                      ? () => null
                      : header.column.getToggleSortingHandler()
                  }
                >
                  {!omitSort &&
                  header.column.getCanSort() &&
                  !header.column.getIsSorted() ? (
                    <VscTriangleDown className='group-hover:fill-typo w-2 rotate-180' />
                  ) : (
                    {
                      asc: (
                        <VscTriangleDown className='fill-typo w-2 rotate-180' />
                      ),
                      desc: <VscTriangleDown className='fill-typo w-2' />,
                    }[header.column.getIsSorted() as string] ?? null
                  )}
                  <Typography variant='c2' color='white'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Typography>
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
