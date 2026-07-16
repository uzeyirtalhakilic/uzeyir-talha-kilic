import React from 'react';
import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

const withDate = (title: string, date?: string, role?: string): React.ReactNode => (
  <>
    <span className="file-label-name">{title}</span>
    {date && <span className="file-label-meta">{date}</span>}
    {role && <span className="file-label-meta">{role}</span>}
  </>
);

export const createMyProjectsContentConfig = (t: (key: string) => string): ContentCard[] => [
  {
    title: t('content.machineLearning'),
    items: [
      {
        icon: '/github-logo.png',
        text: t('content.sentimentAnalysis'),
        href: 'https://github.com/uzeyirtalhakilic/tweeteval-multiclass-sentiment-analysis',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/icons/mezunIcon.png',
        text: t('content.thesisProject'),
        displayText: withDate(t('content.thesisProject'), t('content.thesisProjectDate'), t('content.thesisProjectTag')),
        href: '',
        target: '',
        rel: ''
      },
    ]
  },
  {
    title: t('content.applications'),
    items: [
      {
        icon: '/github-logo.png',
        text: t('content.courierTracking'),
        displayText: withDate(t('content.courierTracking'), t('content.courierTrackingDate'), t('content.courierTrackingRole')),
        href: 'https://github.com/uzeyirtalhakilic/DesktopApp-Courier-Tracking',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/github-logo.png',
        text: t('content.veterinaryClinic'),
        displayText: withDate(t('content.veterinaryClinic'), t('content.veterinaryClinicDate'), t('content.veterinaryClinicRole')),
        href: 'https://github.com/uzeyirtalhakilic/Vet_Tracking',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/github-logo.png',
        text: t('content.restaurantManagement'),
        displayText: withDate(t('content.restaurantManagement'), t('content.restaurantManagementDate')),
        href: 'https://github.com/uzeyirtalhakilic/Restaurant-Management',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
    ]
  },
];
export const createMyProjectsSidebarConfig = (t: (key: string) => string): SidebarCard[] => [
  {
    title: t('documentTasks'),
    items: [
      {
        icon: '/icons/msword.png',
        text: t('createNewDocument')
      },
      {
        icon: '/icons/foldericon.png',
        text: t('publishToWeb')
      },
      {
        icon: '/icons/folderdocument.png',
        text: t('shareFolder')
      }
    ]
  },
  {
    title: t('otherPlaces'),
    items: [
      {
        icon: '/icons/MyComputer.png',
        text: t('myComputer')
      },
      {
        icon: '/icons/foldericon.png',
        text: t('sharedDocuments')
      },
      {
        icon: '/icons/networksecurity.png',
        text: t('controlPanel')
      }
    ]
  }
];

// Legacy exports for backward compatibility
export const myProjectsSidebarConfig: SidebarCard[] = [];
export const myProjectsContentConfig: ContentCard[] = []; 