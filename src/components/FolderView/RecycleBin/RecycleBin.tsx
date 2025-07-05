import React, { useState, useContext, useRef } from "react";
import Image from "next/image";
import { BaseFolderView, BaseSidebar } from '../base';
import { recycleBinSidebarConfig, recycleBinContentConfig } from './config';
import { useTranslations } from 'next-intl';
import { DesktopContext } from '../../Desktop/Desktop';

interface RecycleBinProps {
  onClose: () => void;
}

const RecycleBin: React.FC<RecycleBinProps> = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const t = useTranslations('folderView.recycleBin');
  const tSidebar = useTranslations('folderView.sidebar');
  const tDesktop = useTranslations('desktop');
  const desktopContext = useContext(DesktopContext);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickedItemRef = useRef<string | null>(null);

  // Function bar için özel butonlar
  const functionBarButtons = (
    <>
      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/back.png" alt="Back" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span className="function-button-text">{tDesktop('back')}</span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>

      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/forward.png" alt="Forward" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span className="function-button-text">{tDesktop('forward')}</span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/refresh.png" alt="Up" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </span>
      </button>

      <div className="function-separator"></div>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/restore.ico" alt="Restore" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span>{t('restoreAllItems')}</span>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/close.png" alt="Empty" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span>{t('emptyRecycleBin')}</span>
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

  // Address bar için özel içerik
  const addressBarContent = (
    <>
      <div className="address-label">{t('address')}</div>
      <div className="address-input">
        <span className="address-input-icon">
          <Image src="/icons/recycle.png" alt="Recycle Bin" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <div className="address-input-text">{t('recycleBin')}</div>
        <span className="address-input-dropdown">▼</span>
      </div>
      <div className="address-go-button">
        <span className="address-go-icon">▶️</span>
        <span>{t('go')}</span>
      </div>
    </>
  );

  const handleItemClick = (item: { onClick?: () => void; text?: string; originalText?: string }) => {
    // Single click - select item
    if (item.text) {
      setSelectedItem(item.text);
    }
    console.log('Item clicked:', item.text);
  };

  const handleItemDoubleClick = (item: { onClick?: () => void; text?: string; originalText?: string }) => {
    // Double click - open/execute item
    if (item.onClick) {
      item.onClick();
    } else if (item.text) {
      // If udemyCert is double-clicked, open Paint window
      const isUdemyCert = item.originalText === 'udemyCert' || item.text === 'udemyCert';
      
      if (isUdemyCert && desktopContext?.handleOpen) {
        const paintItem = {
          id: 'paint-udemy-cert',
          type: 'file' as const,
          label: 'Udemy Certificate',
          translationKey: 'desktop.paint',
          icon: '/icons/paint.png'
        };
        desktopContext.handleOpen(paintItem);
      }

      // If gtaCheats is double-clicked, open GtaCheatsFile
      const isGtaCheats = item.originalText === 'gtaCheats' || item.text === 'gtaCheats';
      
      if (isGtaCheats && desktopContext?.handleOpen) {
        const gtaCheatsItem = {
          id: 'gta-cheat-txt',
          type: 'file' as const,
          label: 'GTA Cheats',
          translationKey: 'desktop.gtaCheats',
          icon: '/icons/notepad.png'
        };
        desktopContext.handleOpen(gtaCheatsItem);
      }

      // If gtaViceCity is double-clicked, open GtaViceCityFile
      const isGtaViceCity = item.originalText === 'gtaViceCity' || item.text === 'gtaViceCity';
      if (isGtaViceCity && desktopContext?.handleOpen) {
        const gtaViceCityItem = {
          id: 'gtaViceCity',
          type: 'file' as const,
          label: 'GTA Vice City',
          icon: '/icons/gtavc.ico',
        };
        desktopContext.handleOpen(gtaViceCityItem);
      }
    }
    console.log('Item double-clicked:', item.text);
  };

  const handleItemMouseDown = (item: { onClick?: () => void; text?: string; originalText?: string }) => {
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Check if this is the same item as last click
    if (lastClickedItemRef.current === item.text) {
      // This is a double click
      handleItemDoubleClick(item);
      lastClickedItemRef.current = null;
    } else {
      // This is a single click
      lastClickedItemRef.current = item.text || null;
      clickTimeoutRef.current = setTimeout(() => {
        handleItemClick(item);
        lastClickedItemRef.current = null;
      }, 300); // 300ms delay to detect double click
    }
  };

  // Sidebar başlık ve item çevirileri
  const translatedSidebarConfig = recycleBinSidebarConfig.map(card => {
    let translatedTitle = card.title;
    // Try sidebar first, then desktop, then fallback
    if (tSidebar(card.title)) {
      translatedTitle = tSidebar(card.title);
    } else if (tDesktop(card.title)) {
      translatedTitle = tDesktop(card.title);
    }
    return {
      ...card,
      title: translatedTitle,
      items: card.items.map(item => {
        let translatedText = item.text;
        if (tSidebar(item.text)) {
          translatedText = tSidebar(item.text);
        } else if (tDesktop(item.text)) {
          translatedText = tDesktop(item.text);
        } else if (t(item.text)) {
          translatedText = t(item.text);
        }
        return {
          ...item,
          text: translatedText
        };
      })
    };
  });

  // Translation'ları kullanarak content config'ini güncelle
  const translatedContentConfig = recycleBinContentConfig.map(card => ({
    ...card,
    title: card.title === 'oldCVs' ? t('oldCVs') :
           card.title === 'games' ? t('games') :
           card.title === 'oldProjects' ? t('oldProjects') :
           card.title === 'certificates' ? t('certificates') :
           card.title === 'misc' ? t('misc') :
           card.title,
    items: card.items.map(item => ({
      ...item,
      originalText: item.originalText || item.text, // originalText'i koru
      text: item.text === 'cv37' ? t('files.cv37') :
            item.text === 'cvFinal' ? t('files.cvFinal') :
            item.text === 'cvLatest' ? t('files.cvLatest') :
            item.text === 'gtaViceCity' ? t('files.gtaViceCity') :
            item.text === 'gtaCheats' ? t('files.gtaCheats') :
            item.text === 'gamingSites' ? t('files.gamingSites') :
            item.text === 'testProject' ? t('files.testProject') :
            item.text === 'brokenWebsite' ? t('files.brokenWebsite') :
            item.text === 'udemyCert' ? t('files.udemyCert') :
            item.text === 'onlineCert' ? t('files.onlineCert') :
            item.text === 'oldNotes' ? t('files.oldNotes') :
            item.text === 'tempFiles' ? t('files.tempFiles') :
            item.text
    }))
  }));

  // Özel liste görünümü için içerik
  const listContent = (
    <div className="recycle-bin-list">
      {translatedContentConfig.map((card, cardIndex) => (
        <div key={cardIndex} className="recycle-bin-items">
          {card.items.map((item, itemIndex) => (
            <div 
              key={`${cardIndex}-${itemIndex}`}
              className={`recycle-bin-item ${selectedItem === item.text ? 'selected' : ''}`}
              onMouseDown={() => handleItemMouseDown(item)}
            >
              <span className="recycle-bin-item-icon">
                <Image src={item.icon} alt={item.text} width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
              </span>
              <span className="recycle-bin-item-text">{item.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <BaseFolderView 
      functionBarButtons={functionBarButtons}
      addressBarContent={addressBarContent}
    >
      <BaseSidebar cards={translatedSidebarConfig} />
      <div className="content-main recycle-bin-content">
        {listContent}
      </div>
    </BaseFolderView>
  );
};

export default RecycleBin; 