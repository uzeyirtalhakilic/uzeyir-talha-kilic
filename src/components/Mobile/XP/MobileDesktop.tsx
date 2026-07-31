"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { FileSystemItem, desktopItems } from "../../WindowsXP/data/filesystem";
import { DesktopContext } from "../../WindowsXP/Desktop/Desktop";
import DesktopIcon from "../../WindowsXP/Desktop/DesktopIcon";
import Footer from "../../WindowsXP/Footer/index";
import ShutdownModal, { PowerMode } from "../../WindowsXP/Modal/ShutdownModal";
import MobileWindow, { getMobileWindowTitle, getMobileWindowIcon } from "./MobileWindow";
import "../../../styles/desktop.css";

const WinampApp = dynamic(() => import("../../WindowsXP/Winamp/WinampApp"), { ssr: false });

const MobileDesktop: React.FC = () => {
  const t = useTranslations('desktop');
  const tFooter = useTranslations('footer');
  const tGames = useTranslations('games');
  const tAddressBar = useTranslations('folderView.addressBar');
  const tWhoAmI = useTranslations('folderView.whoAmI');
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const currentLocale = (params.locale as string) || locale;

  const [openItem, setOpenItem] = useState<FileSystemItem | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [focusedAppId, setFocusedAppId] = useState<string | null>(null);
  const [showWinamp, setShowWinamp] = useState(false);
  const [winampMinimized, setWinampMinimized] = useState(false);
  const [powerModal, setPowerModal] = useState<PowerMode | null>(null);

  // Telefonun "geri" tuşu siteden direkt çıkmasın, gerçek bir gezinme geçmişi gibi
  // davransın: Projelerim'e Ben Kimim?'den girdiysen geri tuşu önce Ben Kimim?'e
  // döner, sonra masaüstüne. Her ekran değişiminde (ister ikonla, ister bir
  // pencerenin içinden DesktopContext ile - ör. WhoAmI -> Experience -> Terminal)
  // eskisini bir yığına atıp sahte bir geçmiş kaydı ekliyoruz; geri tuşu (popstate)
  // yığından bir önceki ekranı geri getiriyor.
  type MobileScreen =
    | { kind: 'desktop' }
    | { kind: 'item'; item: FileSystemItem }
    | { kind: 'winamp' };

  const screenKey = (s: MobileScreen) => s.kind === 'item' ? `item:${s.item.id}` : s.kind;

  const currentScreen: MobileScreen =
    (showWinamp && !winampMinimized) ? { kind: 'winamp' } :
    (openItem && !isMinimized) ? { kind: 'item', item: openItem } :
    { kind: 'desktop' };

  const screenStackRef = useRef<MobileScreen[]>([]);
  const prevScreenRef = useRef<MobileScreen>(currentScreen);

  useEffect(() => {
    const prev = prevScreenRef.current;
    if (screenKey(prev) !== screenKey(currentScreen)) {
      if (currentScreen.kind === 'desktop') {
        // Masaüstüne dönüldü (ör. X ile kapatıldı) - geçmiş yığınını da sıfırla
        screenStackRef.current = [];
      } else {
        screenStackRef.current.push(prev);
        window.history.pushState({}, '');
      }
      prevScreenRef.current = currentScreen;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenKey(currentScreen)]);

  useEffect(() => {
    function onPopState() {
      if (powerModal) {
        setPowerModal(null);
        return;
      }
      const prev = screenStackRef.current.pop();
      if (!prev || prev.kind === 'desktop') {
        setOpenItem(null);
        setShowWinamp(false);
        setFocusedAppId(null);
      } else if (prev.kind === 'item') {
        setShowWinamp(false);
        setOpenItem(prev.item);
        setIsMinimized(false);
        setFocusedAppId(prev.item.id);
      } else {
        setOpenItem(null);
        setShowWinamp(true);
        setWinampMinimized(false);
        setFocusedAppId('winamp');
      }
      // Bu geri dönüşün kendisi bir sonraki render'da "yeni ekrana geçiş" gibi
      // algılanıp tekrar geçmişe eklenmesin diye referansı da güncelliyoruz.
      prevScreenRef.current = prev ?? { kind: 'desktop' };
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [powerModal]);

  const handleOpen = (item: FileSystemItem) => {
    if (item.id === 'winamp') {
      setShowWinamp(true);
      setWinampMinimized(false);
      setFocusedAppId('winamp');
      return;
    }
    setOpenItem(item);
    setIsMinimized(false);
    setFocusedAppId(item.id);
  };

  const handleCloseWindow = () => {
    setOpenItem(null);
    setFocusedAppId(null);
  };

  const handleWinampClose = () => {
    setShowWinamp(false);
    setWinampMinimized(false);
    if (focusedAppId === 'winamp') setFocusedAppId(null);
  };

  // Taskbar'daki çalışan program butonuna basınca gerçek masaüstündeki gibi küçült/geri getir
  const handleTaskbarWindowClick = (id: string) => {
    if (id === 'winamp') {
      setWinampMinimized(prev => {
        const next = !prev;
        setFocusedAppId(next ? null : 'winamp');
        return next;
      });
      return;
    }
    if (openItem && id === openItem.id) {
      setIsMinimized(prev => {
        const next = !prev;
        setFocusedAppId(next ? null : id);
        return next;
      });
    }
  };

  // Başlat menüsü tıklamaları - Desktop.tsx'teki handleMenuItemClick ile birebir aynı eşlemeler
  const handleMenuItemClick = (menuItem: string) => {
    if (menuItem === tFooter('logOff')) {
      setPowerModal('logoff');
      return;
    }
    if (menuItem === tFooter('turnOffComputer')) {
      setPowerModal('turnoff');
      return;
    }

    let itemToOpen: FileSystemItem | null = null;

    if (menuItem === t('myProjects') || menuItem === tFooter('myProjects') || menuItem === "My Projects") {
      itemToOpen = { id: 'my-projects-menu', type: 'folder', label: t('myProjects'), translationKey: 'desktop.myProjects', children: [] };
    } else if (menuItem === t('myComputer') || menuItem === tFooter('myComputer')) {
      itemToOpen = { id: 'my-computer-menu', type: 'folder', label: t('myComputer'), translationKey: 'desktop.myComputer', children: [] };
    } else if (menuItem === t('recycleBin') || menuItem === tFooter('recycleBin')) {
      itemToOpen = { id: 'recycle-bin-menu', type: 'folder', label: t('recycleBin'), translationKey: 'desktop.recycleBin', children: [] };
    } else if (menuItem === t('whoAmI') || menuItem === "Who Am I?") {
      itemToOpen = { id: 'who-am-i-menu', type: 'folder', label: t('whoAmI'), translationKey: 'desktop.1', children: [] };
    } else if (menuItem === t('aboutme') || menuItem === "About Me") {
      itemToOpen = { id: 'about-me-txt', type: 'file', label: t('aboutme'), translationKey: 'desktop.aboutme', icon: '/icons/notepad.png' };
    } else if (menuItem === t('readMe') || menuItem === "Read Me") {
      itemToOpen = { id: 'read-me-txt', type: 'file', label: t('readMe'), translationKey: 'desktop.readme', icon: '/icons/notepad.png' };
    } else if (menuItem === tGames('paint') || menuItem === t('paint') || menuItem === "Paint") {
      itemToOpen = { id: 'paint', type: 'file', label: t('paint'), translationKey: 'desktop.paint', icon: '/icons/680(32x32).png' };
    } else if (menuItem === tGames('minesweeper') || menuItem === "Minesweeper") {
      itemToOpen = { id: 'minesweeper-game', type: 'file', label: tGames('minesweeper'), translationKey: 'games.minesweeper', icon: '/icons/mine-icon.png' };
    } else if (menuItem === tGames('winamp') || menuItem === t('winamp') || menuItem === "Winamp") {
      setShowWinamp(true);
      setWinampMinimized(false);
      setFocusedAppId('winamp');
      return;
    }

    if (itemToOpen) {
      handleOpen(itemToOpen);
    }
  };

  // Gerçek masaüstündeki ikonların birebir aynısı (My Computer, Recycle Bin, Who Am I?, ReadMe.txt)
  const translatedIcons = desktopItems.map(item => ({
    ...item,
    label:
      item.translationKey === 'desktop.myComputer' ? t('myComputer') :
      item.translationKey === 'desktop.recycleBin' ? t('recycleBin') :
      item.translationKey === 'desktop.1' ? t('whoAmI') :
      item.translationKey === 'desktop.readme' ? t('readMe') :
      item.label,
  }));

  const taskbarApps = [
    ...(openItem ? [{
      id: openItem.id,
      header: {
        icon: getMobileWindowIcon(openItem),
        title: getMobileWindowTitle(openItem, tAddressBar, t, tGames, tWhoAmI),
        noFooterWindow: false,
      },
    }] : []),
    ...(showWinamp ? [{
      id: "winamp",
      header: { icon: "/icons/winamp.png", title: "Winamp", noFooterWindow: false },
    }] : []),
  ];

  return (
    <DesktopContext.Provider value={{ handleOpen, isMobile: true }}>
      <div className={`mobile-xp-root${powerModal ? ' powering-off' : ''}`}>
        <div className="mobile-xp-icons">
          {translatedIcons.map(item => (
            <div key={item.id} className="mobile-xp-icon-wrap">
              <DesktopIcon
                icon={item.icon ? <Image src={item.icon} alt={item.label} width={40} height={40} /> : undefined}
                label={item.label}
                onHighlight={() => handleOpen(item)}
              />
            </div>
          ))}
        </div>

        {showWinamp && !winampMinimized && <WinampApp onClose={handleWinampClose} />}

        {openItem && !isMinimized && (
          <MobileWindow item={openItem} onClose={handleCloseWindow} />
        )}

        <Footer
          apps={taskbarApps}
          focusedAppId={focusedAppId}
          onMouseDown={() => {}}
          onClickMenuItem={handleMenuItemClick}
          onWindowClick={handleTaskbarWindowClick}
        />

        {powerModal && (
          <ShutdownModal
            mode={powerModal}
            onClose={() => setPowerModal(null)}
            onClickButton={() => router.push(`/${currentLocale}/Not-Today`)}
          />
        )}
      </div>
    </DesktopContext.Provider>
  );
};

export default MobileDesktop;
