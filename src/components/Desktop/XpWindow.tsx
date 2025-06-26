import React from "react";
import { FileSystemItem } from "../../data/filesystem";
import MyComputer from "../FolderView/MyComputer";

interface XpWindowProps {
  item: FileSystemItem;
  onClose: () => void;
  path?: string; // Adres çubuğu için
}

const XpWindow: React.FC<XpWindowProps> = ({  onClose }) => {
  // Şimdilik sadece MyComputer arayüzünü gösteriyoruz
  return <MyComputer onClose={onClose} />;
};

export default XpWindow; 