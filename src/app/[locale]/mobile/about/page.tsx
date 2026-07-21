"use client";
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// İçerik artık mini XP masaüstündeki "Ben Kimim?" penceresinde; bu sayfa oraya yönlendirir.
export default function MobileAboutPage() {
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    router.replace(`/${params.locale}/mobile`);
  }, [router, params.locale]);
  return null;
}
