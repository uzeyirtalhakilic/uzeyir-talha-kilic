import React, { useState, useRef, useEffect, useCallback } from "react";
import { FileSystemItem } from "../../data/filesystem";
import Image from 'next/image';
import MyComputer from "../FolderView/MyComputer/MyComputer";
import MyDocuments from "../FolderView/MyDocuments/MyDocuments";
import ControlPanel from "../FolderView/ControlPanel/ControlPanel";
import WhoAmI from "../FolderView/WhoAmI/WhoAmI";
import { useTranslations } from 'next-intl';


interface XpWindowProps {
  item: FileSystemItem;
  onClose: () => void;
  path?: string;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isMinimized: boolean;
}

const XpWindow: React.FC<XpWindowProps> = ({ item, onClose }) => {
  const t = useTranslations('folderView.addressBar');
  const tDesktop = useTranslations('desktop');
  const [windowState, setWindowState] = useState<WindowState>({
    x: window.innerWidth / 2 - 500,
    y: 50,
    width: 1000,
    height: 700,
    isMaximized: false,
    isMinimized: false,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 300;
  const MAX_WIDTH = window.innerWidth - 50;
  const MAX_HEIGHT = window.innerHeight - 100;

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    
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
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - windowState.height));
      
      setWindowState(prev => ({
        ...prev,
        x: clampedX,
        y: clampedY,
      }));
    } else if (isResizing && !windowState.isMaximized) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.windowX;
      let newY = resizeStart.windowY;

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeStart.width + deltaX));
      }
      if (resizeDirection.includes('w')) {
        const widthChange = Math.max(-resizeStart.width + MIN_WIDTH, Math.min(deltaX, resizeStart.width - MIN_WIDTH));
        newWidth = resizeStart.width - widthChange;
        newX = resizeStart.windowX + widthChange;
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, resizeStart.height + deltaY));
      }
      if (resizeDirection.includes('n')) {
        const heightChange = Math.max(-resizeStart.height + MIN_HEIGHT, Math.min(deltaY, resizeStart.height - MIN_HEIGHT));
        newHeight = resizeStart.height - heightChange;
        newY = resizeStart.windowY + heightChange;
      }

      // Ekran sınırlarını kontrol et
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - newWidth));
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - newHeight));

      setWindowState(prev => ({
        ...prev,
        x: clampedX,
        y: clampedY,
        width: newWidth,
        height: newHeight,
      }));
    }
  }, [isDragging, isResizing, windowState.isMaximized, windowState.width, windowState.height, dragStart, resizeStart, resizeDirection, MIN_WIDTH, MIN_HEIGHT, MAX_WIDTH, MAX_HEIGHT]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  };

  // Window controls
  const handleMinimize = () => {
    setWindowState(prev => ({ ...prev, isMinimized: true }));
  };

  const handleMaximize = () => {
    if (windowState.isMaximized) {
      // Restore
      setWindowState(prev => ({
        ...prev,
        isMaximized: false,
        x: window.innerWidth / 2 - 500,
        y: 50,
        width: 1000,
        height: 700,
      }));
    } else {
      // Maximize
      setWindowState(prev => ({
        ...prev,
        isMaximized: true,
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 40, // Taskbar için alan bırak
      }));
    }
  };

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
  }, [isDragging, isResizing, windowState, dragStart, resizeStart, resizeDirection, handleMouseMove]);

  // Determine which component to render based on item
  const getWindowContent = () => {
    if (item.translationKey === 'desktop.myDocuments') {
      return <MyDocuments onClose={onClose} />;
    } else if (item.translationKey === 'desktop.controlPanel') {
      return <ControlPanel onClose={onClose} />;
    } else if (item.translationKey === 'desktop.1') {
      return <WhoAmI onClose={onClose} />;
    } else {
      return <MyComputer onClose={onClose} />;
    }
  };

  // Get window title and icon based on item
  const getWindowTitle = () => {
    if (item.translationKey === 'desktop.myDocuments') {
      return tDesktop('myDocuments');
    } else if (item.translationKey === 'desktop.controlPanel') {
      return tDesktop('controlPanel');
    } else if (item.translationKey === 'desktop.1') {
      return tDesktop('whoAmI');
    } else {
      return t('myComputer');
    }
  };

  const getWindowIcon = () => {
    if (item.translationKey === 'desktop.myDocuments') {
      return "/icons/folderdocument.png";
    } else if (item.translationKey === 'desktop.controlPanel') {
      return "/icons/control-panel.png";
    } else if (item.translationKey === 'desktop.1') {
      return "/icons/msword.png";
    } else {
      return "/icons/MyComputer.png";
    }
  };

  if (windowState.isMinimized) {
    return null; // Minimized durumda pencereyi gizle
  }

  const windowStyle = {
    position: 'absolute' as const,
    left: windowState.x,
    top: windowState.y,
    width: windowState.width,
    height: windowState.height,
    background: "white",
    fontFamily: "Tahoma, Arial, sans-serif",
    overflow: "hidden",
    boxShadow: "0 8px 32px 0 rgba(60, 90, 170, 0.25)",
    border: "1px solid #b5cbe9",
    borderRadius: windowState.isMaximized ? "0" : "8px",
    zIndex: 20,
  };

  const windowClasses = [
    'xp-window',
    windowState.isMaximized ? 'maximized' : '',
    isDragging ? 'dragging' : '',
    isResizing ? 'resizing' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={windowRef} className={windowClasses} style={windowStyle}>
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        className="title-bar"
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        <div className="title-bar-left">
          <div className="title-bar-icon">
            <Image src={getWindowIcon()} alt={getWindowTitle()} width={16} height={16} />
          </div>
          <div className="title-bar-text">{getWindowTitle()}</div>
        </div>
        <div className="title-bar-right">
          <button className="title-bar-button minimize" onClick={handleMinimize}>
            <span>_</span>
          </button>
          <button className="title-bar-button maximize" onClick={handleMaximize}>
            <span>{windowState.isMaximized ? '❐' : '□'}</span>
          </button>
          <button className="title-bar-button close" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content">
        <div style={{ width: '100%', height: '100%' }}>
          {getWindowContent()}
        </div>
      </div>

      {/* Resize Handles */}
      {!windowState.isMaximized && (
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