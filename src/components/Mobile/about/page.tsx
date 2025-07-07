"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

const MobileAboutPage: React.FC = () => {
  const t = useTranslations('mobile');
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleBackToHome = () => {
    router.push(`/${currentLocale}`);
  };

  return (
    <div className="min-h-screen retro-black-bg">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleBackToHome}
          className="w-10 h-10 bg-black border-2 border-green-400 flex items-center justify-center hover:bg-green-900 hover:border-green-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]"
        >
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="text-center w-full max-w-md mt-8">
          <h1 className="retro-welcome font-bold mb-4 text-lg">
            {t('menu.aboutMe')}
          </h1>
        </div>
        
        <div className="mobile-content w-full max-w-md flex-1">
          <div className="text-green-400 text-left text-xs leading-5 whitespace-pre-line px-1 py-">
            {t('aboutme')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAboutPage; 