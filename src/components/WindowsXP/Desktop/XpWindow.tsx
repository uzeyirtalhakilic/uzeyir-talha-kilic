import React, { useState, useRef, useEffect, useCallback } from "react";
import { FileSystemItem } from "../WindowsXP/../data/filesystem";
import Image from 'next/image';
import MyComputer from "../FolderView/MyComputer/MyComputer";
import MyProjects from "../FolderView/MyProjects/MyProjects";
import ControlPanel from "../FolderView/ControlPanel/ControlPanel";
import WhoAmI from "../FolderView/WhoAmI/WhoAmI";
import Experience from "../FolderView/Experience/Experience";
import Terminal from "../Terminal/Terminal";
import Minesweeper from "../Minesweeper/Minesweeper";
import RecycleBin from "../FolderView/RecycleBin/RecycleBin";
import AboutMeFile from "../FolderView/WhoAmI/AboutMeFile";
import ReadMeFile from "../FolderView/ReadMe/ReadMeFile";
import GtaCheatsFile from "../FolderView/RecycleBin/GtaCheatsFile";
import GtaViceCityFile from "../FolderView/RecycleBin/GtaViceCityFile";
import Paint from "../Paint";
import { useTranslations, useLocale } from 'next-intl';

interface WindowState {
  id: string;
  item: FileSystemItem;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface XpWindowProps {
  item: FileSystemItem;
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onResize: (x: number, y: number, width: number, height: number) => void;
  isFocused: boolean;
  path?: string;
  renderContent?: () => React.ReactNode;
}

const XpWindow: React.FC<XpWindowProps> = ({ 
  item, 
  windowState, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  onResize,
  isFocused,
  renderContent
}) => {
  const t = useTranslations('folderView.addressBar');
  const tDesktop = useTranslations('desktop');
  const tGames = useTranslations('games');
  const tWhoAmI = useTranslations('folderView.whoAmI');
  const locale = useLocale();

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 300;

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    onFocus(); // Pencereye tıklandığında focus'u al
    
    if (type === 'drag') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - windowState.x,
        y: e.clientY - windowState.y,
      });
    } else if (type.startsWith('resize')) {
      setIsResizing(true);
      setResizeDirection(type);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: windowState.width,
        height: windowState.height,
        windowX: windowState.x,
        windowY: windowState.y,
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !windowState.isMaximized) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Ekran sınırlarını kontrol et
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - windowState.width));
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - 30 - windowState.height));
            
      // Desktop bileşenine pozisyon değişikliğini bildir
      onResize(clampedX, clampedY, windowState.width, windowState.height);
    } else if (isResizing && !windowState.isMaximized) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const TASKBAR_HEIGHT = 30;
      // 'resize-' önekini at; aksi halde "resize" kelimesindeki 'e' ve 's'
      // harfleri her tutamacı doğu/güney yönünde de büyütüyordu
      const dir = resizeDirection.replace('resize-', '');

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.windowX;
      let newY = resizeStart.windowY;

      // Kenar sınırına gelindiğinde büyüme durur; pencere asla itilmez/kaydırılmaz
      if (dir.includes('e')) {
        const maxWidth = window.innerWidth - resizeStart.windowX;
        newWidth = Math.max(MIN_WIDTH, Math.min(maxWidth, resizeStart.width + deltaX));
      }
      if (dir.includes('w')) {
        const rightEdge = resizeStart.windowX + resizeStart.width;
        const candidateX = Math.max(0, Math.min(resizeStart.windowX + deltaX, rightEdge - MIN_WIDTH));
        newX = candidateX;
        newWidth = rightEdge - candidateX;
      }
      if (dir.includes('s')) {
        const maxHeight = window.innerHeight - TASKBAR_HEIGHT - resizeStart.windowY;
        newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, resizeStart.height + deltaY));
      }
      if (dir.includes('n')) {
        const bottomEdge = resizeStart.windowY + resizeStart.height;
        const candidateY = Math.max(0, Math.min(resizeStart.windowY + deltaY, bottomEdge - MIN_HEIGHT));
        newY = candidateY;
        newHeight = bottomEdge - candidateY;
      }

      // Desktop bileşenine boyut değişikliğini bildir
      onResize(newX, newY, newWidth, newHeight);
    }
  }, [isDragging, isResizing, windowState.isMaximized, windowState.width, windowState.height, dragStart, resizeStart, resizeDirection, MIN_WIDTH, MIN_HEIGHT, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  }, []);

  // Event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // Mayın Tarlası penceresi oyun alanına göre boyutlanır (title bar 30px + 1px border).
  // Minimum yükseklik, Game menüsü açıldığında kırpılmaması için.
  const handleMinesweeperResize = (w: number, h: number) => {
    if (windowState.isMaximized) return;
    // 3px çerçeve (sol+sağ = 6) ve 3+25+3 dikey krom
    const newWidth = w + 6;
    const newHeight = h + 31;
    if (
      Math.abs(newWidth - windowState.width) > 1 ||
      Math.abs(newHeight - windowState.height) > 1
    ) {
      onResize(windowState.x, windowState.y, newWidth, newHeight);
    }
  };

  // Determine which component to render based on item
  const getWindowContent = () => {
    if (item.translationKey === 'desktop.myProjects') {
      return <MyProjects onClose={onClose} />;
    } else if (item.translationKey === 'desktop.controlPanel') {
      return <ControlPanel onClose={onClose} />;
    } else if (item.translationKey === 'desktop.1') {
      return <WhoAmI onClose={onClose} />;
    } else if (item.translationKey === 'desktop.experience') {
      return <Experience onClose={onClose} />;
    } else if (item.translationKey === 'desktop.experienceTerminal') {
      return <Terminal item={item} />;
    } else if (item.translationKey === 'games.minesweeper') {
      return <Minesweeper onClose={onClose} onGameResize={handleMinesweeperResize} />;
    } else if (item.translationKey === 'desktop.recycleBin') {
      return <RecycleBin onClose={onClose} />;
    } else if (item.translationKey === 'desktop.paint') {
      // Check if it's the specific Udemy certificate paint window
      if (item.id === 'paint-udemy-cert') {
        const imageUrl = locale === 'tr' 
          ? "https://i.ibb.co/nqQk899n/Sn-zeyir-Tala-K-l-2.png"  // Türkçe için
          : "https://i.ibb.co/r2FLHhKC/Sn-zeyir-Tala-K-l.png";     // İngilizce için
        return (
          <Paint 
            isFocus={isFocused} 
            initialImagePath={imageUrl}
          />
        );
      } else {
        // Default paint window
        const imageUrl = "https://i.ibb.co/GQ4KGzmG/favicon.png"   // Türkçe için
        return (
          <Paint 
            isFocus={isFocused} 
            initialImagePath={imageUrl}
          />
        );
      }
    } else if (item.id === 'about-me-txt') {
      return <AboutMeFile />;
    } else if (item.id === 'read-me-txt') {
      return <ReadMeFile />;
    } else if (item.id === 'gta-cheat-txt') {
      return <GtaCheatsFile />;
    } else if (item.id === 'gtaViceCity') {
      return <GtaViceCityFile onClose={onClose} />;
    } else {
      return <MyComputer onClose={onClose} />;
    }
  };

  // Get window title and icon based on item
  const getWindowTitle = () => {
    if (item.translationKey === 'desktop.myProjects') {
      return tDesktop('myProjects');
    } else if (item.translationKey === 'desktop.controlPanel') {
      return tDesktop('controlPanel');
    } else if (item.translationKey === 'desktop.1') {
      return tDesktop('whoAmI');
    } else if (item.translationKey === 'desktop.experience') {
      return tDesktop('experience');
    } else if (item.translationKey === 'desktop.experienceTerminal') {
      return item.label;
    } else if (item.translationKey === 'games.minesweeper') {
      return tGames('minesweeper');
    } else if (item.translationKey === 'desktop.recycleBin') {
      return tDesktop('recycleBin');
    } else if (item.translationKey === 'desktop.paint') {
      // Check if it's the specific Udemy certificate paint window
      if (item.id === 'paint-udemy-cert') {
        return 'Udemy Certificate - Paint';
      } else {
        return tDesktop('paint');
      }
    } else if (item.translationKey === 'desktop.aboutme') {
      return tWhoAmI('content.aboutMe');
    } else if (item.translationKey === 'desktop.readme') {
      return tDesktop('readMe');
    } else if (item.id === 'read-me-txt') {
      return tDesktop('readMe');
    } else if (item.id === 'gta-cheat-txt') {
      return tDesktop("gtaCheats");
    } else if (item.id === 'gtaViceCity') {
      return "GTA Vice City";
    } else {
      return t('myComputer');
    }
  };

  const getWindowIcon = () => {
    if (item.translationKey === 'desktop.myProjects') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.controlPanel') {
      return "/icons/control-panel.png";
    } else if (item.translationKey === 'desktop.1') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.experience') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.experienceTerminal') {
      return "/icons/exe-program.png";
    } else if (item.translationKey === 'games.minesweeper') {
      return "/icons/mine-icon.png";
    } else if (item.translationKey === 'desktop.recycleBin') {
      return "/icons/recycle.png";
    } else if (item.translationKey === 'desktop.paint') {
      return "/icons/680(16x16).png";
    } else if (item.translationKey === 'desktop.aboutme') {
      return "/icons/notepad.png";
    } else if (item.translationKey === 'desktop.readme') {
      return "/icons/notepad.png";
    } else if (item.id === 'gtaViceCity') {
      return "/icons/gtavc.ico";
    } else {
      return "/icons/MyComputer.png";
    }
  };

  const windowStyle = {
    position: 'absolute' as const,
    left: windowState.x,
    top: windowState.y,
    width: windowState.width,
    height: windowState.height,
    // winXP-master referansı: 3px çerçeve, odak durumuna göre renk
    background: isFocused ? "#0831d9" : "#6582f5",
    padding: 3,
    fontFamily: "Tahoma, Arial, sans-serif",
    // Mayın Tarlası'nda Game menüsü pencere kenarından taşabilmeli (gerçek XP gibi)
    overflow: item.translationKey === 'games.minesweeper' ? "visible" : "hidden",
    boxShadow: "0 8px 32px 0 rgba(60, 90, 170, 0.25)",
    borderRadius: windowState.isMaximized ? "0" : "8px 8px 0 0",
    zIndex: isFocused ? 20 : 19,
  };

  const windowClasses = [
    'xp-window',
    windowState.isMaximized ? 'maximized' : '',
    isDragging ? 'dragging' : '',
    isResizing ? 'resizing' : '',
    isFocused ? 'focused' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={windowRef} className={windowClasses} style={windowStyle}>
      <div className="header__bg" />
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        className="title-bar"
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        <div className="title-bar-left">
          <div className="title-bar-icon">
            <Image src={getWindowIcon()} alt={getWindowTitle()} width={15} height={15} />
          </div>
          <div
            className="title-bar-text"
            style={
              item.translationKey === 'games.minesweeper'
                ? { fontSize: 10, whiteSpace: 'nowrap' }
                : undefined
            }
          >
            {getWindowTitle()}
          </div>
        </div>
        <div className="title-bar-right">
          <button className="header__button header__button--minimize" onClick={onMinimize} />
          {item.translationKey === 'games.minesweeper' ? (
            <button className="header__button header__button--maximize header__button--disable" />
          ) : (
            <button
              className={`header__button ${windowState.isMaximized ? 'header__button--maximized' : 'header__button--maximize'}`}
              onClick={onMaximize}
            />
          )}
          <button className="header__button header__button--close" onClick={onClose} />
        </div>
      </div>

      {/* Window Content */}
      <div
        className="window-content"
        style={
          item.translationKey === 'games.minesweeper'
            ? { background: '#ece9d8' }
            : undefined
        }
      >
        <div style={{ width: '100%', height: '100%' }}>
          {renderContent ? renderContent() : getWindowContent()}
        </div>
      </div>

      {/* Resize Handles (Mayın Tarlası sabit boyutlu, tutamaç yok) */}
      {!windowState.isMaximized && !renderContent && item.translationKey !== 'games.minesweeper' && (
        <>
          <div className="resize-handle resize-n" onMouseDown={(e) => handleMouseDown(e, 'resize-n')} />
          <div className="resize-handle resize-s" onMouseDown={(e) => handleMouseDown(e, 'resize-s')} />
          <div className="resize-handle resize-e" onMouseDown={(e) => handleMouseDown(e, 'resize-e')} />
          <div className="resize-handle resize-w" onMouseDown={(e) => handleMouseDown(e, 'resize-w')} />
          <div className="resize-handle resize-ne" onMouseDown={(e) => handleMouseDown(e, 'resize-ne')} />
          <div className="resize-handle resize-nw" onMouseDown={(e) => handleMouseDown(e, 'resize-nw')} />
          <div className="resize-handle resize-se" onMouseDown={(e) => handleMouseDown(e, 'resize-se')} />
          <div className="resize-handle resize-sw" onMouseDown={(e) => handleMouseDown(e, 'resize-sw')} />
        </>
      )}
    </div>
  );
};

export default XpWindow; 