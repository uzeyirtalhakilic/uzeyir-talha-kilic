import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard, ContentItem } from '../base/BaseContentGrid';

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
        text: t('myProjects')
      }
    ]
  },
  {
    title: t('content.contactInfo'),
    items: [
      {
        icon: '/icons/mail.png',
        text: t('content.email'),
        href: 'https://mail.google.com/mail/?view=cm&to=kilicuzeyirtalha@gmail.com'
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
      },
      {
        icon: '/icons/instagramIcon.png',
        text: t('content.instagram'),
        href: 'https://instagram.com/uzeyirtalhakilic'
      }
    ]
  },
];

// includeContactFolder: kenar çubuğu gizli olan mobilde, orada duran "İletişim
// Bilgileri" kartına ulaşılamıyor - bu yüzden mobilde Kişisel Bilgiler'in içine
// aynı isimde gerçek bir klasör (yeni bir pencere açan) ekliyoruz.
export const createWhoAmIContentConfig = (t: (key: string) => string, includeContactFolder = false): ContentCard[] => {
  const personalInfoItems: ContentItem[] = [
    {
      icon: '/icons/327(32x32).png',
      text: t('content.aboutMe'),
    },
    {
      icon: '/icons/300(32x32).png',
      text: t('content.resume'),
    },
  ];

  if (includeContactFolder) {
    personalInfoItems.push({
      icon: '/icons/folderdocument.png',
      text: t('content.contactInfo'),
    });
  }

  return [
    {
      title: t('content.personalInfo'),
      items: personalInfoItems
    },
    {
      title: t('content.experienceAndProjects'),
      items: [
        {
          icon: '/icons/folderdocument.png',
          text: t('content.experience'),
        },
        {
          icon: '/icons/folderdocument.png',
          text: t('myProjects'),
        },
      ]
    },
  ];
};

// Legacy exports for backward compatibility
export const whoAmISidebarConfig: SidebarCard[] = [];
export const whoAmIContentConfig: ContentCard[] = []; 