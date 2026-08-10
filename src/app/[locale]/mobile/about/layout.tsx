// Bu sayfa artık /mobile'daki mini XP masaüstüne yönlendiriyor, kendi içeriği yok
// bu yüzden canonical de gerçek içeriğin bulunduğu /mobile'ı gösteriyor.
import { Metadata } from 'next';

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
