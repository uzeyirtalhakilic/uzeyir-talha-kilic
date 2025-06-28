import React, { useState } from "react";
import Image from "next/image";
import "../../../styles/desktop.css";

export interface ContentItem {
  icon: string;
  text: string;
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

  const handleItemClick = (item: ContentItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.text) {
      setSelectedItem(item.text);
    }
    console.log('Item clicked:', item.text);
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
                    <div className="content-item-text">{item.text}</div>
                  </a>
                ) : (
                  <div 
                    className={`content-item ${selectedItem === item.text ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="content-item-icon">
                      <Image src={item.icon} alt={item.text} width={45} height={45} />
                    </span>
                    <div className="content-item-text">{item.text}</div>
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