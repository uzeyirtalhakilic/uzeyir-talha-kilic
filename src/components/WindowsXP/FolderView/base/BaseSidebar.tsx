import React from "react";
import Image from "next/image";
import "../../../../styles/desktop.css";

export interface SidebarItem {
  icon: string;
  text: string;
  onClick?: () => void;
  href?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export interface SidebarCard {
  title: string;
  items: SidebarItem[];
  isCollapsible?: boolean;
}

interface BaseSidebarProps {
  cards: SidebarCard[];
  className?: string;
}

const BaseSidebar: React.FC<BaseSidebarProps> = ({ cards, className = "sidebar" }) => {
  const getImageSize = (customStyle?: React.CSSProperties, defaultSize: number = 14, className?: string): { width: number; height: number } => {
    // GitHub ikonları için özel boyut
    if (className?.includes('github-item')) {
      return { width: 100, height: 100 };
    }
    
    if (!customStyle?.width || !customStyle?.height) return { width: defaultSize, height: defaultSize };
    const width = typeof customStyle.width === 'number' ? customStyle.width : parseInt(customStyle.width as string);
    const height = typeof customStyle.height === 'number' ? customStyle.height : parseInt(customStyle.height as string);
    return { width: width || defaultSize, height: height || defaultSize };
  };

  return (
    <div className={className} style={{  }}>
      {cards.map((card, cardIndex) => (
        <div key={cardIndex} className="sidebar-card">
          <div className="sidebar-card-header">
            <div className="sidebar-card-title">{card.title}</div>
            {card.isCollapsible !== false && (
              <span className="sidebar-card-icon">▼</span>
            )}
          </div>
          <div className="sidebar-card-content">
            {card.items.map((item, itemIndex) => {
              const imageSize = getImageSize(item.customStyle, undefined, item.className);
              const itemClassName = `sidebar-item ${item.className || ''}`.trim();
              return (
                <div key={itemIndex} className={itemClassName} style={item.customStyle}>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      <span className="sidebar-item-icon" style={{ width: item.customStyle?.width || 14, height: item.customStyle?.height || 14, marginRight: item.customStyle?.marginRight || 4 }}>
                        <Image src={item.icon} alt={item.text} width={imageSize.width} height={imageSize.height} />
                      </span>
                      <div className="sidebar-item-text">{item.text}</div>
                    </a>
                  ) : (
                    <>
                      <span className="sidebar-item-icon" style={{ width: item.customStyle?.width || 14, height: item.customStyle?.height || 14, marginRight: item.customStyle?.marginRight || 4 }}>
                        <Image src={item.icon} alt={item.text} width={imageSize.width} height={imageSize.height} />
                      </span>
                      <div className="sidebar-item-text" onClick={item.onClick}>{item.text}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseSidebar; 