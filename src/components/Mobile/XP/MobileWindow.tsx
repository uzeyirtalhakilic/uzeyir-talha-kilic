"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FileSystemItem } from "../../WindowsXP/data/filesystem";
import MyComputer from "../../WindowsXP/FolderView/MyComputer/MyComputer";
import MyProjects from "../../WindowsXP/FolderView/MyProjects/MyProjects";
import WhoAmI from "../../WindowsXP/FolderView/WhoAmI/WhoAmI";
import ContactInfo from "../../WindowsXP/FolderView/ContactInfo/ContactInfo";
import Experience from "../../WindowsXP/FolderView/Experience/Experience";
import Terminal from "../../WindowsXP/Terminal/Terminal";
import Minesweeper from "../../WindowsXP/Minesweeper/Minesweeper";
import RecycleBin from "../../WindowsXP/FolderView/RecycleBin/RecycleBin";
import AboutMeFile from "../../WindowsXP/FolderView/WhoAmI/AboutMeFile";
import ReadMeFile from "../../WindowsXP/FolderView/ReadMe/ReadMeFile";
import GtaCheatsFile from "../../WindowsXP/FolderView/RecycleBin/GtaCheatsFile";
import GtaViceCityFile from "../../WindowsXP/FolderView/RecycleBin/GtaViceCityFile";
import Paint from "../../WindowsXP/Paint";

interface MobileWindowProps {
  item: FileSystemItem;
  onClose: () => void;
}

// XpWindow.tsx'teki içerik/başlık/ikon eşlemesinin mobil (tek pencere, tam ekran) karşılığı
const MobileWindow: React.FC<MobileWindowProps> = ({ item, onClose }) => {
  const t = useTranslations('folderView.addressBar');
  const tDesktop = useTranslations('desktop');
  const tGames = useTranslations('games');
  const tWhoAmI = useTranslations('folderView.whoAmI');
  const locale = useLocale();

  const getContent = () => {
    if (item.translationKey === 'desktop.myProjects') {
      return <MyProjects onClose={onClose} />;
    } else if (item.translationKey === 'desktop.1') {
      return <WhoAmI onClose={onClose} />;
    } else if (item.translationKey === 'desktop.contactInfo') {
      return <ContactInfo onClose={onClose} />;
    } else if (item.translationKey === 'desktop.experience') {
      return <Experience onClose={onClose} />;
    } else if (item.translationKey === 'desktop.experienceTerminal') {
      return <Terminal item={item} />;
    } else if (item.translationKey === 'games.minesweeper') {
      return <Minesweeper onClose={onClose} touchHint={tGames('minesweeperFlagHint')} />;
    } else if (item.translationKey === 'desktop.recycleBin') {
      return <RecycleBin onClose={onClose} />;
    } else if (item.translationKey === 'desktop.paint') {
      if (item.id === 'paint-udemy-cert') {
        const imageUrl = locale === 'tr'
          ? "https://i.ibb.co/nqQk899n/Sn-zeyir-Tala-K-l-2.png"
          : "https://i.ibb.co/r2FLHhKC/Sn-zeyir-Tala-K-l.png";
        return <Paint isFocus initialImagePath={imageUrl} />;
      }
      return <Paint isFocus initialImagePath="https://i.ibb.co/GQ4KGzmG/favicon.png" />;
    } else if (item.id === 'about-me-txt') {
      return <AboutMeFile />;
    } else if (item.id === 'read-me-txt') {
      return <ReadMeFile />;
    } else if (item.id === 'gta-cheat-txt') {
      return <GtaCheatsFile />;
    } else if (item.id === 'gtaViceCity') {
      return <GtaViceCityFile onClose={onClose} />;
    }
    return <MyComputer onClose={onClose} />;
  };

  const getTitle = () => getMobileWindowTitle(item, t, tDesktop, tGames, tWhoAmI);
  const getIcon = () => getMobileWindowIcon(item);

  const isMinesweeper = item.translationKey === 'games.minesweeper';

  return (
    <div className="mobile-xp-window">
      <div className="header__bg" />
      <div className="title-bar">
        <div className="title-bar-left">
          <div className="title-bar-icon">
            <Image src={getIcon()} alt={getTitle()} width={15} height={15} />
          </div>
          <div className="title-bar-text">{getTitle()}</div>
        </div>
        <div className="title-bar-right">
          <button className="header__button header__button--close" onClick={onClose} />
        </div>
      </div>
      <div
        className="window-content"
        style={isMinesweeper ? { background: '#ece9d8', overflow: 'auto' } : undefined}
      >
        <div style={{ width: '100%', height: '100%' }}>{getContent()}</div>
      </div>
    </div>
  );
};

// Taskbar'daki çalışan pencere butonunun başlık/ikonunu da aynı mantıkla üretebilmek için dışa açık
export function getMobileWindowTitle(
  item: FileSystemItem,
  t: (key: string) => string,
  tDesktop: (key: string) => string,
  tGames: (key: string) => string,
  tWhoAmI: (key: string) => string
): string {
  if (item.translationKey === 'desktop.myProjects') return tDesktop('myProjects');
  if (item.translationKey === 'desktop.1') return tDesktop('whoAmI');
  if (item.translationKey === 'desktop.contactInfo') return tWhoAmI('content.contactInfo');
  if (item.translationKey === 'desktop.experience') return tDesktop('experience');
  if (item.translationKey === 'desktop.experienceTerminal') return item.label;
  if (item.translationKey === 'games.minesweeper') return tGames('minesweeper');
  if (item.translationKey === 'desktop.recycleBin') return tDesktop('recycleBin');
  if (item.translationKey === 'desktop.paint') {
    return item.id === 'paint-udemy-cert' ? 'Udemy Certificate - Paint' : tDesktop('paint');
  }
  if (item.translationKey === 'desktop.aboutme') return tWhoAmI('content.aboutMe');
  if (item.translationKey === 'desktop.readme' || item.id === 'read-me-txt') return tDesktop('readMe');
  if (item.id === 'gta-cheat-txt') return tDesktop('gtaCheats');
  if (item.id === 'gtaViceCity') return 'GTA Vice City';
  return t('myComputer');
}

export function getMobileWindowIcon(item: FileSystemItem): string {
  if (item.translationKey === 'desktop.myProjects') return "/icons/folderdocument.png";
  if (item.translationKey === 'desktop.1') return "/icons/folderdocument.png";
  if (item.translationKey === 'desktop.contactInfo') return "/icons/folderdocument.png";
  if (item.translationKey === 'desktop.experience') return "/icons/folderdocument.png";
  if (item.translationKey === 'desktop.experienceTerminal') return "/icons/exe-program.png";
  if (item.translationKey === 'games.minesweeper') return "/icons/mine-icon.png";
  if (item.translationKey === 'desktop.recycleBin') return "/icons/recycle.png";
  if (item.translationKey === 'desktop.paint') return "/icons/680(16x16).png";
  if (item.translationKey === 'desktop.aboutme') return "/icons/notepad.png";
  if (item.translationKey === 'desktop.readme') return "/icons/notepad.png";
  if (item.id === 'gtaViceCity') return "/icons/gtavc.ico";
  return "/icons/MyComputer.png";
}

export default MobileWindow;
