import React, { useState } from "react";
import Image from "next/image";
import { BaseFolderView, BaseSidebar } from '../base';
import { recycleBinSidebarConfig, recycleBinContentConfig } from './config';
import { useTranslations } from 'next-intl';

interface RecycleBinProps {
  onClose: () => void;
}

const RecycleBin: React.FC<RecycleBinProps> = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const t = useTranslations('folderView.recycleBin');

  // Function bar için özel butonlar
  const functionBarButtons = (
    <>
      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/back.png" alt="Back" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span className="function-button-text">Back</span>
        <div className="function-button-dropdown">
          <div className="function-button-dropdown-arrow"></div>
        </div>
      </button>

      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/forward.png" alt="Forward" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
        </span>
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
        <span>Restore</span>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/close.png" alt="Empty" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span>Empty</span>
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

  const handleItemClick = (item: { onClick?: () => void; text?: string }) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.text) {
      setSelectedItem(item.text);
    }
    console.log('Item clicked:', item.text);
  };

  // Translation'ları kullanarak sidebar config'ini güncelle
  const translatedSidebarConfig = recycleBinSidebarConfig.map(card => ({
    ...card,
    items: card.items.map(item => ({
      ...item,
      text: item.text === 'restoreAllItems' ? t('restoreAllItems') :
            item.text === 'emptyRecycleBin' ? t('emptyRecycleBin') :
            item.text === 'viewProperties' ? t('viewProperties') :
            item.text
    }))
  }));

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
              onClick={() => handleItemClick(item)}
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