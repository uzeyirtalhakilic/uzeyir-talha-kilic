import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import "../../../styles/desktop.css";

const Toolbar: React.FC = () => {
  const t = useTranslations('folderView.toolbar');

  return (
    <div className="toolbar-section">
      <div className="toolbar-content">
        <div className="toolbar-menu">
          <span>{t('file')}</span>
          <span>{t('edit')}</span>
          <span>{t('view')}</span>
          <span>{t('favorites')}</span>
          <span>{t('tools')}</span>
          <span>{t('help')}</span>
        </div>
      </div>
      <div className="toolbar-windows-icon">
        <Image src="/icons/win-xp-icon.png" alt="Windows" width={16} height={16} />
      </div>
    </div>
  );
};

export default Toolbar; 