import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import "../../styles/desktop.css";

const ContentGrid: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const t = useTranslations('folderView.contentGrid');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    console.log('Item clicked:', item);
  };

  return (
    <div className="content-main">
      {/* Files Stored Card */}
      <div className="content-card">
        <div className="content-card-title">
          {t('filesStoredOnThisComputer')}
        </div>
        <div className="content-card-items">
          <div 
            className={`content-item ${selectedItem === t('sharedDocuments') ? 'selected' : ''}`}
            onClick={() => handleItemClick(t('sharedDocuments'))}
          >
            <span className="content-item-icon">
              <Image src="/icons/foldericon.png" alt="Shared Documents" width={45} height={45} />
            </span>
            <div className="content-item-text">{t('sharedDocuments')}</div>
          </div>
          <div 
            className={`content-item ${selectedItem === t('usersDocuments') ? 'selected' : ''}`}
            onClick={() => handleItemClick(t('usersDocuments'))}
          >
            <span className="content-item-icon">
              <Image src="/icons/folderdocument.png" alt="User's Documents" width={45} height={45} />
            </span>
            <div className="content-item-text">{t('usersDocuments')}</div>
          </div>
        </div>
      </div>

      {/* Hard Disk Drives Card */}
      <div className="content-card">
        <div className="content-card-title">
          {t('hardDiskDrives')}
        </div>
        <div className="content-card-items">
          <div 
            className={`content-item ${selectedItem === t('localDiskC') ? 'selected' : ''}`}
            onClick={() => handleItemClick(t('localDiskC'))}
          >
            <span className="content-item-icon">
              <Image src="/icons/localdisk.png" alt="Local Disk (C:)" width={45} height={45} />
            </span>
            <div className="content-item-text">{t('localDiskC')}</div>
          </div>
        </div>
      </div>

      {/* Devices with Removable Storage Card */}
      <div className="content-card">
        <div className="content-card-title">
          {t('devicesWithRemovableStorage')}
        </div>
        <div className="content-card-items">
          <div 
            className={`content-item ${selectedItem === t('cdDriveD') ? 'selected' : ''}`}
            onClick={() => handleItemClick(t('cdDriveD'))}
          >
            <span className="content-item-icon">
              <Image src="/icons/dvd.png" alt="CD Drive (D:)" width={45} height={45} />
            </span>
            <div className="content-item-text">{t('cdDriveD')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGrid; 