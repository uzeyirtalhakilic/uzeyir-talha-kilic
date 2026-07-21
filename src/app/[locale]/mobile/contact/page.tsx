"use client";
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// İletişim bilgileri artık mini XP masaüstündeki "Ben Kimim?" penceresinin
// kenar çubuğunda; bu sayfa oraya yönlendirir.
export default function MobileContactPage() {
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    router.replace(`/${params.locale}/mobile`);
  }, [router, params.locale]);
  return null;
}
