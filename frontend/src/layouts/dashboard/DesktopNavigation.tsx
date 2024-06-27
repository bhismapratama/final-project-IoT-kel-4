import * as React from 'react';

import NextImage from '@/components/NextImage';
import Navigation from '@/layouts/dashboard/Navigation';

export default function DesktopNavigation() {
  return (
    <div className='fixed bg-secondary-80 overflow-hidden lg:flex hidden min-h-full w-72 top-0'>
      {/*Sidebar Background*/}
      <NextImage
        src='/dashboard/sidebar.png'
        className='absolute w-full -z-10'
        width='1000'
        height='100'
        alt='sidebar-background'
      />
      <Navigation className='mt-6 flex w-full flex-col gap-6' />
    </div>
  );
}
