import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { BaseFolderView, BaseContentGrid } from '../base';
import { createContactInfoContentConfig } from './config';

interface ContactInfoProps {
  onClose: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = () => {
  const t = useTranslations('folderView.whoAmI');

  const addressBarContent = (
    <div className="address-input">
      <span className="address-input-icon">
        <Image src="/icons/folderdocument.png" alt="Contact Info" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
      </span>
      <div className="address-input-text">{t('content.contactInfo')}</div>
      <span className="address-input-dropdown">▼</span>
    </div>
  );

  return (
    <BaseFolderView addressBarContent={addressBarContent}>
      <BaseContentGrid cards={createContactInfoContentConfig(t)} />
    </BaseFolderView>
  );
};

export default ContactInfo;
