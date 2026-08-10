import ClientHome from './ClientHome';
import { getTranslations } from 'next-intl/server';

// No page-level `metadata` export here on purpose: this page inherits the
// locale-aware title/description generated in `../layout.tsx`. A static
// override here would clobber that per-locale metadata with a single
// hardcoded (English-leaning) title/description for every locale.
export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return (
    <>
      {/* Visually hidden, but present in the server-rendered HTML so
          crawlers have real text content to index even before the
          client-only desktop UI mounts. */}
      <h1 className="sr-only">Üzeyir Talha Kılıç</h1>
      <p className="sr-only">{t('description')}</p>
      <ClientHome />
    </>
  );
} 