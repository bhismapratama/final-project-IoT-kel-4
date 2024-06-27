import * as React from 'react';

import clsxm from '@/lib/clsxm';

type CellProps = {
  children?: React.ReactNode;
  className?: string;
  cols?: string;
  colsSm?: string;
  colsMd?: string;
  colsLg?: string;
  colsXl?: string;
  rows?: string;
  rowsSm?: string;
  rowsMd?: string;
  rowsLg?: string;
  rowsXl?: string;
};

export default function Cell({
  children,
  className,
  cols = 'auto-full',
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  rows,
  rowsSm,
  rowsMd,
  rowsLg,
  rowsXl,
  ...rest
}: CellProps) {
  const cn = [];

  if (cols) cn.push(`_cols-${cols}`);
  if (colsSm) cn.push(`sm:_cols-${colsSm}`);
  if (colsMd) cn.push(`md:_cols-${colsMd}`);
  if (colsLg) cn.push(`lg:_cols-${colsLg}`);
  if (colsXl) cn.push(`xl:_cols-${colsXl}`);

  if (rows) cn.push(`_rows-${rows}`);
  if (rowsSm) cn.push(`sm:_rows-${rowsSm}`);
  if (rowsMd) cn.push(`md:_rows-${rowsMd}`);
  if (rowsLg) cn.push(`lg:_rows-${rowsLg}`);
  if (rowsXl) cn.push(`xl:_rows-${rowsXl}`);

  return (
    <div className={clsxm(cn, className)} {...rest}>
      {children}
    </div>
  );
}
