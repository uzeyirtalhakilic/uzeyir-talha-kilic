import React, { useContext } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { BaseFolderView, BaseSidebar, BaseContentGrid } from '../base';
import { ContentCard } from '../base/BaseContentGrid';
import { createExperienceSidebarConfig, ExperienceEntry, EducationEntry } from './config';
import { DesktopContext } from '../../Desktop/Desktop';

interface ExperienceProps {
  onClose: () => void;
}

const Experience: React.FC<ExperienceProps> = () => {
  const t = useTranslations('experience');
  const desktopContext = useContext(DesktopContext);
  const workExperience = t.raw('workExperience') as ExperienceEntry[];
  const education = t.raw('education') as EducationEntry[];

  const openTerminal = (id: string, fileName: string) => {
    if (desktopContext) {
      desktopContext.handleOpen({
        id,
        type: 'file',
        label: `${fileName}.exe`,
        translationKey: 'desktop.experienceTerminal',
        icon: '/icons/exe-program.png',
      });
    }
  };

  const contentConfig: ContentCard[] = [
    {
      title: t('workExperienceTitle'),
      items: workExperience.map((entry, idx) => ({
        icon: '/icons/exe-program.png',
        text: `${entry.company} (${entry.period}) — ${entry.role}`,
        onClick: () => openTerminal(`experience-work-${idx}`, entry.company),
      })),
    },
    {
      title: t('educationTitle'),
      items: education.map((entry, idx) => ({
        icon: '/icons/exe-program.png',
        text: `${entry.school} (${entry.period}) — ${entry.degree}`,
        onClick: () => openTerminal(`experience-edu-${idx}`, entry.school),
      })),
    },
  ];

  const addressBarContent = (
    <div className="address-input">
      <span className="address-input-icon">
        <Image src="/icons/folderdocument.png" alt="Experience" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
      </span>
      <div className="address-input-text">{t('title')}</div>
      <span className="address-input-dropdown">▼</span>
    </div>
  );

  return (
    <BaseFolderView addressBarContent={addressBarContent}>
      <BaseSidebar cards={createExperienceSidebarConfig(t)} />
      <BaseContentGrid cards={contentConfig} />
    </BaseFolderView>
  );
};

export default Experience;
