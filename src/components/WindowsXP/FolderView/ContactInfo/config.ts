import { ContentCard } from '../base/BaseContentGrid';

export const createContactInfoContentConfig = (t: (key: string) => string): ContentCard[] => [
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
        href: 'https://linkedin.com/in/uzeyirtalhakilic',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/github-logo.png',
        text: t('content.github'),
        href: 'https://github.com/uzeyirtalhakilic',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: '/icons/instagramIcon.png',
        text: t('content.instagram'),
        href: 'https://instagram.com/uzeyirtalhakilic',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    ]
  }
];
