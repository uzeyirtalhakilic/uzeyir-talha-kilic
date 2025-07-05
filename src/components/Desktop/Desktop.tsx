"use client";
// TODO  Türkçe ve ingilizceyi tam hale getir.
// TODO  README dosyasını ve AboutMe dosyasını güncelle. Neden?
//?      Gerekli Dosyaları/Videoları(Belki) Ekle
//?      Belki yeni Icon tasarlayabilirim

import DesktopIcon from "./DesktopIcon";
import { desktopItems, FileSystemItem } from "../../data/filesystem";
import React, { useState, createContext, useRef, useEffect, useMemo, useCallback } from "react";
import XpWindow from "./XpWindow";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Taskbar from "./Taskbar";
import DashedBox from "../../DashedBox/DashedBox";
import DesktopContextMenu from "./DesktopContextMenu";
import dynamic from "next/dynamic";

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

export const DesktopContext = createContext<{ handleOpen: (item: FileSystemItem) => void, refreshDesktop?: () => void } | undefined>(undefined);

const WinampApp = dynamic(() => import("../Winamp/WinampApp"), { ssr: false });

export default function Desktop() {
  const [windowStates, setWindowStates] = useState<WindowState[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [highlightedIconId, setHighlightedIconId] = useState<string | null>(null);
  const t = useTranslations('desktop');
  const tFooter = useTranslations('footer');
  const tGames = useTranslations('games');
  const tDesktop = useTranslations('desktop');
  const OFFSET = 32;
  const [startPos, setStartPos] = useState<null | { x: number; y: number }>(null);
  const [mouse, setMouse] = useState<{ docX: number; docY: number }>({ docX: 0, docY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightedByBox, setHighlightedByBox] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWinamp, setShowWinamp] = useState(false);
  const [winampMinimized, setWinampMinimized] = useState(false);

  const handleOpen = (item: FileSystemItem) => {
    if (item.id === "winamp") {
      setShowWinamp(true);
      setWinampMinimized(false);
      setFocusedWindowId("winamp");
      return;
    }
    // Aynı pencereyi tekrar açma
    if (!windowStates.find((win) => win.id === item.id)) {
      // Calculate offset position
      let baseX = window.innerWidth / 2 - 500;
      let baseY = 50;
      if (windowStates.length > 0) {
        const lastWin = windowStates[windowStates.length - 1];
        baseX = lastWin.x + OFFSET;
        baseY = lastWin.y + OFFSET;
        // Prevent going off screen
        if (baseX + 1150 > window.innerWidth) baseX = 20;
        if (baseY + 500 > window.innerHeight - 40) baseY = 20;
      }
      let width = 1150;
      let height = 500;
      if (item.id === 'gtaViceCity') {
        width = 512;
        height = 340;
      }
      const newWindow: WindowState = {
        id: item.id,
        item: item,
        isMinimized: false,
        isMaximized: false,
        x: baseX,
        y: baseY,
        width,
        height,
      };
      setWindowStates((prev) => [...prev, newWindow]);
      setFocusedWindowId(item.id);
    } else {
      // Eğer pencere minimize edilmişse, geri getir
      const existingWindow = windowStates.find((win) => win.id === item.id);
      if (existingWindow?.isMinimized) {
        setWindowStates((prev) =>
          prev.map((win) =>
            win.id === item.id ? { ...win, isMinimized: false } : win
          )
        );
        setFocusedWindowId(item.id);
      }
    }
  };

  const handleClose = (windowId: string) => {
    if (windowId === "winamp") {
      setShowWinamp(false);
      setWinampMinimized(false);
      if (focusedWindowId === "winamp") setFocusedWindowId(null);
      return;
    }
    setWindowStates((prev) => prev.filter((win) => win.id !== windowId));
    if (focusedWindowId === windowId) {
      setFocusedWindowId(null);
    }
  };

  const handleMinimize = (windowId: string) => {
    if (windowId === "winamp") {
      setWinampMinimized(true);
      if (focusedWindowId === "winamp") setFocusedWindowId(null);
      return;
    }
    setWindowStates((prev) =>
      prev.map((win) =>
        win.id === windowId ? { ...win, isMinimized: true } : win
      )
    );
    if (focusedWindowId === windowId) {
      setFocusedWindowId(null);
    }
  };

  const handleMaximize = (windowId: string) => {
    setWindowStates((prev) =>
      prev.map((win) => {
        if (win.id === windowId) {
          if (win.isMaximized) {
            // Restore
            return {
              ...win,
              isMaximized: false,
              x: window.innerWidth / 2 - 500,
              y: 50,
              width: 1000,
              height: 500,
            };
          } else {
            // Maximize
            return {
              ...win,
              isMaximized: true,
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight - 30, // Taskbar için alan bırak
            };
          }
        }
        return win;
      })
    );
  };

  const handleWindowFocus = (windowId: string) => {
    setFocusedWindowId(windowId);
    // Pencereyi en üste getir
    setWindowStates((prev) => [
      ...prev.filter((win) => win.id !== windowId),
      ...prev.filter((win) => win.id === windowId),
    ]);
  };

  const handleWindowResize = (windowId: string, x: number, y: number, width: number, height: number) => {
    // Alt sınırı kontrol et
    const maxHeight = window.innerHeight - 30 - y;
    const adjustedHeight = Math.min(height, maxHeight);
  
    setWindowStates((prev) =>
      prev.map((win) =>
        win.id === windowId ? { ...win, x, y, width, height: adjustedHeight } : win
      )
    );
  };

  const handleTaskbarWindowClick = (windowId: string) => {
    if (windowId === "winamp") {
      if (winampMinimized) {
        setWinampMinimized(false);
        setFocusedWindowId("winamp");
      } else {
        setWinampMinimized(true);
        setFocusedWindowId(null);
      }
      return;
    }
    const window = windowStates.find((win) => win.id === windowId);
    if (window) {
      if (window.isMinimized) {
        // Minimize edilmiş pencereyi geri getir
        setWindowStates((prev) =>
          prev.map((win) =>
            win.id === windowId ? { ...win, isMinimized: false } : win
          )
        );
        setFocusedWindowId(windowId);
      } else {
        // Açık pencereyi minimize et
        setWindowStates((prev) =>
          prev.map((win) =>
            win.id === windowId ? { ...win, isMinimized: true } : win
          )
        );
        if (focusedWindowId === windowId) {
          setFocusedWindowId(null);
        }
      }
    }
  };

  // Handle menu item clicks from Taskbar/FooterMenu
  const handleMenuItemClick = (menuItem: string) => {
    console.log('handleMenuItemClick called with:', menuItem);
    try {
      let itemToOpen: FileSystemItem | null = null;

    // Handle items from filesystem.ts
    if (
      menuItem === t('myProjects') || menuItem === tFooter('myProjects') || menuItem === tDesktop('myProjects') || menuItem === "My Projects"
    ) {
      itemToOpen = {
        id: 'my-projects-menu',
        type: 'folder',
        label: t('myProjects'),
        translationKey: 'desktop.myProjects',
        children: []
      };
    } else if (menuItem === tFooter('controlPanel') || menuItem === t('controlPanel')) {
      itemToOpen = {
        id: 'control-panel-menu',
        type: 'folder',
        label: tFooter('controlPanel'),
        translationKey: 'desktop.controlPanel',
        children: []
      };
    } else if (
      menuItem === t('myComputer') || menuItem === tFooter('myComputer') || menuItem === tDesktop('myComputer')
    ) {
      itemToOpen = {
        id: 'my-computer-menu',
        type: 'folder',
        label: t('myComputer'),
        translationKey: 'desktop.myComputer',
        children: []
      };
    } else if (
      menuItem === t('recycleBin') || menuItem === tFooter('recycleBin') || menuItem === tDesktop('recycleBin')
    ) {
      itemToOpen = {
        id: 'recycle-bin-menu',
        type: 'folder',
        label: t('recycleBin'),
        translationKey: 'desktop.recycleBin',
        children: []
      };
    } else if (
      menuItem === t('whoAmI') || menuItem === tDesktop('whoAmI') || menuItem === "Who Am I?"
    ) {
      itemToOpen = {
        id: 'who-am-i-menu',
        type: 'folder',
        label: t('whoAmI'),
        translationKey: 'desktop.1',
        children: []
      };
    } else if (
      menuItem === t('aboutme') || menuItem === tDesktop('aboutme') || menuItem === "About Me"
    ) {
      itemToOpen = {
        id: 'about-me-txt',
        type: 'file',
        label: t('aboutme'),
        translationKey: 'desktop.aboutme',
        icon: '/icons/notepad.png'
      };
    } else if (
      menuItem === t('readMe') || menuItem === tDesktop('readMe') || menuItem === "Read Me"
    ) {
      itemToOpen = {
        id: 'read-me-txt',
        type: 'file',
        label: t('readMe'),
        translationKey: 'desktop.readme',
        icon: '/icons/notepad.png'
      };
    } else if (
      menuItem === tGames('paint') || menuItem === t('paint') || menuItem === tDesktop('paint') || menuItem === "Paint"
    ) {
      itemToOpen = {
        id: 'paint',
        type: 'file',
        label: t('paint'),
        translationKey: 'desktop.paint',
        icon: '/icons/680(32x32).png'
      };
    } else if (menuItem === tGames('winamp') || menuItem === t('winamp') || menuItem === "Winamp") {
      // Special handling for Winamp - it opens the Winamp component directly
      setShowWinamp(true);
      setWinampMinimized(false);
      setFocusedWindowId("winamp");
      return;
    }

    if (itemToOpen) {
      console.log('Opening item:', itemToOpen);
      handleOpen(itemToOpen);
    } else {
      console.log('No item found for menuItem:', menuItem);
    }
    } catch (error) {
      console.error('Error in handleMenuItemClick:', error);
    }
  };

  // Desktop icon'ları için çeviri yapılmış liste oluştur
  const translatedItems = useMemo(() => desktopItems.map(item => ({
    ...item,
    label: item.translationKey ? (
      item.translationKey === 'desktop.1' ? t('whoAmI') :
      item.translationKey === 'desktop.2' ? t('myComputer') :
      item.translationKey === 'desktop.3' ? t('hobbies') :
      item.translationKey === 'desktop.myComputer' ? t('myComputer') :
      item.translationKey === 'desktop.recycleBin' ? t('recycleBin') :
      item.translationKey === 'desktop.myProjects' ? t('myProjects') :
      item.translationKey === 'desktop.paint' ? t('paint') :
      item.translationKey === 'desktop.readme' ? t('readMe') :
      item.translationKey === 'desktop.networkNeighborhood' ? t('networkNeighborhood') :
      item.label) : item.label
  })), [t]);

  // Taskbar için app listesi oluştur
  const taskbarApps = [
    ...windowStates.map((windowState) => ({
      id: windowState.id,
      header: {
        icon: getWindowIcon(windowState.item),
        title: getWindowTitle(windowState.item),
        noFooterWindow: false,
      },
    })),
    ...(showWinamp ? [{
      id: "winamp",
      header: {
        icon: "/icons/winamp.png",
        title: "Winamp",
        noFooterWindow: false,
      },
    }] : [])
  ];

  // Window title ve icon helper fonksiyonları
  function getWindowTitle(item: FileSystemItem): string {
    if (item.translationKey === 'desktop.myProjects') {
      return t('myProjects');
    } else if (item.translationKey === 'desktop.controlPanel') {
      return t('controlPanel');
    } else if (item.translationKey === 'desktop.1') {
      return t('whoAmI');
    } else if (item.translationKey === 'desktop.recycleBin') {
      return t('recycleBin');
    } else if (item.translationKey === 'desktop.paint') {
      return t('paint');
    } else if (item.translationKey === 'desktop.aboutme') {
      return t('aboutme');
    } else if (item.translationKey === 'desktop.readme') {
      return t('readMe');
    } else if (item.translationKey === 'desktop.gtaCheats') {
      return t('gtaCheats');
    } else if (item.id === 'gtaViceCity') {
      return 'GTA Vice City';
    } else {
      return t('myComputer');
    }
  }

  function getWindowIcon(item: FileSystemItem): string {
    if (item.translationKey === 'desktop.myProjects') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.controlPanel') {
      return "/icons/control-panel.png";
    } else if (item.translationKey === 'desktop.1') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.recycleBin') {
      return "/icons/recycle.png";
    } else if (item.translationKey === 'desktop.paint') {
      return "/icons/680(16x16).png";
    } else if (item.translationKey === 'desktop.aboutme') {
      return "/icons/notepad.png";
    } else if (item.translationKey === 'desktop.readme') {
      return "/icons/notepad.png";
    } else if (item.translationKey === 'desktop.gtaCheats') {
      return "/icons/notepad.png";
    } else if (item.id === 'gtaViceCity') {
      return "/icons/gtavc.ico";
    } else {
      return "/icons/MyComputer.png";
    }
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Sağ tık ise hiçbir şey yapma
    if (e.button === 2) return;
    // Sadece sol tık için
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    // Eğer tıklanan yer bir pencere ise seçim başlatma
    if (target.closest('.xp-window')) return;
    // Eğer tıklanan yer footer veya footer içindeki bir eleman ise seçim başlatma
    if (
      target.closest('footer') ||
      target.classList.contains('footer__window')
    ) {
      return;
    }
    // Eğer tıklanan yer bir DesktopIcon değilse highlight'ı kaldır
    if (!target.closest('.desktop-icon')) {
      setHighlightedIconId(null);
    }
    setHighlightedByBox([]);
    setStartPos({ x: e.pageX, y: e.pageY });
    setIsDragging(false);
  }

  // Document seviyesinde mousemove
  const handleDocumentMouseMove = useCallback((e: MouseEvent) => {
    setMouse(prev => {
      if (!startPos) return prev;
      const dx = Math.abs(e.pageX - startPos.x);
      const dy = Math.abs(e.pageY - startPos.y);
      const threshold = 3; // px
      if (!isDragging && (dx > threshold || dy > threshold)) {
        setIsDragging(true);
        return { docX: e.pageX, docY: e.pageY };
      } else if (isDragging) {
        return { docX: e.pageX, docY: e.pageY };
      }
      return prev;
    });
  }, [startPos, isDragging]);

  // Document seviyesinde mouseup
  const handleDocumentMouseUp = useCallback(() => {
    setStartPos(null);
    setMouse({ docX: 0, docY: 0 });
    setIsDragging(false);
  }, []);

  // Seçim kutusu aktifken event listener ekle/kaldır
  useEffect(() => {
    if (startPos !== null) {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleDocumentMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleDocumentMouseMove);
        document.removeEventListener('mouseup', handleDocumentMouseUp);
      };
    }
  }, [startPos, handleDocumentMouseMove, handleDocumentMouseUp]);

  useEffect(() => {
    if (isDragging && startPos && (mouse.docX !== startPos.x || mouse.docY !== startPos.y)) {
      const x1 = Math.min(startPos.x, mouse.docX);
      const y1 = Math.min(startPos.y, mouse.docY);
      const x2 = Math.max(startPos.x, mouse.docX);
      const y2 = Math.max(startPos.y, mouse.docY);
      const highlighted: string[] = [];
      iconRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Desktop'ın sol üst köşesini referans al
          const desktopRect = document.querySelector('.desktop-root')?.getBoundingClientRect();
          const ix1 = rect.left - (desktopRect?.left || 0);
          const iy1 = rect.top - (desktopRect?.top || 0);
          const ix2 = ix1 + rect.width;
          const iy2 = iy1 + rect.height;
          if (x1 < ix2 && x2 > ix1 && y1 < iy2 && y2 > iy1) {
            highlighted.push(translatedItems[idx].id);
          }
        }
      });
      setHighlightedByBox(highlighted);
    }
  }, [isDragging, startPos, mouse, translatedItems]);

  useEffect(() => {
    console.log("contextMenu CHANGED", contextMenu);
  }, [contextMenu]);

  const refreshDesktop = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 100); // 100ms refresh effect (much faster)
  };

  // Winamp'ı kapatınca taskbar'dan da kaldıracak fonksiyon
  const handleWinampClose = () => {
    console.log('handleWinampClose çağrıldı');
    setShowWinamp(false);
    setWinampMinimized(false);
    if (focusedWindowId === "winamp") setFocusedWindowId(null);
  };

  return (
    <DesktopContext.Provider value={{ handleOpen, refreshDesktop }}>
      <div
        className="desktop-root"
        style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
        onMouseDown={handleMouseDown}
        onContextMenu={e => {
          e.preventDefault();
          // Eğer sağ tıklanan yer bir pencere ise context menu açma
          if ((e.target as HTMLElement).closest('.xp-window')) return;
          setContextMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        {contextMenu && (
          <>
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
              }}
              onClick={() => setContextMenu(null)}
              onMouseDown={() => setContextMenu(null)}
            />
            <DesktopContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={() => setContextMenu(null)}
            />
          </>
        )}
        {isDragging && startPos && (mouse.docX !== startPos.x || mouse.docY !== startPos.y) && (
          <DashedBox mouse={mouse} startPos={startPos} />
        )}
        <div className="relative w-screen h-screen min-h-screen overflow-hidden font-sans">
          <div 
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/wallpapers/xp-bliss-placeholder.jpeg")'
            }}
          />

          <div className="absolute left-6 top-6 flex flex-col gap-4 select-none">
            {!isRefreshing && translatedItems.map((item: FileSystemItem, idx: number) => {
              let highlighted = false;
              if (highlightedByBox.includes(item.id)) {
                highlighted = true;
              }
              if (highlightedIconId === item.id) {
                highlighted = true;
              }
              return (
                <div
                  ref={el => { iconRefs.current[idx] = el; }}
                  key={item.id}
                >
                  <DesktopIcon
                    icon={item.icon ? <Image src={item.icon} alt={item.label} className="w-8 h-8" width={32} height={32} /> : undefined}
                    label={item.label}
                    highlighted={highlighted}
                    onHighlight={() => setHighlightedIconId(item.id)}
                    onDoubleClick={() => handleOpen(item)}
                  />
                </div>
              );
            })}
          </div>
          {/* Winamp doğrudan arayüzü */}
          {showWinamp && !winampMinimized && (
            <WinampApp onClose={handleWinampClose} />
          )}

          {/* Açık pencereleri göster */}
          {windowStates
            .filter((windowState) => !windowState.isMinimized)
            .map((windowState) => (
              <XpWindow
                key={windowState.id}
                item={windowState.item}
                windowState={windowState}
                onClose={() => handleClose(windowState.id)}
                onMinimize={() => handleMinimize(windowState.id)}
                onMaximize={() => handleMaximize(windowState.id)}
                onFocus={() => handleWindowFocus(windowState.id)}
                onResize={(x, y, width, height) => handleWindowResize(windowState.id, x, y, width, height)}
                isFocused={focusedWindowId === windowState.id}
              />
            ))}


          {/* Taskbar */}
          <Taskbar
            apps={taskbarApps}
            focusedAppId={focusedWindowId}
            onMouseDown={() => {}}
            onClickMenuItem={handleMenuItemClick}
            onWindowClick={handleTaskbarWindowClick}
          />
        </div>
      </div>
    </DesktopContext.Provider>
  );
} 