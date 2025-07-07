import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

interface TxtFileProps {
  content: string;
}

const TxtFile: React.FC<TxtFileProps> = ({ content }) => {
  const t = useTranslations('txtFile');
  const [textContent, setTextContent] = useState(content);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case 'file':
        // File menu actions could be implemented here
        console.log('File menu clicked');
        break;
      case 'edit':
        setIsReadOnly(!isReadOnly);
        break;
      case 'format':
        // Format menu actions could be implemented here
        console.log('Format menu clicked');
        break;
      case 'view':
        // View menu actions could be implemented here
        console.log('View menu clicked');
        break;
      case 'help':
        // Help menu actions could be implemented here
        console.log('Help menu clicked');
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col border border-gray-400" style={{ fontFamily: 'Tahoma, Arial, sans-serif', background: '#ece9d8' }}>

      {/* Menu Bar */}
      <div className="toolbar-section">
        <div className="toolbar-content">
          <div className="toolbar-menu">
            <span 
              className="menu-item" 
              onClick={() => handleMenuClick('file')}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {t('menu.file')}
            </span>
            <span 
              className="menu-item" 
              onClick={() => handleMenuClick('edit')}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {t('menu.edit')}
            </span>
            <span 
              className="menu-item" 
              onClick={() => handleMenuClick('format')}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {t('menu.format')}
            </span>
            <span 
              className="menu-item" 
              onClick={() => handleMenuClick('view')}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {t('menu.view')}
            </span>
            <span 
              className="menu-item" 
              onClick={() => handleMenuClick('help')}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {t('menu.help')}
            </span>
          </div>
        </div>
        <div className="toolbar-windows-icon">
          <Image src="/icons/win-xp-icon.png" alt="Windows" width={16} height={16} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1" style={{ background: 'white', padding: 0 }}>
        <textarea
          className="w-full h-full p-2 text-sm"
          style={{ 
            resize: 'none', 
            border: 'none', 
            outline: 'none', 
            background: 'white', 
            fontFamily: 'Tahoma', 
            color: 'black', 
            minHeight: '100%', 
            minWidth: '100%',
            cursor: isReadOnly ? 'default' : 'text'
          }}
          value={textContent}
          readOnly={isReadOnly}
          onChange={(e) => !isReadOnly && setTextContent(e.target.value)}
          placeholder={isReadOnly ? '' : 'Start typing...'}
        />
      </div>

      {/* Status Bar */}
      <div className="status-bar" style={{ 
        background: '#ece9d8', 
        borderTop: '1px solid #b5cbe9', 
        padding: '2px 8px', 
        fontSize: '11px',
        color: '#666'
      }}>
        {isReadOnly ? 'Ready' : 'Editing'} - {textContent.length} characters
      </div>
    </div>
  );
};

export default TxtFile; 