"use client";
export const metadata = {
  title: 'Üzeyir Talha Kılıç',
  description: 'Üzeyir Talha Kılıç - Software Developer',
};

import { useEffect, useState } from "react";
import Desktop from "@/components/WindowsXP/Desktop/Desktop";
import MobileHome from "@/components/Mobile/MobileHome";
import { useTranslations } from 'next-intl';


export default function LocalePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('loading');

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouchDevice);
      setIsLoading(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex items-center justify-center">
          <span
            className="text-white text-2xl font-bold drop-shadow-lg px-6 py-3 rounded-lg"
            style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
          >
            {t('loading')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <MobileHome />
        </>
      ) : (
        <Desktop />
      )}
    </>
  );
} 