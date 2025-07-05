import React from "react";
import TxtFile from "../base/TxtFile";
import { useTranslations } from 'next-intl';

const ReadMeFile: React.FC = () => {
  const t = useTranslations('readMeFile');

  return (
    <TxtFile
      content={t('content')}
    />
  );
};

export default ReadMeFile; 