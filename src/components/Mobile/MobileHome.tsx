"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

const MobileHome: React.FC = () => {
  const t = useTranslations('mobile');
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (locale: string) => {
    if (locale !== currentLocale) {
      router.push(`/${locale}`);
    }
  };

  const handleResumeClick = () => {
    const pdfFileName = currentLocale === 'tr' 
      ? 'Üzeyir Talha Kılıç TR.pdf'
      : 'Uzeyir Talha Kilic EN.pdf';
    
    const pdfUrl = `/pdfs/${pdfFileName}`;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 retro-black-bg">
      {/* Retro Welcome Text */}
      <div className="text-center mb-8">
        <h1 className="retro-welcome font-bold mb-2">
          {t('welcome')}
        </h1>
        <p className="text-green-400/50 text-xs mb-4 font-press-start">
          {currentLocale === 'tr' ? '(Masaüstü versiyonunu da denemelisiniz..)' : '(You should also try the desktop version..)'}
        </p>
        <div className="language-options">
          <div 
            className={`language-option ${currentLocale === 'tr' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('tr')}
          >
            {t('language.tr')}
          </div>
          <div 
            className={`language-option ${currentLocale === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            {t('language.en')}
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="mobile-menu text-center">
        <div className="mobile-menu-item" onClick={() => router.push(`/${currentLocale}/mobile/about`)}>
          {t('menu.aboutMe')}
        </div>
        <div className="mobile-menu-item" onClick={handleResumeClick}>
          {t('menu.resume')}
        </div>
        <div className="mobile-menu-item" onClick={() => router.push(`/${currentLocale}/mobile/experience`)}>
          {t('menu.experience')}
        </div>
        <div className="mobile-menu-item" onClick={() => router.push(`/${currentLocale}/mobile/projects`)}>
          {t('menu.projects')}
        </div>
        <div className="mobile-menu-item" onClick={() => router.push(`/${currentLocale}/mobile/contact`)}>
          {t('menu.contact')}
        </div>
      </div>
    </div>
  );
};

export default MobileHome; 