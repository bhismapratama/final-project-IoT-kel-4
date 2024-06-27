'use client';

import { Dialog, Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';

import Button from '@/components/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import Navigation from '@/layouts/dashboard/Navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function MobileNavigation() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <>
      <div className='w-full sticky px-10 h-20 top-0 bg-white shadow-md z-10 flex flex-shrink-0 justify-end'>
        {/* <button
          type='button'
          className='lg:hidden text-typo-icons  focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-main'
          onClick={() => setSidebarOpen(true)}
        >
          <HiOutlineMenu
            className='h-6 w-6 text-secondary-60'
            aria-hidden='true'
          />
        </button> */}
        <div className='flex items-center'>
          {/* Profile dropdown */}
          <Menu as='div' className='relative'>
            <div>
              <Menu.Button className='group max-w-[200px] rounded-md text-left text-sm font-medium text-gray-700 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:ring-offset-gray-100'>
                <div className='flex w-full items-center justify-between gap-2 p-2'>
                  <NextImage
                    src='/dashboard/arlo.png'
                    width={40}
                    height={40}
                    alt='avatar'
                  />
                  <Typography variant='c2' className='px-3'>
                    Kel 4 Jaya
                  </Typography>
                  <FiChevronDown
                    className='h-5 w-5 flex-shrink-0 text-typo-dark group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={React.Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-4 w-48 z-50 backdrop-blur origin-top-right divide-y divide-gray-200 rounded-md bg-background-liteCream shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-3'>
                  <Typography className='text-neutral-1000 text-[14px] flex justify-center' weight='bold'>
                    Kel 4 Jaya
                  </Typography>
                </div>
                {/* //! Don't forget to adjust UserAction component */}
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={clsx(
                          active
                            ? 'bg-gray-100 text-danger-main'
                            : 'text-danger-main',
                          'w-full px-4 py-2 text-left text-sm',
                          'flex items-center gap-1.5',
                        )}
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Navigation Dialog */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* <Dialog.Overlay className='fixed inset-0 bg-opacity-75' /> */}
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex max-w-full flex-1 flex-col justify-start pb-4'>
              <NextImage
                src='/dashboard/sidebar.png'
                className='absolute w-full h-full -z-10'
                width='1000'
                height='500'
                alt='sidebar-background'
              />
              <div className='h-fit flex justify-center pt-7 md:pt-10'>
                <Navigation
                  onClick={() => setSidebarOpen(false)}
                  className='h-fit'
                />
              </div>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Button
                  className='hover:bg-transparent mt-10 bg-transparent w-fit self-center active:bg-transparent'
                  onClick={() => setSidebarOpen(false)}
                >
                  <AiOutlineCloseCircle className='text-5xl text-typo-white' />
                </Button>
              </Transition.Child>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
