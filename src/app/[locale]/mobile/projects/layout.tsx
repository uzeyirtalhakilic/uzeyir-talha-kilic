// Bu sayfa artık /mobile'daki mini XP masaüstüne yönlendiriyor, kendi içeriği yok
// bu yüzden canonical de gerçek içeriğin bulunduğu /mobile'ı gösteriyor.
export const metadata = {
  alternates: {
    canonical: 'https://uzeyirtalhakilic.dev/tr/mobile',
    languages: {
      tr: 'https://uzeyirtalhakilic.dev/tr/mobile',
      en: 'https://uzeyirtalhakilic.dev/en/mobile',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
