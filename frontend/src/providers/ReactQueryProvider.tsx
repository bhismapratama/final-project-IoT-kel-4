'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import React from 'react';

import api from '@/lib/api';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
    const { data } = await api.get(`${queryKey?.[0]}`);
    return data;
  };

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
