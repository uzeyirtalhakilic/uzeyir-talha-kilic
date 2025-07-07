"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FooterMenuProps, ItemProps, SubMenuProps, MenuItem } from './types';
import { AllPrograms, MyRecentDocuments, ConnectTo } from './FooterMenuData';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

const SubMenu: React.FC<SubMenuProps> = ({ data, onClick, left }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div 
      className="absolute top-0 bg-white shadow-[2px_4px_2px_rgba(0,0,0,0.5)] border border-[#72ade9] min-w-[200px] z-[10000]"
      style={{ left }}
      onMouseLeave={handleMouseLeave}
    >
      {data.map((item, index) => (
        <SubMenuItem
          key={index}
          item={item}
          hover={hoverIndex === index}
          onMouseEnter={() => setHoverIndex(index)}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

const SubMenuItem: React.FC<{
  item: MenuItem;
  hover: boolean;
  onMouseEnter: () => void;
  onClick: (text: string) => void;
}> = ({ item, hover, onMouseEnter, onClick }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.type === 'item' && item.text) {
      console.log('SubMenuItem clicked:', item.text);
      onClick(item.text);
    }
  };

  const handleMouseEnter = () => {
    onMouseEnter();
    if (item.type === 'menu') {
      setShowSubMenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'menu') {
      setShowSubMenu(false);
    }
  };

  switch (item.type) {
    case 'item':
      return (
        <div 
          className={`flex items-center px-2 py-1 cursor-pointer relative text-black menu-item ${
            hover ? 'bg-[#1b65cc] text-white' : 'bg-transparent text-black'
          } hover:bg-[#1b65cc] hover:text-white`}
          onClick={handleClick}
        >
          {item.icon && (
            <Image 
              src={item.icon} 
              alt="" 
              width={16} 
              height={16} 
              className="mr-1.5"
            />
          )}
          <span className="text-[11px] flex-1 whitespace-nowrap">{item.text}</span>
        </div>
      );
    case 'separator':
      return (
        <div className="h-0.5 bg-gradient-to-r from-transparent via-black/10 to-transparent my-0.5 shadow-[inset_3px_0_#4081ff]" />
      );
    case 'menu':
      return (
        <div
          className={`flex items-center px-2 py-1 cursor-pointer relative text-black menu-item ${
            hover ? 'bg-[#1b65cc] text-white' : 'bg-transparent text-black'
          } hover:bg-[#1b65cc] hover:text-white`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.icon && (
            <Image 
              src={item.icon} 
              alt="" 
              width={16} 
              height={16} 
              className="mr-1.5"
            />
          )}
          <span className="text-[11px] flex-1 whitespace-nowrap">{item.text}</span>
          <span className="text-[8px] ml-1">▶</span>
          {showSubMenu && (
            <SubMenu
              data={item.items || []}
              onClick={onClick}
              left="100%"
            />
          )}
        </div>
      );
    default:
      return null;
  }
};

const FooterMenu: React.FC<FooterMenuProps> = ({ className, onClick }) => {
  const [hovering, setHovering] = useState('');
  const t = useTranslations('footer');
  const tMenu = useTranslations('menu');
  const tGames = useTranslations('games');
  const tDocs = useTranslations('documents');
  const tDesktop = useTranslations('desktop');

  function onMouseOver(e: React.MouseEvent) {
    const item = (e.target as HTMLElement).closest('.menu__item');
    if (!item) return;
    const textElement = item.querySelector('.menu__item__text');
    if (textElement) {
      setHovering(textElement.textContent || '');
    }
  }

  const menuContent = (
    <div 
      className={`text-[11px] leading-[14px] flex flex-col items-center bg-white rounded-t-[5px] shadow-[2px_4px_2px_rgba(0,0,0,0.5)] border border-[#72ade9] ${className}`} 
      style={{ bottom: '30px', animation: 'slideUp 0.2s ease-out', width: '400px', position: 'fixed', left: '0', zIndex: 2147483647 }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <header className="relative self-start flex items-center text-white h-[54px] px-3 py-2 w-full rounded-t-[5px] bg-gradient-to-r from-[#0a246a] to-[#1e3a8a]">
        <Image
          src="/icons/user.png"
          alt="user"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-[14px] font-bold">User</span>
      </header>

      <div className="h-0.5 bg-gradient-to-r from-[#ff8c00] to-[#ffa500] w-full" />

      <section className="flex w-full menu min-h-[300px]" onMouseOver={onMouseOver}>
        <div className="flex-1 flex flex-col py-2 border-r border-[#ccc]">
          <Item onClick={onClick} text={t('internet')} icon="/icons/ie-paper.png">
            <div className="text-[9px] text-gray-600 ml-6 -mt-0.5">{tMenu('internetExplorer')}</div>
          </Item>
          
          <Item onClick={onClick} text={t('email')} icon="/icons/msn.png">
            <div className="text-[9px] text-gray-600 ml-6 -mt-0.5">{tMenu('outlookExpress')}</div>
          </Item>
          
          <div className="h-px bg-[#ccc] mx-3 my-1" />
          
          <Item onClick={onClick} text="Paint" icon="/icons/680(16x16).png" />
          <Item onClick={onClick} text="Winamp" icon="/icons/winamp.png" />
          <Item onClick={onClick} text={tDesktop('myProjects')} icon="/icons/folderdocument.png" />
          <Item onClick={onClick} text={tDesktop('whoAmI')} icon="/icons/folderdocument.png" />
          <Item onClick={onClick} text={tDesktop('aboutme')} icon="/icons/notepad.png" />
          
          <Item onClick={onClick} text={tGames('minesweeper')} icon="/icons/mine-icon.png" />
          <Item onClick={onClick} text={tGames('notepad')} icon="/icons/notepad.png" />
          <Item onClick={onClick} text={tGames('windowsMediaPlayer')} icon="/icons/846(32x32).png" />
          <Item onClick={onClick} text={t('windowsMessenger')} icon="/icons/msn.png" />
          
          <div className="flex-1" />
          <div className="h-px bg-[#ccc] mx-3 my-1" />
          
          <Item
            style={
              hovering === t('allPrograms')
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text={
              <div className="flex items-center">
                {t('allPrograms')}
                <Image
                  src="/icons/all-programs.ico"
                  alt=""
                  width={18}
                  height={18}
                  className="ml-1"
                />
              </div>
            }
          >
            {hovering === t('allPrograms') && (
              <SubMenu 
                data={AllPrograms.map(item => ({...item, text: item.text && tMenu(item.text) ? tMenu(item.text) : '' }))} 
                onClick={onClick} 
                left="153px"
              />
            )}
          </Item>
        </div>

        <div className="flex-1 flex flex-col py-2">
          <Item text={t('myDocuments')} icon="/icons/308(32x32).png" onClick={onClick} />
          
          <Item
            style={
              hovering === t('myRecentDocuments')
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text={t('myRecentDocuments')}
            icon="/icons/301(32x32).png"
          >
            <div
              style={{
                borderLeftColor:
                  hovering === t('myRecentDocuments') ? '#FFF' : '#00136b',
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-transparent"
            />
            {hovering === t('myRecentDocuments') && (
              <SubMenu
                left="153px"
                data={MyRecentDocuments.map((item, i) => ({...item, text: item.text ? tDocs(`document${i+1}`) : ''}))}
                onClick={onClick}
              />
            )}
          </Item>
          
          <Item onClick={onClick} text={t('myPictures')} icon="/icons/307(32x32).png" />
          <Item onClick={onClick} text={t('myMusic')} icon="/icons/550(32x32).png" />
          <Item onClick={onClick} text={t('myComputer')} icon="/icons/676(32x32).png" />
          <Item onClick={onClick} text={t('recycleBin')} icon="/icons/recycle.png" />
          
          <div className="h-px bg-[#ccc] mx-3 my-1" />
          
          <Item onClick={onClick} text={t('controlPanel')} icon="/icons/300(32x32).png" />
          <Item onClick={onClick} text={t('setProgramAccess')} icon="/icons/227(32x32).png" />
          
          <Item
            style={
              hovering === t('connectTo')
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text={t('connectTo')}
            icon="/icons/309(32x32).png"
          >
            <div
              style={{
                borderLeftColor: hovering === t('connectTo') ? '#FFF' : '#00136b',
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-transparent"
            />
            {hovering === t('connectTo') && (
              <SubMenu left="153px" data={ConnectTo.map(item => ({...item, text: item.text ? t(item.text) : ''}))} onClick={onClick} />
            )}
          </Item>
          
          <Item onClick={onClick} text={t('printersAndFaxes')} icon="/icons/549(32x32).png" />
          
          <div className="h-px bg-[#ccc] mx-3 my-1" />
          
          <Item onClick={onClick} text={t('helpAndSupport')} icon="/icons/747(32x32).png" />
          <Item onClick={onClick} text={t('search')} icon="/icons/299(32x32).png" />
          <Item onClick={onClick} text={t('run')} icon="/icons/743(32x32).png" />
        </div>
      </section>

      <footer className="w-full flex justify-between px-3 py-2 bg-gradient-to-r from-[#0a246a] to-[#1e3a8a] border-t border-[#1e3a8a]">
        <div 
          className=" menu-item  flex items-center text-white cursor-pointer text-[11px] hover:underline"
          onClick={() => onClick(t('logOff'))}
        >
          <Image
            src="/icons/546(32x32).png"
            alt=""
            width={16}
            height={16}
            className="mr-1.5"
          />
          <span>{t('logOff')}</span>
        </div>
        <div
          className=" menu-item  flex items-center text-white cursor-pointer text-[11px] hover:underline"
          onClick={() => onClick(t('turnOffComputer'))}
        >
          <Image
            src="/icons/310(32x32).png"
            alt=""
            width={16}
            height={16}
            className="mr-1.5"
          />
          <span>{t('turnOffComputer')}</span>
        </div>
      </footer>
    </div>
  );

  if (typeof window !== "undefined") {
    return createPortal(menuContent, document.body);
  }
  return null;
};

const Item: React.FC<ItemProps> = ({
  style,
  text,
  icon,
  onHover = () => {},
  onClick = () => {},
  children,
}) => {
  function _onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof text === 'string') {
      console.log('FooterMenu Item clicked:', text);
      onClick(text);
    }
  }

  function onMouseEnter() {
    if (typeof text === 'string') {
      onHover(text);
    }
  }

  return (
    <div
      className={`menu__item flex items-center px-3 py-1 cursor-pointer relative text-black menu-item ${
        style?.backgroundColor === '#2f71cd' ? 'bg-[#2f71cd] text-white' : 'hover:bg-[#2f71cd] hover:text-white'
      }`}
      style={style}
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
    >
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={16} 
          height={16} 
          className="mr-2"
        />
      )}
      <span className="menu__item__text text-[11px] flex-1">{text}</span>
      {children}
    </div>
  );
};

export default FooterMenu; 