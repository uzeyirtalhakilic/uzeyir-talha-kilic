import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import "../../styles/desktop.css";

interface ToolbarProps {
  onClose: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose }) => {
  const t = useTranslations('folderView.toolbar');

  const handleMenuClick = (item: string) => {
    switch (item) {
      case 'Close':
        onClose();
        break;
      default:
        console.log('Menu item clicked:', item);
    }
  };

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