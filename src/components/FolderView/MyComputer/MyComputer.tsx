import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { myComputerSidebarConfig, myComputerContentConfig } from './config';

interface MyComputerProps {
  onClose: () => void;
}

const MyComputer: React.FC<MyComputerProps> = () => {
  const t = useTranslations('folderView.myComputer');
  const tSidebar = useTranslations('folderView.sidebar');
  const tContent = useTranslations('folderView.contentGrid');
  const locale = useLocale();

  // Konfigürasyonları çevirilerle güncelle
  const localizedSidebarConfig = myComputerSidebarConfig.map(card => ({
    ...card,
    title: tSidebar(card.title),
    items: card.items.map(item => ({
      ...item,
      text: tSidebar(item.text)
    }))
  }));

  const localizedContentConfig = myComputerContentConfig.map(card => ({
    ...card,
    title: tContent(card.title),
    items: card.items.map(item => {
      // Handle CV link based on locale
      if (item.text === 'myCv') {
        return {
          ...item,
          text: tContent(item.text),
          // Remove href and add onClick for double-click functionality
          href: undefined,
          onClick: () => {
            const cvUrl = locale === 'tr' 
              ? '/pdfs/Üzeyir Talha Kılıç TR.pdf'
              : '/pdfs/Uzeyir Talha Kilic EN.pdf';
            window.open(cvUrl, '_blank', 'noopener,noreferrer');
          }
        };
      }
      return {
        ...item,
        text: item.href ? tContent(item.text) : tContent(item.text)
      };
    })
  }));

  // Function bar için özel butonlar
  const functionBarButtons = (
    <>
      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/back.png" alt="Back" width={30} height={30} />
        </span>
        <span className="function-button-text">{t('back')}</span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>

      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/forward.png" alt="Forward" width={30} height={30} />
        </span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/refresh.png" alt="Up" width={22} height={22} />
        </span>
      </button>

      <div className="function-separator"></div>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/ie-book.png" alt="Search" width={22} height={22} />
        </span>
        <span>{t('search')}</span>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/foldericon.png" alt="Folders" width={22} height={22} />
        </span>
        <span>{t('folders')}</span>
      </button>

      <div className="function-separator"></div>

      <button className="function-button">
        <span className="function-button-small-icon">☰</span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>
    </>
  );

  return (
    <BaseFolderView 
      functionBarButtons={functionBarButtons}
    >
      <BaseSidebar cards={localizedSidebarConfig} />
      <BaseContentGrid cards={localizedContentConfig} />
    </BaseFolderView>
  );
};

export default MyComputer; 