import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import "../../styles/desktop.css";

const Sidebar: React.FC = () => {
  const t = useTranslations('folderView.sidebar');

  return (
    <div className="sidebar">
      {/* System Tasks Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
          <div className="sidebar-card-title">{t('systemTasks')}</div>
          <span className="sidebar-card-icon">▼</span>
        </div>
        <div className="sidebar-card-content">
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/ie-book.png" alt="View info" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('viewSystemInformation')}</div>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/close.png" alt="Remove" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('addOrRemovePrograms')}</div>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/networksecurity.png" alt="Settings" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('changeASetting')}</div>
          </div>
        </div>
      </div>

      {/* Other Places Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
          <div className="sidebar-card-title">{t('otherPlaces')}</div>
          <span className="sidebar-card-icon">▼</span>
        </div>
        <div className="sidebar-card-content">
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/mynetworkplaces.ico" alt="Network" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('myNetworkPlaces')}</div>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/folderdocument.png" alt="Documents" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('myDocuments')}</div>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/foldericon.png" alt="Shared" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('sharedDocuments')}</div>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-item-icon">
              <Image src="/icons/networksecurity.png" alt="Control Panel" width={14} height={14} />
            </span>
            <div className="sidebar-item-text">{t('controlPanel')}</div>
          </div>
        </div>
      </div>

      {/* Github Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
          <div className="sidebar-card-title">GitHub</div>
          <span className="sidebar-card-icon">▼</span>
        </div>
        <div className="sidebar-card-content">
          <div className="sidebar-item" style={{ justifyContent: 'center' }}>
            <a href="https://github.com/uzeyirtalhakilic" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <span className="sidebar-item-icon" style={{ width: 60, height: 60, marginRight: 0 }}>
                <Image src="/github-logo.png" alt="GitHub" width={60} height={60} />
              </span>
            </a>
          </div>
          <div className="sidebar-item" style={{ justifyContent: 'center' }}>
          <a href="https://github.com/uzeyirtalhakilic" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div className="sidebar-item-text">uzeyirtalhakilic</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 