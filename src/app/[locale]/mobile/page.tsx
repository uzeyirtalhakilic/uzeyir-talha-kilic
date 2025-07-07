"use client";
import { useEffect } from 'react';
import MobileHome from '@/components/Mobile/MobileHome';

export default function MobileHomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const locale = window.location.pathname.split('/')[1];
      window.location.replace(`/${locale}`);
    }
  }, []);
  return <MobileHome />;
} 