import {
  HiOutlineHome,
} from 'react-icons/hi';

import { Navigation } from '@/types/navigate';

export const navigations: Navigation[] = [
  {
    name: 'Home',
    href: '/dashboard',
    exactMatch: true,
    icon: HiOutlineHome,
    permissions: ['authed'],
  },
];