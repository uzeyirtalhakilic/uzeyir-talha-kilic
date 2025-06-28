import {use} from 'react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import Desktop from "@/components/Desktop/Desktop";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'layout'});

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = use(params);
  
  // Enable static rendering
  setRequestLocale(locale);
  
  // Trigger new deployment to fix ESLint error
  return <Desktop />;
}
