"use client";

import React, { useState } from 'react';
import { FooterMenuProps, ItemProps, ItemsProps, SubMenuProps } from './types';
import { AllPrograms, ConnectTo, MyRecentDocuments } from './FooterMenuData';

const SubMenu: React.FC<SubMenuProps> = ({ data, onClick, left }) => {
  return (
    <div 
      className="absolute top-0 bg-[#4282d6] shadow-[2px_4px_2px_rgba(0,0,0,0.5)]"
      style={{ left }}
    >
      {data.map((item, i) => (
        <Item key={i} {...item} onClick={onClick} />
      ))}
    </div>
  );
};

const FooterMenu: React.FC<FooterMenuProps> = ({ className, onClick }) => {
  const [hovering, setHovering] = useState('');

  function onMouseOver(e: React.MouseEvent) {
    const item = (e.target as HTMLElement).closest('.menu__item');
    if (!item) return;
    const textElement = item.querySelector('.menu__item__text');
    if (textElement) {
      setHovering(textElement.textContent || '');
    }
  }

  return (
    <div className={`text-[11px] leading-[14px] flex flex-col items-center bg-[#4282d6] rounded-t-[5px] shadow-[2px_4px_2px_rgba(0,0,0,0.5)] ${className}`}>
      <header className="relative self-start flex items-center text-white h-[54px] px-[5px] py-[5px] w-full rounded-t-[5px] bg-gradient-to-b from-[#1868ce] via-[#1a6ed4] to-[#1868ce]">
        <img className="h-8 w-8 mr-2" src="/icons/user.png" alt="avatar" />
        <span className="text-[13px] font-bold">User</span>
      </header>
      <section className="flex w-full menu" onMouseOver={onMouseOver}>
        <hr className="border-t border-orange-500" />
        <div className="w-[150px] flex flex-col">
          <Item onClick={onClick} text="Internet" icon="/icons/ie.png">
            <div className="text-[10px] text-gray-600">Internet Explorer</div>
          </Item>
          <Item onClick={onClick} text="E-mail" icon="/icons/outlook.png">
            <div className="text-[10px] text-gray-600">Outlook Express</div>
          </Item>
          <div className="h-px bg-[#2b5aa0] my-1" />
          <Items
            onClick={onClick}
            items={[
              { icon: '/icons/minesweeper.png', text: 'Minesweeper' },
              { icon: '/icons/notepad.png', text: 'Notepad' },
              { icon: '/icons/winamp.png', text: 'Winamp' },
              { icon: '/icons/paint.png', text: 'Paint' },
              { icon: '/icons/media-player.png', text: 'Windows Media Player' },
              { icon: '/icons/msn.png', text: 'Windows Messenger' },
            ]}
          />
          <div className="flex-1" />
          <div className="h-px bg-[#2b5aa0] my-1" />
          <Item
            style={
              hovering === 'Tüm Programlar'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text={
              <div className="flex items-center">
                Tüm Programlar
                <img
                  src="/icons/all-programs.ico"
                  alt=""
                  className="ml-[5px] h-[18px]"
                />
              </div>
            }
            icon="/icons/empty.png"
          >
            {hovering === 'Tüm Programlar' && (
              <SubMenu data={AllPrograms} onClick={onClick} />
            )}
          </Item>
        </div>
        <div className="w-[150px] flex flex-col border-l border-[#2b5aa0]">
          <Item text="My Documents" icon="/icons/documents.png" onClick={onClick} />
          <Item
            style={
              hovering === 'Son Belgelerim'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text="Son Belgelerim"
            icon="/icons/recent-documents.png"
          >
            <div
              style={{
                borderLeftColor:
                  hovering === 'Son Belgelerim' ? '#FFF' : '#00136b',
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-transparent"
            />
            {hovering === 'Son Belgelerim' && (
              <SubMenu
                left="153px"
                data={MyRecentDocuments}
                onClick={onClick}
              />
            )}
          </Item>
          <Items
            onClick={onClick}
            items={[
              { icon: '/icons/pictures.png', text: 'My Pictures' },
              { icon: '/icons/music.png', text: 'My Music' },
              { icon: '/icons/computer.png', text: 'My Computer' },
            ]}
          />
          <div className="h-px bg-[#2b5aa0] my-1" />
          <Items
            onClick={onClick}
            items={[
              { icon: '/icons/control-panel.png', text: 'Control Panel' },
              { icon: '/icons/access.png', text: 'Program Erişimi ve Varsayılanları Ayarla' },
            ]}
          />
          <Item
            style={
              hovering === 'Bağlan'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            text="Bağlan"
            icon="/icons/connection.png"
          >
            <div
              style={{
                borderLeftColor: hovering === 'Bağlan' ? '#FFF' : '#00136b',
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-transparent"
            />
            {hovering === 'Bağlan' && (
              <SubMenu left="153px" data={ConnectTo} onClick={onClick} />
            )}
          </Item>
          <Item onClick={onClick} text="Printers and Faxes" icon="/icons/printer.png" />
          <div className="h-px bg-[#2b5aa0] my-1" />
          <Items
            onClick={onClick}
            items={[
              { icon: '/icons/help.png', text: 'Help and Support' },
              { icon: '/icons/search.png', text: 'Search' },
              { icon: '/icons/run.png', text: 'Run...' },
            ]}
          />
        </div>
      </section>
      <footer className="w-full flex justify-between px-2 py-1 bg-[#2b5aa0] border-t border-[#1a4c8b]">
        <div 
          className="flex items-center text-white cursor-pointer px-2 py-1 hover:bg-[#2f71cd]"
          onClick={() => onClick('Log Off')}
        >
          <img className="h-4 w-4 mr-2" src="/icons/lock.png" alt="" />
          <span>Log Off</span>
        </div>
        <div
          className="flex items-center text-white cursor-pointer px-2 py-1 hover:bg-[#2f71cd]"
          onClick={() => onClick('Turn Off Computer')}
        >
          <img className="h-4 w-4 mr-2" src="/icons/shutdown.png" alt="" />
          <span>Turn Off Computer</span>
        </div>
      </footer>
    </div>
  );
};

const Item: React.FC<ItemProps> = ({
  style,
  text,
  icon,
  onHover = () => {},
  onClick = () => {},
  children,
}) => {
  function _onClick() {
    if (typeof text === 'string') {
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
      className="flex items-center px-2 py-1 text-black cursor-pointer relative hover:bg-[#2f71cd] hover:text-white"
      style={style}
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
    >
      <img className="h-4 w-4 mr-2" src={icon} alt={typeof text === 'string' ? text : ''} />
      <div className="flex-1">
        <div className="menu__item__text">{text}</div>
        {children}
      </div>
    </div>
  );
};

const Items: React.FC<ItemsProps> = ({ items, ...rest }) => {
  return (
    <>
      {items.map((item, i) => (
        <Item key={i} {...item} {...rest} />
      ))}
    </>
  );
};

export default FooterMenu; 