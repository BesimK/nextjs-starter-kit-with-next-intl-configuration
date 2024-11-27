import clsx from 'clsx';
import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import './globals.css';
import {isRTL} from '@/i18n/config';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({children}: Props) {
  const locale = await getLocale();

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Best Way To Internationalize</title>
      </head>
      <body
        className={clsx(
          'flex min-h-[100vh] flex-col bg-slate-100',
          inter.className,
          {'rtl-layout': isRTL(locale)} // Add 'rtl-layout' if RTL
        )}
        dir={isRTL(locale) ? 'rtl' : 'ltr'}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
