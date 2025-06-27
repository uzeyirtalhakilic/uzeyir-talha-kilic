import React, { useState } from 'react';
import { MenuItem } from './types';

interface WindowDropDownProps {
  items: MenuItem[];
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  onClick: (text: string) => void;
}

const RowSymbol: React.FC<{ type?: string }> = ({ type }) => {
  switch (type) {
    case 'ie-paper':
      return <img className="max-w-[13px] max-h-[13px] -translate-x-0.5" src="/icons/ie-paper.png" alt="" />;
    case 'ie-book':
      return <img className="max-w-[13px] max-h-[13px] -translate-x-0.5" src="/icons/ie-book.png" alt="" />;
    case 'folder':
      return <img className="max-w-[13px] max-h-[13px] -translate-x-0.5" src="/icons/folder.png" alt="" />;
    case 'check':
      return <img src="/icons/checked.png" alt="" />;
    case 'circle':
      return (
        <div
          className="w-1.5 h-1.5 rounded-full bg-black"
        />
      );
    default:
      return null;
  }
};

export const WindowDropDown: React.FC<WindowDropDownProps> = ({ items, position = {}, onClick }) => {
  const [option, setOption] = useState<string>('');

  return (
    <div
      className="absolute flex text-xs border-b border-transparent"
      style={{
        left: position.left,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <div className="bg-white z-10 p-0.5 leading-[18px] grid absolute shadow-[2px_2px_1px_rgb(100,100,100)] border border-gray grid-cols-[16px_auto_auto_15px_0px]">
        {items.map((item, index) => {
          switch (item.type) {
            case 'item':
              return (
                <div
                  key={item.text}
                  className={`contents hover:[&>*:not(:nth-child(5))]:bg-[#e99f17] hover:[&>*:not(:nth-child(5))]:invert hover:[&>.drop-down__check>.drop-down__icon]:invert ${
                    item.disable ? 'text-[#8c8c8cb5]' : ''
                  }`}
                  onMouseEnter={() => setOption(item.text || '')}
                  onClick={() => item.text && onClick(item.text)}
                >
                  <div className="grid-column-1 flex items-center justify-center">
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className="whitespace-nowrap pr-2 grid-column-2 font-semibold text-black text-shadow-sm" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.8)' }}>{item.text}</div>
                  <span className="whitespace-nowrap pr-0.5 grid-column-3 font-medium text-gray-700" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.6)' }}>{item.hotkey || ''}</span>
                  <div className="grid-column-4 w-full h-full" />
                </div>
              );
            case 'menu':
              return (
                <div
                  key={item.text}
                  className={`contents ${
                    option === item.text
                      ? '[&>.drop-down__check>.drop-down__icon]:invert [&>*:not(:nth-child(5))]:bg-[#e99f17] [&>*:not(:nth-child(5))]:invert'
                      : ''
                  }`}
                  onMouseEnter={() => setOption(item.text || '')}
                >
                  <div className="grid-column-1 flex items-center justify-center">
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className="whitespace-nowrap pr-2 grid-column-2 font-semibold text-black" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.8)' }}>{item.text}</div>
                  <span className="whitespace-nowrap pr-0.5 grid-column-3 font-medium text-gray-700" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.6)' }}>{item.hotkey || ''}</span>
                  <div className="relative grid-column-4 w-full h-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-3 border-x-3 border-x-transparent border-black" />
                  </div>
                  <div className="relative">
                    {option === item.text && item.items && (
                      <WindowDropDown
                        position={item.position}
                        items={item.items}
                        onClick={onClick}
                      />
                    )}
                  </div>
                </div>
              );
            case 'separator':
              return (
                <div
                  key={index}
                  className="grid-column-1/5 h-[7px] p-[3px_1px] bg-black/20 bg-clip-content"
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}; 