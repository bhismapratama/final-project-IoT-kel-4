'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

import api from '@/lib/api';
import { getToken } from '@/lib/cookies';
import useAuthStore from '@/stores/useAuthStore';
import { ApiResponse } from '@/types/api';
import { PermissionList } from '@/types/entities/permission-list';
import { User } from '@/types/entities/user';

import Loading from '../Loading';

async function getUser() {
  const res = await api.get<ApiResponse<User>>('/auth/user');
  return res.data.user;
}

type WithAuthProps = {
  user: User;
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  permissions: PermissionList,
) {
  function ComponentWithAuth(props: Omit<T, keyof WithAuthProps>) {
    const router = useRouter();

    const { user, isAuthed, isLoading, login, logout, stopLoading } =
      useAuthStore();

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        isAuthed && logout();
        stopLoading();
        return;
      }

      if (isAuthed) {
        stopLoading();
        return;
      }

      try {
        const newUser = await getUser();
        login({ ...newUser, token });
      } catch {
        logout();
      } finally {
        stopLoading();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed]);

    React.useEffect(() => {
      if (
        isLoading ||
        permissions.includes('all') ||
        (permissions.includes('authed') && isAuthed)
      ) {
        return;
      }

      if (
        !isAuthed ||
        (user && !permissions.every(p => user.permission.includes(p)))
      ) {
        toast.error('Anda tidak memiliki akses ke halaman ini');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed, isLoading]);

    React.useEffect(() => {
      checkAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loading />;
    else if (!isLoading && !isAuthed) {
      router.replace('/login');
      return;
    }
    return <Component {...(props as T)} user={user} />;
  }

  return ComponentWithAuth;
}
