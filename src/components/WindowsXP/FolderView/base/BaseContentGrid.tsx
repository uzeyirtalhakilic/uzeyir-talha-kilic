import React, { useState, useRef } from "react";
import Image from "next/image";
import "../../../../styles/desktop.css";

export interface ContentItem {
  icon: string;
  text: string;
  displayText?: React.ReactNode;
  originalText?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export interface ContentCard {
  title: string;
  items: ContentItem[];
}

interface BaseContentGridProps {
  cards: ContentCard[];
  className?: string;
}

const BaseContentGrid: React.FC<BaseContentGridProps> = ({ 
  cards, 
  className = "content-main" 
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickedItemRef = useRef<string | null>(null);

  const handleItemClick = (item: ContentItem) => {
    // Single click - select item
    if (item.text) {
      setSelectedItem(item.text);
    }
    console.log('Item clicked:', item.text);
  };

  const handleItemDoubleClick = (item: ContentItem) => {
    // Double click - open/execute item
    if (item.onClick) {
      item.onClick();
    }
    console.log('Item double-clicked:', item.text);
  };

  const handleItemMouseDown = (item: ContentItem) => {
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Check if this is the same item as last click
    if (lastClickedItemRef.current === item.text) {
      // This is a double click
      handleItemDoubleClick(item);
      lastClickedItemRef.current = null;
    } else {
      // This is a single click
      lastClickedItemRef.current = item.text;
      clickTimeoutRef.current = setTimeout(() => {
        handleItemClick(item);
        lastClickedItemRef.current = null;
      }, 300); // 300ms delay to detect double click
    }
  };

  return (
    <div className={className}>
      {cards.map((card, cardIndex) => (
        <div key={cardIndex} className="content-card">
          <div className="content-card-title">{card.title}</div>
          <div className="content-card-items">
            {card.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target || "_blank"}
                    rel={item.rel || "noopener noreferrer"}
                    className="content-item"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    <span className="content-item-icon">
                      <Image src={item.icon} alt={item.text} width={45} height={45} />
                    </span>
                    <div className="content-item-text">{item.displayText ?? item.text}</div>
                  </a>
                ) : (
                  <div 
                    className={`content-item ${selectedItem === item.text ? 'selected' : ''}`}
                    onMouseDown={() => handleItemMouseDown(item)}
                  >
                    <span className="content-item-icon">
                      <Image src={item.icon} alt={item.text} width={45} height={45} />
                    </span>
                    <div className="content-item-text">{item.displayText ?? item.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseContentGrid; 