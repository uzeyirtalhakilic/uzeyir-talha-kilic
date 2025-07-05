import React, { useContext } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { DesktopContext } from './Desktop';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

// Örnek ikon yolları (public/icons/ klasöründen)
const iconBase = "/icons/";
const DesktopContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const t = useTranslations('desktopContextMenu');
  const desktopContext = useContext(DesktopContext);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [submenuDirection, setSubmenuDirection] = React.useState<'down' | 'up'>("down");
  const menuWidth = 235;
  const menuHeight = 145.2;
  const footerHeight = 30;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const menuPosition = React.useMemo(() => {
    let newX = x;
    let newY = y;
    if (y + menuHeight > windowHeight - footerHeight) {
      newY = y - menuHeight;
      if (newY < 0) newY = 0;
    }
    if (x + menuWidth > windowWidth) {
      newX = windowWidth - menuWidth;
      if (newX < 0) newX = 0;
    }
    return { left: newX, top: newY };
  }, [x, y, windowHeight, windowWidth]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.desktop-context-menu')) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleMenuClick = React.useCallback((itemLabel: string) => {
    if (itemLabel === t('refresh') && desktopContext?.refreshDesktop) {
      desktopContext.refreshDesktop();
    }
    onClose();
  }, [t, desktopContext, onClose]);

  const menuItems = React.useMemo(() => [
    { label: t('view'),
      submenu: [
          { label: t('largeIcons') },
          { label: t('mediumIcons'), selected: true },
          { label: t('smallIcons') },
          { divider: true },
          { label: t('autoArrangeIcons') },
          { label: t('alignIconsToGrid'), checked: true },
          { label: t('showDesktopIcons'), checked: true },
        ],
    },
    { label: t('sortBy'),
      submenu: [
          { label: t('name') },
          { label: t('size') },
          { label: t('itemType') },
          { label: t('dateModified') },
        ],
     },
    { label: t('refresh'), divider: true, onClick: () => handleMenuClick(t('refresh')) },
    { 
      label: t('new'), 
      submenu: [
        { label: t('folder'), icon: iconBase + "folder.png" },
        { divider: true },
        { label: t('msWordDocument'), icon: iconBase + "msword.png" },
        { label: t('msExcelSpreadsheet'), icon: iconBase + "excel.png" },
        { label: t('msPowerPointPresentation'), icon: iconBase + "mspowerpoint.png", divider: true },
        { label: t('winrarArchive'), icon: iconBase + "winrar.png" },
      ],
      divider: true  
    },
    { label: t('properties') },
  ], [t, handleMenuClick]);

  // Check submenu direction on hover
  React.useEffect(() => {
    if (hoveredIndex !== null && Array.isArray(menuItems[hoveredIndex]?.submenu)) {
      // Estimate submenu height
      const itemCount = menuItems[hoveredIndex].submenu.length;
      const itemHeight = 26; // px
      const submenuHeight = itemCount * itemHeight;
      const footerHeight = 30;
      const availableBelow = window.innerHeight - y - footerHeight;
      setSubmenuDirection(availableBelow < submenuHeight ? 'up' : 'down');
    }
  }, [hoveredIndex, y, menuItems]);

  return (
    <div
      style={{
        position: "absolute",
        top: menuPosition ? menuPosition.top : y,
        left: menuPosition ? menuPosition.left : x,
        zIndex: 9999,
        background: "#fff",
        border: "1px solid #bfbfbf",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.12)",
        width: 235,
        height: 145.2,
        fontFamily: 'Tahoma, Arial, sans-serif',
        fontSize: 13,
        padding: "2px 0",
        userSelect: "none",
      }}
      className="desktop-context-menu"
    >
      {menuItems.map((item, idx) => (
        <React.Fragment key={item.label}>
          <div
            className={`flex items-center relative hover:bg-[#e5e5e5] cursor-pointer select-none `}
            style={{
              height: 26,
              paddingLeft: 4,
              paddingRight: 12,
              color: "#222",
              ...(Array.isArray(item.submenu) ? { position: "relative" } : {}),
            }}
            onClick={item.onClick ? item.onClick : onClose}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex((prev) => (prev === idx ? null : prev))}
          >
            {/* İkon */}
            <span style={{ width: 22, display: "inline-block", textAlign: "center" }}></span>
            {/* Menü metni */}
            <span style={{ flex: 1 }}>{item.label}</span>
            {/* Alt menü oku */}
            {Array.isArray(item.submenu) && (
              <span style={{ position: "absolute", right: 6, color: "#888", fontSize: 14, top: "50%", transform: "translateY(-50%)" }}>
                ▶
              </span>
            )}
            {/* Submenu rendering */}
            {Array.isArray(item.submenu) && hoveredIndex === idx && (
              <div
                style={{
                  position: "absolute",
                  left: "100%",
                  top: submenuDirection === 'down' ? 0 : undefined,
                  bottom: submenuDirection === 'up' ? 0 : undefined,
                  background: "#fff",
                  border: "1px solid #bfbfbf",
                  boxShadow: "2px 2px 6px rgba(0,0,0,0.12)",
                  minWidth: 240,
                  zIndex: 10000,
                  padding: "2px 0"
                }}
                className="desktop-context-menu-submenu"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.submenu.map((sub, subIdx) => (
                  ('divider' in sub && sub.divider) ? (
                    <div key={"divider-" + subIdx} style={{ borderTop: "1px solid #d4d0c8", margin: "2px 0" }} />
                  ) : (
                    <div
                      key={sub.label}
                      className="flex items-center hover:bg-[#e5e5e5] cursor-pointer select-none"
                      style={{ height: 26, paddingLeft: 4, paddingRight: 12, color: "#222" }}
                      onClick={onClose}
                    >
                      {/* Radio/Check icons */}
                      <span style={{ width: 22, display: "inline-block", textAlign: "center" }}>
                        {('icon' in sub && sub.icon) && (
                          <Image src={sub.icon} alt="" width={18} height={18} style={{ verticalAlign: "middle", marginRight: 2 }} />
                        )}
                        {('selected' in sub && sub.selected) && (
                          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#222" }} />
                        )}
                        {('checked' in sub && sub.checked) && (
                          <span style={{ fontSize: 16, color: "#222" }}>✔</span>
                        )}
                      </span>
                      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.label}</span>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
          {item.divider && (
            <div style={{ borderTop: "1px solid #d4d0c8", margin: "2px 0" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DesktopContextMenu; 