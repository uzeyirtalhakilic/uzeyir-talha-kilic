"use client";
import { useEffect } from 'react';
import MobileProjects from '@/components/Mobile/projects/page';

export default function MobileProjectsPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const locale = window.location.pathname.split('/')[1];
      window.location.replace(`/${locale}`);
    }
  }, []);
  return <MobileProjects />;
} 