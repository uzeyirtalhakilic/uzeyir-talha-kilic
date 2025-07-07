import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { createMyProjectsSidebarConfig, createMyProjectsContentConfig } from './config';

interface MyProjectsProps {
  onClose: () => void;
}

const MyProjects: React.FC<MyProjectsProps> = () => {
  const t = useTranslations('folderView.myProjects');

  // Function bar için özel butonlar
  const functionBarButtons = (
    <>
      <button className="function-button" disabled>
        <span className="function-button-icon">
          <Image src="/icons/back.png" alt="Back" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span className="function-button-text">{t('back')}</span>
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
          <Image src="/icons/msword.png" alt="New Document" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <span>{t('newDocument')}</span>
      </button>

      <button className="function-button">
        <span className="function-button-small-icon">
          <Image src="/icons/foldericon.png" alt="Folders" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
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

  // Address bar için özel içerik
  const addressBarContent = (
    <>
      <div className="address-label">{t('address')}</div>
      <div className="address-input">
        <span className="address-input-icon">
          <Image src="/icons/folderdocument.png" alt="My Projects" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
        </span>
        <div className="address-input-text">{t('myProjects')}</div>
        <span className="address-input-dropdown">▼</span>
      </div>
      <div className="address-go-button">
        <span className="address-go-icon">▶️</span>
        <span>{t('go')}</span>
      </div>
    </>
  );

  return (
    <BaseFolderView 
      functionBarButtons={functionBarButtons}
      addressBarContent={addressBarContent}
    >
      <BaseSidebar cards={createMyProjectsSidebarConfig(t)} />
      <BaseContentGrid cards={createMyProjectsContentConfig(t)} />
    </BaseFolderView>
  );
};

export default MyProjects; 