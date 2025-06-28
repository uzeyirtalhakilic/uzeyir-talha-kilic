import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const myDocumentsSidebarConfig: SidebarCard[] = [
  {
    title: 'Document Tasks',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'Create a new document'
      },
      {
        icon: '/icons/foldericon.png',
        text: 'Publish this folder to the Web'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'Share this folder'
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
        icon: '/icons/foldericon.png',
        text: 'Shared Documents'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'Control Panel'
      }
    ]
  }
];

export const myDocumentsContentConfig: ContentCard[] = [
  {
    title: 'My Documents',
    items: [
      {
        icon: '/icons/msword.png',
        text: 'Resume.docx'
      },
      {
        icon: '/icons/msword.png',
        text: 'Cover Letter.docx'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'Projects'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'Personal'
      }
    ]
  }
]; 