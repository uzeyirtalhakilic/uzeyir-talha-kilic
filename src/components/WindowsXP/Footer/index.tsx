"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FooterWindowProps, FooterProps } from './types';
import FooterMenu from './FooterMenu';
import LanguageNotification from './LanguageNotification';
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
  onWindowClick
}) => {
  const [time, setTime] = useState("");
  const [showLanguageNotification, setShowLanguageNotification] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLDivElement>(null);
  const tDesktop = useTranslations('desktop');

  function _onMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('.footer__window')) return;
    onMouseDown();
  }

  function _onClickMenuItem(name: string) {
    console.log('Footer _onClickMenuItem called with:', name);
    try {
      onClickMenuItem(name);
      // Menüyü daha uzun süre sonra kapat
      setTimeout(() => {
        setMenuOn(false);
      }, 500);
    } catch (error) {
      console.error('Error in _onClickMenuItem:', error);
    }
  }

  function toggleMenu() {
    setMenuOn((on) => !on);
  }

  useEffect(() => {
    setTime(getTime());
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show language notification after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanguageNotification(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dışarı tıklanınca menüyü kapat
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      setTimeout(() => {
        if (
          menu.current &&
          !menu.current.contains(e.target as Node) &&
          startButtonRef.current &&
          !startButtonRef.current.contains(e.target as Node)
        ) {
          setMenuOn(false);
        }
      }, 200); // Daha uzun gecikme
    }
    if (menuOn) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOn]);

  return (
    <>
      <footer
        className="xp-footer"
        onMouseDown={_onMouseDown}
      >
        <div className="footer__items left">
          <div ref={menu} className="relative z-[9999]">
            {menuOn && <FooterMenu onClick={_onClickMenuItem} />}
          </div>
          <div
            ref={startButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className={`flex items-center px-3 py-0.5 mr-2.5 rounded-r-full rounded-l-2xl cursor-pointer select-none transition-all duration-150 flex-shrink-0 menu-item ${
              menuOn 
                ? 'bg-gradient-to-b from-[#4a9c3a] to-[#2d7a24] border border-[#2d5a1a] shadow-[inset_0_1px_0_#8cd17e]' 
                : 'bg-gradient-to-b from-[#60b044] to-[#388a2f] border border-[#356a1a] shadow-[inset_0_1px_0_#a4e17e] hover:brightness-110 active:brightness-90'
            }`}
            style={{ minWidth: 70 }}
          >
            <Image
              src="/icons/win-xp-icon.png"
              alt="start"
              width={20}
              height={20}
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
                  onMouseDown={() => onWindowClick?.(app.id)}
                  isFocus={focusedAppId === app.id}
                />
              ),
          )}
        </div>

        <div className="footer__items right">
          <Image className="footer__icon" src="/icons/690(16x16).png" alt="sound" width={15} height={15} />
          <Image className="footer__icon" src="/icons/394(16x16).png" alt="usb" width={15} height={15} />
          <Image className="footer__icon" src="/icons/229(16x16).png" alt="security" width={15} height={15} />
          <div className="relative w-0 h-0">
          </div>
          {time && (
            <div className="footer__time">{time}</div>
          )}
          
          {/* Language Notification positioned relative to this container */}
          {showLanguageNotification && (
            <LanguageNotification 
              onClose={() => setShowLanguageNotification(false)} 
            />
          )}
        </div>
      </footer>
    </>
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
      className={`footer__window menu-item ${isFocus ? 'focus' : 'cover'}`}
      title={title}
    >
      <Image className="footer__icon" src={icon} alt={title} width={15} height={15} />
      <div className="footer__text">{title}</div>
    </div>
  );
};

export default Footer;