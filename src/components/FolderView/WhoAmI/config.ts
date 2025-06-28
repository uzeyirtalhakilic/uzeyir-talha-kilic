import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const whoAmISidebarConfig: SidebarCard[] = [
  {
    title: 'Personal Tasks',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'Edit Personal Information'
      },
      {
        icon: '/icons/folderphoto.png',
        text: 'View Photos'
      },
      {
        icon: '/icons/ie-book.png',
        text: 'Read About Me'
      }
    ]
  },
  {
    title: 'Other Places',
    items: [
      {
        icon: '/icons/MyComputer.png',
        text: 'My Computer'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'My Documents'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Control Panel'
      }
    ]
  }
];

export const whoAmIContentConfig: ContentCard[] = [
  {
    title: 'Personal Information',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'About Me.txt',
        href: '#about-me'
      },
      {
        icon: '/icons/folderphoto.png',
        text: 'Photos'
      },
      {
        icon: '/file.svg',
        text: 'Resume.pdf',
        href: '/pdfs/Uzeyir Talha Kilic EN.pdf'
      }
    ]
  },
  {
    title: 'Contact Information',
    items: [
      {
        icon: '/icons/email.png',
        text: 'Email.txt',
        href: 'kilicuzeyirtalha@gmail.com'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'LinkedIn',
        href: 'https://linkedin.com/in/uzeyirtalhakilic'
      },
      {
        icon: '/github-logo.png',
        text: 'GitHub',
        href: 'https://github.com/uzeyirtalhakilic'
      }
    ]
  }
]; 