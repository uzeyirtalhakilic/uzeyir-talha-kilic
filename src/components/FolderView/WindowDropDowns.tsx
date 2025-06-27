import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from './types';
import { WindowDropDown } from './WindowDropDown';
import { useTranslations } from 'next-intl';

interface WindowDropDownsProps {
  items: {
    [key: string]: MenuItem[];
  };
  onClickItem: (item: string) => void;
  className?: string;
  height?: number;
}

export const WindowDropDowns: React.FC<WindowDropDownsProps> = ({
  items,
  onClickItem,
  className,
  height = 20,
}) => {
  const dropDown = useRef<HTMLDivElement>(null);
  const [openOption, setOpenOption] = useState<string>('');
  const t = useTranslations('folderView.toolbar');
  const tDropdown = useTranslations('folderView.dropdownMenu');

  const hoverOption = (option: string) => {
    if (openOption) setOpenOption(option);
  };

  const handleClickItem = (name: string) => {
    setOpenOption('');
    onClickItem(name);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (dropDown.current && !dropDown.current.contains(e.target as Node)) {
      setOpenOption('');
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Function to translate menu item text
  const translateMenuItem = (item: MenuItem): MenuItem => {
    if (!item.text) return item;
    
    // Check if the text is a translation key
    if (item.text.startsWith('dropdownMenu.')) {
      return {
        ...item,
        text: tDropdown(item.text.replace('dropdownMenu.', ''))
      };
    }
    
    return item;
  };

  // Function to translate menu items recursively
  const translateMenuItems = (menuItems: MenuItem[]): MenuItem[] => {
    return menuItems.map(item => {
      const translatedItem = translateMenuItem(item);
      if (translatedItem.items) {
        return {
          ...translatedItem,
          items: translateMenuItems(translatedItem.items)
        };
      }
      return translatedItem;
    });
  };

  return (
    <div className={`inline-flex h-[${height}px] leading-[${height}px] relative ${className || ''}`} ref={dropDown}>
      {Object.keys(items).map(name => (
        <div className="text-xs h-full relative" key={name}>
          <div
            onMouseDown={() => setOpenOption(name)}
            onMouseEnter={() => hoverOption(name)}
            className={`px-1.5 hover:bg-[#1660e8] hover:text-white font-semibold text-black ${
              openOption === name ? 'bg-[#1660e8] text-white' : ''
            }`}
            style={{ 
              textShadow: openOption === name || name.includes('hover') ? 'none' : '0 1px 1px rgba(255,255,255,0.8)',
              fontWeight: '600'
            }}
          >
            {t(name.toLowerCase())}
          </div>
          {openOption === name && (
            <WindowDropDown
              onClick={handleClickItem}
              items={translateMenuItems(items[name])}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}; 