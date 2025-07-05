import React from "react";
import TxtFile from "../base/TxtFile";
import { useTranslations } from 'next-intl';

interface ReadMeFileProps {
  onClose: () => void;
}

const ReadMeFile: React.FC<ReadMeFileProps> = ({ onClose }) => {
  const t = useTranslations('readMeFile');

  return (
    <TxtFile
      title={t('title')}
      content={t('content')}
      onClose={onClose}
    />
  );
};

export default ReadMeFile; 