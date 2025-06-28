import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const controlPanelSidebarConfig: SidebarCard[] = [
  {
    title: 'Control Panel Tasks',
    items: [
      {
        icon: '/icons/networksecurity.png',
        text: 'Switch to Classic View'
      },
      {
        icon: '/icons/ie-book.png',
        text: 'View Control Panel home'
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
        icon: '/icons/foldericon.png',
        text: 'Shared Documents'
      }
    ]
  }
];

export const controlPanelContentConfig: ContentCard[] = [
  {
    title: 'Pick a category',
    items: [
      {
        icon: '/icons/networksecurity.png',
        text: 'Security Center'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'User Accounts'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Add or Remove Programs'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Date, Time, Language, and Regional Options'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Appearance and Themes'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Printers and Other Hardware'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Network and Internet Connections'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Performance and Maintenance'
      }
    ]
  }
]; 