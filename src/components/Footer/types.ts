export interface App {
  id: string;
  header: {
    icon: string;
    title: string;
    noFooterWindow?: boolean;
  };
}

export interface FooterWindowProps {
  id: string;
  icon: string;
  title: string;
  onMouseDown: (id: string) => void;
  isFocus: boolean;
}

export interface FooterMenuProps {
  className?: string;
  onClick: (name: string) => void;
}

export interface ItemProps {
  style?: React.CSSProperties;
  text: string | React.ReactNode;
  icon?: string;
  onHover?: (text: string) => void;
  onClick?: (text: string) => void;
  children?: React.ReactNode;
}
export interface FooterProps {
  apps: Array<{
    id: string;
    header: {
      icon: string;
      title: string;
      noFooterWindow?: boolean;
    };
  }>;
  focusedAppId: string | null;
  onMouseDown: () => void;
  onClickMenuItem: (name: string) => void;
  onWindowClick?: (windowId: string) => void;
  menuOn?: boolean;
  toggleMenu?: () => void;
}

export interface ItemsProps {
  items: Array<{
    icon: string;
    text: string;
  }>;
  onClick?: (text: string) => void;
}

export interface SubMenuProps {
  data: MenuItem[];
  onClick: (text: string) => void;
  left?: string;
}

export interface MenuItem {
  type: 'item' | 'menu' | 'separator';
  icon?: string;
  text?: string;
  items?: MenuItem[];
  bottom?: string;
} 