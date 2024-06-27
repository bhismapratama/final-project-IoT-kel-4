import * as React from 'react';

import clsxm from '@/lib/clsxm';

interface GridProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
  screenHeight?: boolean;
}

export default function Grid({
  children,
  className,
  screenHeight = false,
  ...rest
}: GridProps) {
  const baseCN = `
    grid

    grid-cols-4
    gap-x-4
    px-4

    sm:grid-cols-4
    sm:px-6
    sm:gap-x-4

    md:grid-cols-12
    md:px-[100px]
    md:gap-x-4

    relative
    place-content-start

    ${screenHeight ? 'min-h-screen' : ''}
  `;

  return (
    <div className={clsxm(baseCN, className)} {...rest}>
      {children}
    </div>
  );
}
