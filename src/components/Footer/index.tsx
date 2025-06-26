"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FooterProps, FooterWindowProps } from './types';
import FooterMenu from './FooterMenu';
import { useTranslations } from 'next-intl';

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = 'AM';
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = Number('0' + min);
  }
  return `${hour}:${min} ${hourPostFix}`;
};

const Footer: React.FC<FooterProps> = ({
  apps,
  focusedAppId,
  onMouseDown = () => {},
  onClickMenuItem,
}) => {
  const [time, setTime] = useState("");
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const tDesktop = useTranslations('desktop');

  function toggleMenu() {
    setMenuOn(on => !on);
  }

  function _onMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('.footer__window')) return;
    onMouseDown();
  }

  function _onClickMenuItem(name: string) {
    onClickMenuItem(name);
    setMenuOn(false);
  }

  useEffect(() => {
    setTime(getTime());
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const target = menu.current;
    if (!target) return;
    function onMouseDown(e: MouseEvent) {
      if (!target?.contains(e.target as Node) && menuOn) setMenuOn(false);
    }
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [menuOn]);

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 h-[30px] flex items-center bg-gradient-to-b from-[#1f2f86] via-[#245ddb] to-[#1941a5]"
      onMouseDown={_onMouseDown}
    >
      <div className="flex-1 h-full flex items-center overflow-hidden">
        <div ref={menu} className="relative">
          {menuOn && <FooterMenu onClick={_onClickMenuItem} />}
        </div>
        <div
          onMouseDown={toggleMenu}
          className="flex items-center px-3 py-0.5 mr-2.5 rounded-r-full rounded-l-2xl bg-gradient-to-b from-[#60b044] to-[#388a2f] border border-[#356a1a] shadow-[inset_0_1px_0_#a4e17e] cursor-pointer select-none active:brightness-90"
          style={{ minWidth: 70 }}
        >
          <img
            src="/icons/win-xp-icon.png"
            alt="start"
            className="h-5 w-5 mr-2"
            draggable={false}
          />
          <span className="text-white font-bold text-[15px] drop-shadow-[0_1px_0_#356a1a] font-['Tahoma',sans-serif] tracking-wide">
            {tDesktop('start')}
          </span>
        </div>
        {Array.isArray(apps) && apps.map(
          app =>
            !app.header.noFooterWindow && (
              <FooterWindow
                key={app.id}
                id={app.id}
                icon={app.header.icon}
                title={app.header.title}
                onMouseDown={() => {}}
                isFocus={focusedAppId === app.id}
              />
            ),
        )}
      </div>

      <div className="flex-shrink-0 h-full flex items-center px-2.5 ml-2.5 bg-gradient-to-b from-[#0c59b9] via-[#0d9ff1] to-[#095bc9] border-l border-[#1042af] shadow-[inset_1px_0_1px_#18bbff]">
        <img className="h-[15px] w-[15px] mr-2" src="/icons/sound.png" alt="sound" />
        <img className="h-[15px] w-[15px] mr-2" src="/icons/usb.png" alt="usb" />
        <img className="h-[15px] w-[15px] mr-2" src="/icons/risk.png" alt="security" />
        <div className="relative w-0 h-0">
        </div>
        {time && (
          <div className="text-white text-[11px] font-['Tahoma']">{time}</div>
        )}
      </div>
    </footer>
  );
};

const FooterWindow: React.FC<FooterWindowProps> = ({
  id,
  icon,
  title,
  onMouseDown,
  isFocus,
}) => {
  function _onMouseDown() {
    onMouseDown(id);
  }
  return (
    <div
      onMouseDown={_onMouseDown}
      className={`flex-1 max-w-[150px] text-white rounded-sm mt-0.5 px-2 h-[22px] text-[11px] bg-[#3c81f3] shadow-[inset_-1px_0px_rgba(0,0,0,0.3),inset_1px_1px_1px_rgba(255,255,255,0.2)] relative flex items-center
        ${isFocus ? 'focus' : 'cover'}
        ${isFocus ? 'hover:bg-[#3576f3]' : 'hover:bg-[#53a3ff]'}
        ${isFocus ? 'hover:active:bg-[#1e52b7]' : 'hover:active:bg-[#1e52b7]'}
        ${isFocus ? 'hover:active:shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.3),inset_1px_0_1px_rgba(0,0,0,0.7)]' : 'hover:active:shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.3),inset_1px_0_1px_rgba(0,0,0,0.7)]'}
      `}
    >
      <img className="h-[15px] w-[15px] mr-2" src={icon} alt={title} />
      <div className="absolute left-[27px] right-2 whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </div>
  );
};

export default Footer;