import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const createMyDocumentsSidebarConfig = (t: any): SidebarCard[] => [
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

export const createMyDocumentsContentConfig = (t: any): ContentCard[] => [
  {
    title: t('content.myDocuments'),
    items: [
      {
        icon: '/icons/msword.png',
        text: t('content.resume')
      },
      {
        icon: '/icons/msword.png',
        text: t('content.coverLetter')
      },
      {
        icon: '/icons/folderdocument.png',
        text: t('content.projects')
      },
      {
        icon: '/icons/folderdocument.png',
        text: t('content.personal')
      }
    ]
  }
];

// Legacy exports for backward compatibility
export const myDocumentsSidebarConfig: SidebarCard[] = [];
export const myDocumentsContentConfig: ContentCard[] = []; 