import React from "react";
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { whoAmISidebarConfig, whoAmIContentConfig } from './config';

interface WhoAmIProps {
  onClose: () => void;
}

const WhoAmI: React.FC<WhoAmIProps> = () => {
  return (
    <BaseFolderView>
      <BaseSidebar cards={whoAmISidebarConfig} />
      <BaseContentGrid cards={whoAmIContentConfig} />
    </BaseFolderView>
  );
};

export default WhoAmI; 