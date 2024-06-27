'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSolidLock, BiSolidUser } from 'react-icons/bi';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Typography from '@/components/Typography';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import useAuthStore from '@/stores/useAuthStore';
import { ApiResponse } from '@/types/api';
import { LoginRequest, LoginResponse } from '@/types/entities/login';
import { User } from '@/types/entities/user';

export default function LoginForm() {
  const router = useRouter();
  const methods = useForm<LoginRequest>();

  const { login } = useAuthStore();

  const { mutate: handleLogin, isPending } = useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async data => {
      const res = await api.post<LoginResponse>('/auth/login', data, {
        toastify: true,
      });
      const token = res.data.token;
      setToken(token);

      const user = await api.get<ApiResponse<User>>('/auth/user');
      if (user) login({ ...user.data.user, token });

      return res.data;
    },
    onSuccess: () => router.push('/admin'),
  });

  const onSubmit = (data: LoginRequest) => handleLogin(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-2'>
          <Input
            id='email'
            label='Username'
            leftIcon={BiSolidUser}
            placeholder='kel4@gmail.com'
            helperText='Username berupa email'
          />
          <div className='space-y-1'>
            <Input
              type='password'
              id='password'
              label='Password'
              leftIcon={BiSolidLock}
              placeholder='kel4jayajayajaya'
            />
            <Typography variant='c1' className='underline'>
              <Link href='/forgot-password'>Lupa password?</Link>
            </Typography>
          </div>
        </div>

        <Button
          type='submit'
          variant='success'
          className='w-full bg-green-400 hover:bg-green-500 active:bg-green-700 py-2 md:py-0'
          textClassName='text-white'
          isLoading={isPending}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
