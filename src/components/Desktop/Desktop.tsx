"use client";
// TODO: SideBar sabit olmalı.
//?      Gerekli Dosyaları/Videoları(Belki) Ekle
//?      Belki yeni Icon tasarlayabilirim

import DesktopIcon from "./DesktopIcon";
import { desktopItems, FileSystemItem } from "../../data/filesystem";
import React, { useState, createContext } from "react";
import XpWindow from "./XpWindow";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations('desktop');
  const tFooter = useTranslations('footer');
  const OFFSET = 32;

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
              height: 700,
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
    setWindowStates((prev) =>
      prev.map((win) =>
        win.id === windowId ? { ...win, x, y, width, height } : win
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
  const translatedItems = desktopItems.map((item: FileSystemItem) => ({
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
  }));

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

  return (
    <DesktopContext.Provider value={{ handleOpen }}>
      <div className="relative w-screen h-screen min-h-screen overflow-hidden font-sans">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/wallpapers/xp-bliss-placeholder.jpeg")'
          }}
        />

        <div className="absolute left-6 top-6 flex flex-col gap-4 select-none">
          {translatedItems.map((item: FileSystemItem) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon ? <Image src={item.icon} alt={item.label} className="w-8 h-8" width={32} height={32} /> : undefined}
              label={item.label}
              onClick={() => handleOpen(item)}
            />
          ))}
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

        {/* Taskbar
        <Taskbar
          apps={taskbarApps}
          focusedAppId={focusedWindowId}
          onMouseDown={() => {}}
          onClickMenuItem={handleMenuItemClick}
          onWindowClick={handleTaskbarWindowClick}
        />
        */}
      </div>
    </DesktopContext.Provider>
  );
} 