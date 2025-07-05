import React from "react";
import { useTranslations } from 'next-intl';
import TxtFile from "../base/TxtFile";

interface AboutMeFileProps {
  onClose: () => void;
}

const AboutMeFile: React.FC<AboutMeFileProps> = ({ onClose }) => {
  const t = useTranslations('folderView.whoAmI.aboutMeContent');

  return (
    <TxtFile
      title={t('title')}
      content={t('content')}
      onClose={onClose}
    />
  );
};

export default AboutMeFile; 