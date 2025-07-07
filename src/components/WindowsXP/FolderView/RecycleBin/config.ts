import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const recycleBinSidebarConfig: SidebarCard[] = [
  {
    title: 'systemTasks',
    items: [
      {
        icon: '/icons/restore.ico',
        text: 'restoreAllItems'
      },
      {
        icon: '/icons/close.png',
        text: 'emptyRecycleBin'
      },
      {
        icon: '/icons/ie-book.png',
        text: 'viewProperties'
      }
    ]
  },
  {
    title: 'otherPlaces',
    items: [
      {
        icon: '/icons/MyComputer.png',
        text: 'My Computer'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'My Projects'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Control Panel'
      }
    ]
  }
];

export const recycleBinContentConfig: ContentCard[] = [
  {
    title: '',
    items: [
      {
        icon: '/icons/paint.png',
        text: 'udemyCert',
        originalText: 'udemyCert'
      }
    ]
  },
  {
    title: 'games',
    items: [
      {
        icon: '/icons/notepad.png',
        text: 'gtaCheats'
      },
      {
        icon: '/icons/gtavc.ico',
        text: 'gtaViceCity'
      },
    ]
  },
  {
    title: '',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'gamingSites'
      }
    ]
  },
  {
    title: 'oldCVs',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'cv37'
      },
      {
        icon: '/icons/301(32x32).png',
        text: 'cvLatest'
      },
      {
        icon: '/icons/301(32x32).png',
        text: 'cvFinal'
      },
    ]
  },
  {
    title: 'oldProjects',
    items: [
      {
        icon: '/icons/301(32x32).png',
        text: 'testProject'
      },
      {
        icon: '/icons/301(32x32).png',
        text: 'brokenWebsite'
      }
    ]
  },
]; 