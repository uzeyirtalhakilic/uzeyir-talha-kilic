"use client";
import { useEffect } from 'react';
import MobileContact from '@/components/Mobile/contact/page';

export default function MobileContactPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const locale = window.location.pathname.split('/')[1];
      window.location.replace(`/${locale}`);
    }
  }, []);
  return <MobileContact />;
} 