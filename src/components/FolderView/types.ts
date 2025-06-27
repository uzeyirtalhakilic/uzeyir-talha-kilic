export interface MenuItem {
  type: 'item' | 'menu' | 'separator';
  text?: string;
  disable?: boolean;
  hotkey?: string;
  symbol?: string;
  items?: MenuItem[];
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

export interface DropDownData {
  [key: string]: MenuItem[];
} 