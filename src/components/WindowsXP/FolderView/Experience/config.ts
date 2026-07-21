import { SidebarCard } from '../base/BaseSidebar';

export const createExperienceSidebarConfig = (t: (key: string) => string): SidebarCard[] => [
  {
    title: t('otherPlaces'),
    items: [
      {
        icon: '/icons/folderdocument.png',
        text: t('whoAmI')
      },
      {
        icon: '/icons/MyComputer.png',
        text: t('myComputer')
      },
      {
        icon: '/icons/folderdocument.png',
        text: t('myProjects')
      }
    ]
  }
];

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  location: string;
  thesis: string;
}
