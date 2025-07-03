import React from "react";
import TxtFile from "../base/TxtFile";

interface ReadMeFileProps {
  onClose: () => void;
}

const ReadMeContent = `BENİ OKU`;





const ReadMeFile: React.FC<ReadMeFileProps> = ({ onClose }) => {
  return (
    <TxtFile
      title="Beni Oku"
      content={ReadMeContent}
      onClose={onClose}
    />
  );
};

export default ReadMeFile; 