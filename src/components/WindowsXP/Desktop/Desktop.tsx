"use client";

import DesktopIcon from "./DesktopIcon";
import { desktopItems, FileSystemItem } from "../../WindowsXP/data/filesystem";
import React, { useState, createContext, useRef, useEffect, useMemo, useCallback } from "react";
import XpWindow from "./XpWindow";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Taskbar from "./Taskbar";
import DashedBox from "../../WindowsXP/DashedBox/DashedBox";
import DesktopContextMenu from "./DesktopContextMenu";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import ShutdownModal, { PowerMode } from "../Modal/ShutdownModal";

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

export const DesktopContext = createContext<{ handleOpen: (item: FileSystemItem, position?: { x: number; y: number }) => void, refreshDesktop?: () => void } | undefined>(undefined);

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
  const [powerModal, setPowerModal] = useState<PowerMode | null>(null);
  const router = useRouter();
  const locale = useLocale();

  // --- Gizli masaüstü ızgarası (icon grid) ---
  const CELL_W = 100;
  const CELL_H = 100;
  const GRID_LEFT = 24;
  const GRID_TOP = 24;

  const [iconPositions, setIconPositions] = useState<Record<string, { col: number; row: number }>>(() => {
    const initial: Record<string, { col: number; row: number }> = {};
    desktopItems.forEach((item, idx) => {
      initial[item.id] = { col: 0, row: idx };
    });
    return initial;
  });
  // Sürükleme sırasında ikonların anlık piksel ofseti
  const [iconDrag, setIconDrag] = useState<{ ids: string[]; dx: number; dy: number } | null>(null);

  const getGridBounds = () => {
    const cols = Math.max(1, Math.floor((window.innerWidth - GRID_LEFT) / CELL_W));
    const rows = Math.max(1, Math.floor((window.innerHeight - 30 - GRID_TOP) / CELL_H));
    return { cols, rows };
  };

  // Bırakılan ikonları en yakın boş ızgara hücresine oturt
  const snapDraggedIcons = (ids: string[], dx: number, dy: number) => {
    setIconPositions(prev => {
      const { cols, rows } = getGridBounds();
      let dCol = Math.round(dx / CELL_W);
      let dRow = Math.round(dy / CELL_H);
      // Grup halinde taşırken hiçbir ikon ekran dışına çıkmasın
      ids.forEach(id => {
        const pos = prev[id];
        if (!pos) return;
        dCol = Math.max(-pos.col, Math.min(dCol, cols - 1 - pos.col));
        dRow = Math.max(-pos.row, Math.min(dRow, rows - 1 - pos.row));
      });
      const occupied = new Set(
        Object.entries(prev)
          .filter(([id]) => !ids.includes(id))
          .map(([, p]) => `${p.col},${p.row}`)
      );
      const next = { ...prev };
      ids.forEach(id => {
        const pos = prev[id];
        if (!pos) return;
        let target = { col: pos.col + dCol, row: pos.row + dRow };
        if (occupied.has(`${target.col},${target.row}`)) {
          // Hedef hücre doluysa en yakın boş hücreyi bul
          let best: { col: number; row: number } | null = null;
          let bestDist = Infinity;
          for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
              if (occupied.has(`${c},${r}`)) continue;
              const dist = (c - target.col) ** 2 + (r - target.row) ** 2;
              if (dist < bestDist) {
                bestDist = dist;
                best = { col: c, row: r };
              }
            }
          }
          if (best) target = best;
        }
        occupied.add(`${target.col},${target.row}`);
        next[id] = target;
      });
      return next;
    });
  };

  const handleIconMouseDown = (e: React.MouseEvent, item: FileSystemItem) => {
    if (e.button !== 0) return;
    // Masaüstü seçim kutusunun (DashedBox) başlamasını engelle
    e.stopPropagation();
    // Tarayıcının yerleşik resim sürüklemesini engelle (yoksa mouseup kaçar, ikon imlece yapışık kalır)
    e.preventDefault();
    // DashedBox ile seçilmiş bir grubun parçasıysa grubu birlikte taşı
    const ids = highlightedByBox.includes(item.id) ? highlightedByBox : [item.id];
    if (!highlightedByBox.includes(item.id)) {
      setHighlightedByBox([]);
      setHighlightedIconId(item.id);
    }
    const startX = e.pageX;
    const startY = e.pageY;
    const drag = { moved: false };

    const onMove = (ev: MouseEvent) => {
      // Sol tuş bırakılmışsa (mouseup bir şekilde kaçtıysa) sürüklemeyi bitir
      if (ev.buttons === 0) {
        onUp(ev);
        return;
      }
      const dx = ev.pageX - startX;
      const dy = ev.pageY - startY;
      if (!drag.moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      drag.moved = true;
      setIconDrag({ ids, dx, dy });
    };
    const onUp = (ev: MouseEvent) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      setIconDrag(null);
      if (drag.moved) {
        snapDraggedIcons(ids, ev.pageX - startX, ev.pageY - startY);
      } else if (ids.length > 1) {
        // Gruptaki bir ikona sürüklemeden tıklanırsa seçim o ikona daralır (Windows davranışı)
        setHighlightedByBox([]);
        setHighlightedIconId(item.id);
      }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleOpen = (item: FileSystemItem, position?: { x: number; y: number }) => {
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
      } else if (item.translationKey === 'desktop.experienceTerminal') {
        width = 900;
        height = 470;
      } else if (item.translationKey === 'games.minesweeper') {
        // Beginner boyutu; oyun açıldığında ResizeObserver pencereyi içeriğe göre ayarlar
        width = 165;
        height = 258;
      }
      // İstenirse pencere belirtilen konumda açılır (ekran sınırlarına kırpılır)
      if (position) {
        baseX = Math.max(0, Math.min(position.x, window.innerWidth - width));
        baseY = Math.max(0, Math.min(position.y, window.innerHeight - 40 - height));
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

    // Oturumu Kapat / Bilgisayarı Kapat -> kapatma modalı
    if (menuItem === tFooter('logOff')) {
      setPowerModal('logoff');
      return;
    }
    if (menuItem === tFooter('turnOffComputer')) {
      setPowerModal('turnoff');
      return;
    }

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
    } else if (menuItem === tGames('minesweeper') || menuItem === "Minesweeper") {
      itemToOpen = {
        id: 'minesweeper-game',
        type: 'file',
        label: tGames('minesweeper'),
        translationKey: 'games.minesweeper',
        icon: '/icons/mine-icon.png'
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
    } else if (item.translationKey === 'desktop.experience') {
      return t('experience');
    } else if (item.translationKey === 'desktop.experienceTerminal') {
      return item.label;
    } else if (item.translationKey === 'games.minesweeper') {
      return tGames('minesweeper');
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
    // İkon üzerinde başlayan mousedown'ı ikon sürükleme yönetiyor; seçim kutusu başlatma
    if (target.closest('.desktop-icon')) return;
    setHighlightedIconId(null);
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
        className={`desktop-root${powerModal ? ' powering-off' : ''}`}
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

          {!isRefreshing && translatedItems.map((item: FileSystemItem, idx: number) => {
            let highlighted = false;
            if (highlightedByBox.includes(item.id)) {
              highlighted = true;
            }
            if (highlightedIconId === item.id) {
              highlighted = true;
            }
            const pos = iconPositions[item.id] ?? { col: 0, row: idx };
            const dragging = iconDrag !== null && iconDrag.ids.includes(item.id);
            return (
              <div
                ref={el => { iconRefs.current[idx] = el; }}
                key={item.id}
                className="select-none"
                style={{
                  position: 'absolute',
                  left: GRID_LEFT + pos.col * CELL_W,
                  top: GRID_TOP + pos.row * CELL_H,
                  width: CELL_W,
                  transform: dragging ? `translate(${iconDrag.dx}px, ${iconDrag.dy}px)` : undefined,
                  zIndex: dragging ? 15 : undefined,
                  opacity: dragging ? 0.75 : undefined,
                }}
                onMouseDown={(e) => handleIconMouseDown(e, item)}
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

          {/* Kapatma / Oturumu kapatma modalı */}
          {powerModal && (
            <ShutdownModal
              mode={powerModal}
              onClose={() => setPowerModal(null)}
              onClickButton={() => router.push(`/${locale}/Not-Today`)}
            />
          )}
        </div>
      </div>
    </DesktopContext.Provider>
  );
} 