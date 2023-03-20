import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Providers } from '@/providers';
import { gilroy } from '@/utils/fonts';

import './globals.scss';

interface IRootLayout {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Swap Aggregator',
  description: 'Dex aggregator',
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg' },
  },
};

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html className={gilroy.className} lang='en'>
      <head />
      <body>
        <Providers>
          <div className='main-body'>
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
