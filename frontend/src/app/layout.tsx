import '../styles/globals.css';

import { Anton, Epilogue } from 'next/font/google';

import clsxm from '@/lib/clsxm';
import Providers from '@/providers';

const epilogue = Epilogue({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-epilogue',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={clsxm(epilogue.variable, anton.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
