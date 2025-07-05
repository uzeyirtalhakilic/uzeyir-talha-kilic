"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Desktop from "@/components/Desktop/Desktop";
import MobileHome from "@/components/Mobile/MobileHome";
import { useTranslations } from 'next-intl';


export default function LocalePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('loading');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsLoading(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black relative">
        <Image
          src="/wallpapers/xp-bliss-placeholder.jpeg"
          alt="XP Bliss Placeholder"
          fill
          className="object-cover absolute inset-0 z-0"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
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