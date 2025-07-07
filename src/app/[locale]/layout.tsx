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
  metadataBase: new URL('https://uzeyirtalhakilic.dev'),
  title: {
    default: 'Üzeyir Talha Kılıç',
    template: '%s | Üzeyir Talha Kılıç'
  },
  description: 'Üzeyir Talha Kılıç - Software Developer',
  keywords: [
    'software developer', 'full stack developer', 'react', 'next.js', 'typescript', 'node.js', 'web development', 'frontend', 'backend', "üzeyir", "talha", "kılıç",
    'windows xp', 'winamp', 'paint', 'gta vice city', 'gta türk', 'özgeçmiş', 'cv', 'resume', 'linkedin', 'github', 'udemy', 'sertifika', "üzeyir talha", "üzeyir kılıç", "talha kılıç", "üzeyir talha kılıç",
    'veteriner klinik yönetim sistemi', 'restoran yönetim sistemi', 'toptancı mobil uygulaması', 'courier tracking', 'sentiment analysis', 'machine learning', 'data science',
    'portfolio', 'kişisel web sitesi', 'klasik masaüstü', 'klasik windows', 'klasik ikonlar', 'klasik sesler', 'responsive', 'multilingual', 'next.js 14', 'tailwind css', 'react', 'typescript',
    'web developer', 'yazılım geliştirici', 'full stack', 'frontend', 'backend', 'personal website', 'classic desktop', 'classic icons', 'classic sounds', 'responsive design', 'multilingual',
    'portfolio', 'projects', 'blog', 'contact', 'iletişim', 'hakkımda', 'about me', 'readme', 'recycle bin', 'control panel', 'my computer', 'my projects', 'who am i', 'hobbies',
    'notepad', 'solitaire', 'spider', 'freecell', 'pinball', 'minesweeper', 'explorer', 'internet explorer', 'excel', 'powerpoint', 'word', 'mail', 'outlook', 'usb', 'network',
    'printer', 'sound', 'narrator', 'risk', 'security', 'history', 'restart', 'restore', 'start', 'stop', 'up', 'view info', 'windows', 'xp', 'msn'
  ],
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
    title: 'Üzeyir Talha Kılıç',
    description: 'Üzeyir Talha Kılıç - Software Developer',
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
    title: 'Üzeyir Talha Kılıç',
    description: 'Üzeyir Talha Kılıç - Software Developer',
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
        <link rel="icon" href="/icons/favicon.png" />
        <link rel="apple-touch-icon" href="/icons/favicon.png" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-QT8JTGK0GF`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QT8JTGK0GF');
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