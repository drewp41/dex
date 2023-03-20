import localFont from 'next/font/local';

export const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/Gilroy/Gilroy-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/Gilroy/Gilroy-Regular.woff2',
    //   weight: '400',
    //   style: 'normal',
    // },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Extrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy/Gilroy-Heavy.woff2',
      weight: '1000',
      style: 'normal',
    },
  ],
  declarations: [{ prop: 'ascent-override', value: '100%' }],
});
