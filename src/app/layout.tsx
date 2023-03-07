import localFont from 'next/font/local';

import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Providers } from '@/providers';

import './globals.scss';

const gilroy = localFont({
  src: [
    {
      path: '../assets/fonts/Gilroy/Gilroy-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Extrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gilroy/Gilroy-Heavy.woff2',
      weight: '1000',
      style: 'normal',
    },
  ],
});

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html className={gilroy.className} lang='en'>
      <head />
      <body className='mainBody'>
        <Providers>
          <Sidebar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
