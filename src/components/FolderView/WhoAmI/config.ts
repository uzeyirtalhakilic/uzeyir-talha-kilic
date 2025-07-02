import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const createWhoAmISidebarConfig = (t: any): SidebarCard[] => [
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

export const createWhoAmIContentConfig = (t: any): ContentCard[] => [
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
        href: '/pdfs/Uzeyir Talha Kilic EN.pdf'
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
        href: 'https://mail.google.com/mail/?view=cm&to=kilicuzeyirtalha@gmail.com',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/icons/linkedin.png',
        text: t('content.linkedin'),
        href: 'https://linkedin.com/in/uzeyirtalhakilic'
      },
      {
        icon: '/github-logo.png',
        text: t('content.github'),
        href: 'https://github.com/uzeyirtalhakilic'
      }
    ]
  }
];

// Legacy exports for backward compatibility
export const whoAmISidebarConfig: SidebarCard[] = [];
export const whoAmIContentConfig: ContentCard[] = []; 