import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const createWhoAmISidebarConfig = (t: (key: string) => string): SidebarCard[] => [
  {
    title: t('personalTasks'),
    items: [
      {
        icon: '/icons/msword.png',
        text: t('editPersonalInfo')
      },
      {
        icon: '/icons/folderphoto.png',
        text: t('viewPhotos')
      },
      {
        icon: '/icons/ie-book.png',
        text: t('readAboutMe')
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
        icon: '/icons/folderdocument.png',
        text: t('myDocuments')
      },
      {
        icon: '/icons/networksecurity.png',
        text: t('controlPanel')
      }
    ]
  }
];

export const createWhoAmIContentConfig = (t: (key: string) => string): ContentCard[] => [
  {
    title: t('content.personalInfo'),
    items: [
      {
        icon: '/icons/327(32x32).png',
        text: t('content.aboutMe'),
      },
      {
        icon: '/icons/300(32x32).png',
        text: t('content.resume'),
      },
      {
        icon: '/icons/folderphoto.png',
        text: t('content.photos')
      },
    ]
  },
  {
    title: t('content.contactInfo'),
    items: [
      {
        icon: '/icons/mail.png',
        text: t('content.email'),
      },
      {
        icon: '/icons/linkedin.png',
        text: t('content.linkedin'),
      },
      {
        icon: '/github-logo.png',
        text: t('content.github'),
      }
    ]
  }
];

// Legacy exports for backward compatibility
export const whoAmISidebarConfig: SidebarCard[] = [];
export const whoAmIContentConfig: ContentCard[] = []; 