import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastProvider from '@/providers/ToastProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </ReactQueryProvider>
  );
}
