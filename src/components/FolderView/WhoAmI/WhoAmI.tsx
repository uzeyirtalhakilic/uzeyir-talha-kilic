import React from "react";
import { useLocale } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { whoAmISidebarConfig, whoAmIContentConfig } from './config';

interface WhoAmIProps {
  onClose: () => void;
}

const WhoAmI: React.FC<WhoAmIProps> = () => {
  const locale = useLocale();
  
  // Dynamically generate content config based on locale
  const dynamicContentConfig = whoAmIContentConfig.map(card => ({
    ...card,
    items: card.items.map(item => {
      if (item.text === 'Resume.pdf') {
        return {
          ...item,
          href: locale === 'tr' 
            ? '/pdfs/Üzeyir Talha Kılıç TR.pdf'
            : '/pdfs/Uzeyir Talha Kilic EN.pdf'
        };
      }
      return item;
    })
  }));

  return (
    <BaseFolderView>
      <BaseSidebar cards={whoAmISidebarConfig} />
      <BaseContentGrid cards={dynamicContentConfig} />
    </BaseFolderView>
  );
};

export default WhoAmI; 