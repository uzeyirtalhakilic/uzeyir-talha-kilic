import { createContext } from "react";
import { FileSystemItem } from "../data/filesystem";

export const DesktopContext = createContext<{
  handleOpen: (item: FileSystemItem, position?: { x: number; y: number }) => void;
  refreshDesktop?: () => void;
  // Mobil mini XP masaüstünde mi çalışıyoruz? Bazı paylaşılan bileşenler
  // (ör. BaseContentGrid, RecycleBin) buna göre tek tık / çift tık ayrımı yapar.
  isMobile?: boolean;
} | undefined>(undefined);
