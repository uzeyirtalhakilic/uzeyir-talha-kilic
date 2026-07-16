"use client";
import { useEffect } from 'react';
import MobileExperience from '@/components/Mobile/experience/page';

export default function MobileExperiencePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const locale = window.location.pathname.split('/')[1];
      window.location.replace(`/${locale}`);
    }
  }, []);
  return <MobileExperience />;
}
