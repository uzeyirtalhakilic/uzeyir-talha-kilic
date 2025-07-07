import { SidebarCard } from '../base/BaseSidebar';
import { ContentCard } from '../base/BaseContentGrid';

export const myComputerSidebarConfig: SidebarCard[] = [
  {
    title: 'systemTasks',
    items: [
      {
        icon: '/icons/ie-book.png',
        text: 'viewSystemInformation'
      },
      {
        icon: '/icons/close.png',
        text: 'addOrRemovePrograms'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'changeASetting'
      }
    ]
  },
  {
    title: 'otherPlaces',
    items: [
      {
        icon: '/icons/mynetworkplaces.ico',
        text: 'myNetworkPlaces'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'myDocuments'
      },
      {
        icon: '/icons/foldericon.png',
        text: 'sharedDocuments'
      },
      {
        icon: '/icons/networksecurity.png',
        text: 'controlPanel'
      }
    ]
  },
  {
    title: 'GitHub',
    items: [
      {
        icon: '/github-logo.png',
        text: 'uzeyirtalhakilic',
        href: 'https://github.com/uzeyirtalhakilic',
        className: 'github-item'
      }
    ]
  }
];

export const myComputerContentConfig: ContentCard[] = [
  {
    title: 'hardDiskDrives',
    items: [
      {
        icon: '/icons/localdisk.png',
        text: 'localDiskC'
      }
    ]
  },
  {
    title: 'devicesWithRemovableStorage',
    items: [
      {
        icon: '/icons/dvd.png',
        text: 'cdDriveD'
      }
    ]
  },
  {
    title: 'filesStoredOnThisComputer',
    items: [
      {
        icon: '/icons/foldericon.png',
        text: 'sharedDocuments'
      },
      {
        icon: '/icons/folderdocument.png',
        text: 'usersDocuments'
      }
    ]
  },
]; 