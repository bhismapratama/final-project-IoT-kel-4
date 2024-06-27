'use client';

import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import UnstyledLink from '@/components/links/UnstyledLink';
import { navigations } from '@/constant/navigations';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/stores/useAuthStore';
import { PermissionList } from '@/types/entities/permission-list';
import type { Navigation } from '@/types/navigate';

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav
      className={clsxm(
        'h-screen w-full flex flex-col gap-2 items-center md:px-5',
        className,
      )}
      {...rest}
    >
      {/* <Logo className='w-32 md:pt-3 py-8 self-center' /> */}
      <div className='space-y-5 w-[85%] sm:px-0 px-10 sm:w-[40%] md:w-64 lg:w-full overflow-auto pb-16'>
        {navigations.map(nav =>
          nav.children ? (
            <NestedNavigation navigation={nav} key={nav.name} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          ),
        )}
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 50px;
          }
        `}</style>
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const pathname = usePathname();

  const { user } = useAuthStore();

  function getChildrenPermission(nav?: Navigation[]): PermissionList {
    return (
      nav?.flatMap(n => {
        const tempPermission: PermissionList = [];
        if (n.permissions) {
          tempPermission.push(...n.permissions);
        }
        if (n.children) {
          tempPermission.push(...getChildrenPermission(n.children));
        }
        return tempPermission;
      }) || []
    );
  }

  const navChildrenWithPermission = getChildrenPermission(navChildren.children);
  const hasPermission =
    navChildrenWithPermission && navChildrenWithPermission.length > 0
      ? navChildrenWithPermission.some(p => user?.permission?.includes(p))
      : true;

  if (!hasPermission) return null;


  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some(n => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? pathname === n.href
          : pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'hover:bg-white/10',
              'text-typo-white gap-2',
              'group flex w-full items-center rounded-md px-4 py-3 text-sm font-medium',
              'focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
            )}
          >
            {navChildren.icon && (
              <navChildren.icon
                className={clsx(
                  'mr-1.5 flex-shrink-0',
                  'text-typo-white text-lg',
                  open && 'mt-[1px] self-start',
                )}
                aria-hidden='true'
              />
            )}
            <span className={clsx('text-left', !open && 'truncate')}>
              {navChildren.name}
            </span>
            <FiChevronRight
              className={clsx(
                'flex-shrink-0',
                'text-typo-white ml-auto text-lg',
                open && 'mt-[1px] rotate-90 self-start',
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='pl-8 flex mt-0.5'>
            <div className='border-l-2 border-white my-1' />
            <div className='w-full'>
              {navChildren.children?.map(nav =>
                nav.children ? (
                  <NestedNavigation key={nav.name} navigation={nav} />
                ) : (
                  <NavigationLink key={nav.name} navigation={nav} />
                ),
              )}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = navigation.exactMatch
    ? pathname === navigation.href
    : pathname.startsWith(navigation.href);

  const { user } = useAuthStore();
  const hasPermission = navigation.permissions
    ? navigation.permissions?.some(p => user?.permission?.includes(p))
    : true;

  if (!hasPermission) return null;

  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive ? 'bg-primary-50' : 'hover:bg-white/10',
        'group my-0.5 flex items-center justify-start py-3 rounded-md px-4 text-sm font-medium',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {navigation.icon && (
        <navigation.icon
          className={clsx(
            isActive ? 'text-typo-dark' : 'text-white ',
            'mr-1.5 text-xl flex-shrink-0',
          )}
          aria-hidden='true'
        />
      )}
      <span
        className={clsxm(
          isActive ? 'text-typo-dark' : 'text-white',
          'truncate pl-1',
        )}
      >
        {navigation.name}
      </span>
    </UnstyledLink>
  );
}
