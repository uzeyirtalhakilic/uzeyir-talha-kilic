import React from "react";
import { useTranslations } from 'next-intl';
import TxtFile from "../base/TxtFile";

const AboutMeFile: React.FC = () => {
  const t = useTranslations('folderView.whoAmI.aboutMeContent');

  return (
    <TxtFile
      content={t('content')}
    />
  );
};

export default AboutMeFile; 