"use client";
import { useEffect } from 'react';
import MobileAbout from '@/components/Mobile/about/page';

export default function MobileAboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const locale = window.location.pathname.split('/')[1];
      window.location.replace(`/${locale}`);
    }
  }, []);
  return <MobileAbout />;
} 