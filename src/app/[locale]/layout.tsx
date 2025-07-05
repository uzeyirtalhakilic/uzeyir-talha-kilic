import { type ReactNode } from "react";
import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';

// Define supported locales
const locales = ['en', 'tr'];

export const metadata: Metadata = {
  title: {
    default: 'Üzeyir Talha Kılıç - Software Developer',
    template: '%s | Üzeyir Talha Kılıç'
  },
  description: 'Üzeyir Talha Kılıç - Software Developer, Full Stack Developer, React, Next.js, TypeScript, Node.js',
  keywords: ['software developer', 'full stack developer', 'react', 'next.js', 'typescript', 'node.js', 'web development', 'frontend', 'backend'],
  authors: [{ name: 'Üzeyir Talha Kılıç' }],
  creator: 'Üzeyir Talha Kılıç',
  publisher: 'Üzeyir Talha Kılıç',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://uzeyirtalhakilic.dev',
    title: 'Üzeyir Talha Kılıç - Software Developer',
    description: 'Üzeyir Talha Kılıç - Software Developer, Full Stack Developer, React, Next.js, TypeScript, Node.js',
    siteName: 'Üzeyir Talha Kılıç',
    images: [
      {
        url: '/github-logo.png',
        width: 1200,
        height: 630,
        alt: 'Üzeyir Talha Kılıç',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Üzeyir Talha Kılıç - Software Developer',
    description: 'Üzeyir Talha Kılıç - Software Developer, Full Stack Developer, React, Next.js, TypeScript, Node.js',
    images: ['/github-logo.png'],
  },
  verification: {
    google: 'google77bf220c1b4bd1a2.html', // Google Search Console'dan alacağınız kod
  },
  alternates: {
    canonical: 'https://uzeyirtalhakilic.dev',
    languages: {
      'tr': 'https://uzeyirtalhakilic.dev/tr',
      'en': 'https://uzeyirtalhakilic.dev/en',
    },
  },
};

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  
  return (
    <html lang={locale}>
      <head>
        <link rel="canonical" href={`https://uzeyirtalhakilic.dev/${locale}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 