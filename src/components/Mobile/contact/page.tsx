"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";

const MobileContactPage: React.FC = () => {
  const t = useTranslations('mobile');
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleBackToHome = () => {
    router.push(`/${currentLocale}`);
  };

  const contactItems = [
    {
      icon: '/icons/mobile-mail.png',
      text: t('contact.email'),
      href: 'https://mail.google.com/mail/?view=cm&to=kilicuzeyirtalha@gmail.com',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      icon: '/icons/mobile-linkedin.png',
      text: t('contact.linkedin'),
      href: 'https://linkedin.com/in/uzeyirtalhakilic',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      icon: '/mobile-github-logo.png',
      text: t('contact.github'),
      href: 'https://github.com/uzeyirtalhakilic',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      icon: '/icons/mobile-instagram.png',
      text: t('contact.instagram'),
      href: 'https://instagram.com/uzeyirtalhakilic',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  ];

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
            {t('menu.contact')}
          </h1>
        </div>
        
        <div className="w-full max-w-md flex-1">
          <div className="space-y-4">
            {contactItems.map((item, index) => (
              <div 
                key={index}
                className="mobile-project-item clickable"
                onClick={() => {
                  if (item.href) {
                    window.open(item.href, item.target || '_blank', item.rel);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="project-icon">
                    <Image 
                      src={item.icon} 
                      alt={item.text}
                      width={24} 
                      height={24} 
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <span className="project-text font-press-start">{item.text}</span>
                  <span className="project-link">🔗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileContactPage; 