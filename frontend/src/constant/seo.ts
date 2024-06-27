import type { Metadata } from 'next';

// TODO: ADJUST CONFIGURATION FOR PRODUCTION

const config: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'KEL 4', template: '%s | KEL 4' },
  description:
    'KEL 4',
  openGraph: {
    url: 'http://localhost:3000',
    title: 'KEL 4',
    description:
      'KEL 4',
    siteName: 'KEL 4',
    images: [{ url: '/images/og.jpeg' }],
    type: 'website',
    locale: 'in_ID',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kel_4',
    title: 'KEL 4',
    description:
      'KEL 4',
    site: 'http://localhost:3000',
    images: [{ url: '/images/og.jpeg' }],
  },
  keywords: ['KEL 4'],
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
  ],
};

export default config;
