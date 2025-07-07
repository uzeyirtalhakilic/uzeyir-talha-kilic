import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';


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
    ]
  },
  {
    title: t('content.dataScience'),
    items: [
      {
        icon: '/icons/favicon.png',
        text: t('soon'),
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
        href: 'https://github.com/uzeyirtalhakilic/DesktopApp-Courier-Tracking',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/github-logo.png',
        text: t('content.veterinaryClinic'),
        href: 'https://github.com/uzeyirtalhakilic/Vet_Tracking',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      // {
      //   icon: '/github-logo.png',
      //   text: t('content.wholesalerApp'),
      //   href: 'https://github.com/uzeyirtalhakilic/wholesaler-app',
      //   target: '_blank',
      //   rel: 'noopener noreferrer'
      // },
      {
        icon: '/github-logo.png',
        text: t('content.restaurantManagement'),
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