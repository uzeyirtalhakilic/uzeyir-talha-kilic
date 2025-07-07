import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import "../../../../styles/desktop.css";

interface AddressBarProps {
  customContent?: React.ReactNode;
}

const AddressBar: React.FC<AddressBarProps> = ({ customContent }) => {
  const t = useTranslations('folderView.addressBar');

  if (customContent) {
    return (
      <section className="address-bar">
        {customContent}
      </section>
    );
  }

  return (
    <section className="address-bar">
      <div className="address-label">{t('address')}</div>
      <div className="address-input">
        <span className="address-input-icon">
          <Image src="/icons/MyComputer.png" alt="My Computer" width={14} height={14} />
        </span>
        <div className="address-input-text">{t('myComputer')}</div>
        <span className="address-input-dropdown">▼</span>
      </div>
      <div className="address-go-button">
        <span className="address-go-icon">▶️</span>
        <span>{t('go')}</span>
      </div>
    </section>
  );
};

export default AddressBar; 