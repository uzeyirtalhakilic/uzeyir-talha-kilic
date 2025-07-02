import React, { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { createWhoAmISidebarConfig, createWhoAmIContentConfig } from './config';
import { ContentCard } from '../base/BaseContentGrid';
import AboutMeFile from './AboutMeFile';

interface WhoAmIProps {
  onClose: () => void;
}

const WhoAmI: React.FC<WhoAmIProps> = ({ onClose }) => {
  const locale = useLocale();
  const t = useTranslations('folderView.whoAmI');
  const t2 = useTranslations('desktop');
  const [showAboutMeFile, setShowAboutMeFile] = useState(false);
  
  // Dynamically generate content config based on locale
  const dynamicContentConfig = createWhoAmIContentConfig(t).map((card: ContentCard) => ({
    ...card,
    items: card.items.map((item: any) => {
      if (item.text === t('content.resume')) {
        return {
          ...item,
          href: locale === 'tr' 
            ? '/pdfs/Üzeyir Talha Kılıç TR.pdf'
            : '/pdfs/Uzeyir Talha Kilic EN.pdf'
        };
      }
      // Add onClick handler for about me item
      if (item.text === t('content.aboutMe')) {
        return {
          ...item,
          onClick: () => setShowAboutMeFile(true)
        };
      }
      return item;
    })
  }));

  // Custom address bar content for Who Am I
  const addressBarContent = (
    <div className="address-input">
      <span className="address-input-icon">
        <img src="/icons/folderdocument.png" alt="Who Am I" width={14} height={14} />
      </span>
      <div className="address-input-text">{t2('whoAmI') || 'Who Am I?'}</div>
      <span className="address-input-dropdown">▼</span>
    </div>
  );

  // If about me file is open, show it instead of the folder view
  if (showAboutMeFile) {
    return (
      <AboutMeFile onClose={() => setShowAboutMeFile(false)} />
    );
  }

  return (
    <BaseFolderView addressBarContent={addressBarContent}>
      <BaseSidebar cards={createWhoAmISidebarConfig(t)} />
      <BaseContentGrid cards={dynamicContentConfig} />
    </BaseFolderView>
  );
};

export default WhoAmI; 