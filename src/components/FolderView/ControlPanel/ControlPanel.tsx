import React from "react";
import Image from "next/image";
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { controlPanelSidebarConfig, controlPanelContentConfig } from './config';

interface ControlPanelProps {
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ( ) => {
  // Address bar için özel içerik
  const addressBarContent = (
    <>
      <div className="address-label">Address</div>
      <div className="address-input">
        <span className="address-input-icon">
          <Image src="/icons/networksecurity.png" alt="Control Panel" width={14} height={14} />
        </span>
        <div className="address-input-text">Control Panel</div>
        <span className="address-input-dropdown">▼</span>
      </div>
      <div className="address-go-button">
        <span className="address-go-icon">▶️</span>
        <span>Go</span>
      </div>
    </>
  );

  return (
    <BaseFolderView 
      addressBarContent={addressBarContent}
    >
      <BaseSidebar cards={controlPanelSidebarConfig} />
      <BaseContentGrid cards={controlPanelContentConfig} />
    </BaseFolderView>
  );
};

export default ControlPanel; 