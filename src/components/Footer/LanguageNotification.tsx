"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface LanguageNotificationProps {
  onClose: () => void;
}

const LanguageNotification: React.FC<LanguageNotificationProps> = ({ onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('');

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Show notification immediately
    setIsVisible(true);
    
    // Get current locale from pathname
    const locale = pathname.split('/')[1];
    setCurrentLocale(locale);
  }, [pathname]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    
    // If selected language is different from current, navigate immediately
    if (language !== currentLocale) {
      // Get current path without locale
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
      const newPath = `/${language}${pathWithoutLocale}`;
      router.push(newPath);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Get opposite language translations
  const getOppositeLanguageText = () => {
    if (currentLocale === 'tr') {
      // Site Türkçe ise İngilizce metinler göster
      return {
        languageSelection: "Your computer might be at risk.",
        selectLanguage: "Select Language",
        turkish: "Turkish",
        english: "English"
      };
    } else {
      // Site İngilizce ise Türkçe metinler göster
      return {
        languageSelection: "Bilgisayarınız risk altında olabilir.",
        selectLanguage: "Dil Seçiniz",
        turkish: "Türkçe",
        english: "İngilizce"
      };
    }
  };

  const oppositeText = getOppositeLanguageText();

  if (!isVisible) return null;

  return (
    <div className={`language-balloon ${!isVisible ? 'fadeout' : ''}`}>
      <div className="language-balloon__container">
        <button 
          onClick={handleClose} 
          className="language-balloon__close clickable"
        />
        
        <div className="language-balloon__header">
          <Image
            src="/icons/229(16x16).png"
            alt="language"
            width={14}
            height={14}
            className="language-balloon__header__img"
          />
          <span style={{ color: 'black', fontFamily: 'Tahoma, sans-serif' }}>{oppositeText.languageSelection}</span>
        </div>
        
        <p className="language-balloon__text" style={{ color: 'black', fontFamily: 'Tahoma, sans-serif' }}>{oppositeText.selectLanguage}</p>
        
        {/* Language Options */}
        <div className="language-balloon__options">
          <label className="language-balloon__option clickable">
            <input
              type="radio"
              name="language"
              value="tr"
              checked={selectedLanguage === 'tr'}
              onChange={(e) => handleLanguageSelect(e.target.value)}
            />
            <span style={{ color: 'black', fontFamily: 'Tahoma, sans-serif' }}>{oppositeText.turkish}</span>
          </label>
          
          <label className="language-balloon__option clickable">
            <input
              type="radio"
              name="language"
              value="en"
              checked={selectedLanguage === 'en'}
              onChange={(e) => handleLanguageSelect(e.target.value)}
            />
            <span style={{ color: 'black', fontFamily: 'Tahoma, sans-serif' }}>{oppositeText.english}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LanguageNotification; 