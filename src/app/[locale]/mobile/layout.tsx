import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    alternates: {
      canonical: `https://uzeyirtalhakilic.dev/${locale}/mobile`,
      languages: {
        tr: 'https://uzeyirtalhakilic.dev/tr/mobile',
        en: 'https://uzeyirtalhakilic.dev/en/mobile',
      },
    },
  };
}

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return (
    <>
      {/* Visually hidden, but present in the server-rendered HTML so
          crawlers have real text content to index even before the
          client-only mobile UI mounts. */}
      <h1 className="sr-only">Üzeyir Talha Kılıç</h1>
      <p className="sr-only">{t('description')}</p>
      {props.children}
    </>
  );
} 