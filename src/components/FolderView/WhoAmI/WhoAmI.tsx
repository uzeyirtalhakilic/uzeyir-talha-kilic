import React, { useContext } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { createWhoAmISidebarConfig, createWhoAmIContentConfig } from './config';
import { ContentCard, ContentItem } from '../base/BaseContentGrid';
import { DesktopContext } from '../../Desktop/Desktop';
import { FileItems } from '../../../data/filesystem';

interface WhoAmIProps {
  onClose: () => void;
}

const WhoAmI: React.FC<WhoAmIProps> = () => {
  const locale = useLocale();
  const t = useTranslations('folderView.whoAmI');
  const t2 = useTranslations('desktop');
  const desktopContext = useContext(DesktopContext);

  // Dynamically generate content config based on locale
  const dynamicContentConfig = createWhoAmIContentConfig(t).map((card: ContentCard) => ({
    ...card,
    items: card.items.map((item: ContentItem) => {
      if (item.text === t('content.resume')) {
        return {
          ...item,
          // Remove href and add onClick for double-click functionality
          href: undefined,
          onClick: () => {
            const resumeUrl = locale === 'tr' 
              ? '/pdfs/Üzeyir Talha Kılıç TR.pdf'
              : '/pdfs/Uzeyir Talha Kilic EN.pdf';
            window.open(resumeUrl, '_blank', 'noopener,noreferrer');
          }
        };
      }
      // Add onClick handler for about me item
      if (item.text === t('content.aboutMe')) {
        return {
          ...item,
          onClick: () => {
            if (desktopContext) {
              const aboutMeItem = FileItems.find(i => i.id === 'about-me-txt');
              if (aboutMeItem) desktopContext.handleOpen(aboutMeItem);
            }
          }
        };
      }
      // Add onClick handler for my projects item
      if (item.text === t('myProjects')) {
        return {
          ...item,
          onClick: () => {
            if (desktopContext) {
              const myProjectsItem = FileItems.find(i => i.id === 'my-projects');
              if (myProjectsItem) desktopContext.handleOpen(myProjectsItem);
            }
          }
        };
      }

      return item;
    })
  }));

  // Custom address bar content for Who Am I
  const addressBarContent = (
    <div className="address-input">
      <span className="address-input-icon">
        <Image src="/icons/folderdocument.png" alt="Who Am I" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
      </span>
      <div className="address-input-text">{t2('whoAmI') || 'Who Am I?'}</div>
      <span className="address-input-dropdown">▼</span>
    </div>
  );

  return (
    <BaseFolderView addressBarContent={addressBarContent}>
      <BaseSidebar cards={createWhoAmISidebarConfig(t)} />
      <BaseContentGrid cards={dynamicContentConfig} />
    </BaseFolderView>
  );
};

export default WhoAmI; 