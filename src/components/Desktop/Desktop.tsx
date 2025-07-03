"use client";
// TODO  İşaretçi seçimi ekle (Winxp tarzı).
// TODO  README dosyasını ve AboutMe dosyasını güncelle. Neden?
// TODO  Paint component ekle (Udemy sertifikası, fotoğraflar vs.)
// TODO  Dosyaları Tekrar Düzenle son halini almasını sağla.
// TODO  Türkçe ve ingilizceyi tam hale getir.
// TODO  Cursors güncelle
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

export const DesktopContext = createContext<{ handleOpen: (item: FileSystemItem) => void } | undefined>(undefined);

export default function Desktop() {
  const [windowStates, setWindowStates] = useState<WindowState[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [highlightedIconId, setHighlightedIconId] = useState<string | null>(null);
  const t = useTranslations('desktop');
  const tFooter = useTranslations('footer');
  const OFFSET = 32;
  const [startPos, setStartPos] = useState<null | { x: number; y: number }>(null);
  const [mouse, setMouse] = useState<{ docX: number; docY: number }>({ docX: 0, docY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightedByBox, setHighlightedByBox] = useState<string[]>([]);

  const handleOpen = (item: FileSystemItem) => {
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
      const newWindow: WindowState = {
        id: item.id,
        item: item,
        isMinimized: false,
        isMaximized: false,
        x: baseX,
        y: baseY,
        width: 1150,
        height: 500,
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
    setWindowStates((prev) => prev.filter((win) => win.id !== windowId));
    if (focusedWindowId === windowId) {
      setFocusedWindowId(null);
    }
  };

  const handleMinimize = (windowId: string) => {
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
    let itemToOpen: FileSystemItem | null = null;

    if (menuItem === t('myDocuments') || menuItem === tFooter('myDocuments')) {
      itemToOpen = {
        id: 'my-documents-menu',
        type: 'folder',
        label: t('myDocuments'),
        translationKey: 'desktop.myDocuments',
        children: []
      };
    } else if (menuItem === tFooter('controlPanel')) {
      itemToOpen = {
        id: 'control-panel-menu',
        type: 'folder',
        label: tFooter('controlPanel'),
        translationKey: 'desktop.controlPanel',
        children: []
      };
    } else if (menuItem === t('myComputer') || menuItem === tFooter('myComputer')) {
      itemToOpen = {
        id: 'my-computer-menu',
        type: 'folder',
        label: t('myComputer'),
        translationKey: 'desktop.myComputer',
        children: []
      };
    } else if (menuItem === t('recycleBin') || menuItem === tFooter('recycleBin')) {
      itemToOpen = {
        id: 'recycle-bin-menu',
        type: 'folder',
        label: t('recycleBin'),
        translationKey: 'desktop.recycleBin',
        children: []
      };
    }

    if (itemToOpen) {
      handleOpen(itemToOpen);
    }
  };

  // Use next-intl translations instead of hardcoded Turkish labels
  const translatedItems = useMemo(() => desktopItems.map((item: FileSystemItem) => ({
    ...item,
    label: item.translationKey ? 
      (item.translationKey === 'desktop.1' ? t('whoAmI') :
       item.translationKey === 'desktop.2' ? t('projects') :
       item.translationKey === 'desktop.3' ? t('hobbies') :
       item.translationKey === 'desktop.myComputer' ? t('myComputer') :
       item.translationKey === 'desktop.recycleBin' ? t('recycleBin') :
       item.translationKey === 'desktop.myDocuments' ? t('myDocuments') :
       item.translationKey === 'desktop.networkNeighborhood' ? t('networkNeighborhood') :
       item.label) : item.label
  })), [desktopItems, t, tFooter]);

  // Taskbar için app listesi oluştur
  const taskbarApps = windowStates.map((windowState) => ({
    id: windowState.id,
    header: {
      icon: getWindowIcon(windowState.item),
      title: getWindowTitle(windowState.item),
      noFooterWindow: false,
    },
  }));

  // Window title ve icon helper fonksiyonları
  function getWindowTitle(item: FileSystemItem): string {
    if (item.translationKey === 'desktop.myDocuments') {
      return t('myDocuments');
    } else if (item.translationKey === 'desktop.controlPanel') {
      return t('controlPanel');
    } else if (item.translationKey === 'desktop.1') {
      return t('whoAmI');
    } else if (item.translationKey === 'desktop.recycleBin') {
      return t('recycleBin');
    } else {
      return t('myComputer');
    }
  }

  function getWindowIcon(item: FileSystemItem): string {
    if (item.translationKey === 'desktop.myDocuments') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.controlPanel') {
      return "/icons/control-panel.png";
    } else if (item.translationKey === 'desktop.1') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.recycleBin') {
      return "/icons/recycle.png";
    } else {
      return "/icons/MyComputer.png";
    }
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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

  return (
    <DesktopContext.Provider value={{ handleOpen }}>
      <div
        className="desktop-root"
        style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
        onMouseDown={handleMouseDown}
      >
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
            {translatedItems.map((item: FileSystemItem, idx: number) => {
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