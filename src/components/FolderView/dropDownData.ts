import { DropDownData } from './types';

export const dropDownData: DropDownData = {
  File: [
    {
      type: 'item',
      text: 'dropdownMenu.file.createShortcut',
      disable: true,
    },
    {
      type: 'item',
      text: 'dropdownMenu.file.delete',
      disable: true,
    },
    {
      type: 'item',
      text: 'dropdownMenu.file.rename',
      disable: true,
    },
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.file.properties',
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      text: 'dropdownMenu.file.close',
    },
  ],
  Edit: [
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.edit.undo',
      hotkey: 'Ctrl+Z',
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.edit.cut',
      hotkey: 'Ctrl+X',
    },
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.edit.copy',
      hotkey: 'Ctrl+C',
    },
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.edit.paste',
      hotkey: 'Ctrl+V',
    },
    {
      type: 'item',
      disable: true,
      text: 'dropdownMenu.edit.pasteShortcut',
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      text: 'dropdownMenu.edit.copyToFolder',
      disable: true,
    },
    {
      type: 'item',
      text: 'dropdownMenu.edit.moveToFolder',
      disable: true,
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      text: 'dropdownMenu.edit.selectAll',
      hotkey: 'Ctrl+A',
    },
    {
      type: 'item',
      text: 'dropdownMenu.edit.invertSelection',
    },
  ],
  View: [
    {
      type: 'menu',
      position: {
        left: 'calc(100% - 4px)',
        top: '-3px',
      },
      text: 'dropdownMenu.view.toolbars',
      items: [
        {
          type: 'item',
          symbol: 'check',
          text: 'dropdownMenu.view.standardButtons',
        },
        {
          type: 'item',
          symbol: 'check',
          text: 'dropdownMenu.view.addressBar',
        },
        {
          type: 'item',
          symbol: 'check',
          text: 'dropdownMenu.view.links',
        },
        {
          type: 'separator',
        },
        {
          type: 'item',
          symbol: 'check',
          text: 'dropdownMenu.view.lockTheToolbars',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.customize',
        },
      ],
    },
    {
      type: 'item',
      symbol: 'check',
      text: 'dropdownMenu.view.statusBar',
    },
    {
      type: 'menu',
      position: {
        left: 'calc(100% - 4px)',
        top: '-3px',
      },
      text: 'dropdownMenu.view.explorerBar',
      items: [
        {
          type: 'item',
          text: 'dropdownMenu.view.search',
          hotkey: 'Ctrl+E',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.favorites',
          hotkey: 'Ctrl+I',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.history',
          hotkey: 'Ctrl+H',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.folders',
        },
        {
          type: 'separator',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.tipOfTheDay',
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.thumbnails',
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.tiles',
      symbol: 'circle',
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.icons',
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.list',
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.details',
    },
    {
      type: 'separator',
    },
    {
      type: 'menu',
      position: {
        left: 'calc(100% - 4px)',
        top: '-3px',
      },
      text: 'dropdownMenu.view.arrangeIconsBy',
      items: [
        {
          type: 'item',
          text: 'dropdownMenu.view.name',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.size',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.type',
        },
        {
          type: 'item',
          text: 'dropdownMenu.view.modified',
        },
      ],
    },
    {
      type: 'item',
      text: 'dropdownMenu.view.chooseDetails',
    },
  ],
  Favorites: [
    {
      type: 'item',
      text: 'dropdownMenu.favorites.addToFavorites',
    },
    {
      type: 'item',
      text: 'dropdownMenu.favorites.organizeFavorites',
    },
  ],
  Tools: [
    {
      type: 'item',
      text: 'dropdownMenu.tools.mapNetworkDrive',
    },
    {
      type: 'item',
      text: 'dropdownMenu.tools.disconnectNetworkDrive',
      disable: true,
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      text: 'dropdownMenu.tools.synchronize',
    },
    {
      type: 'item',
      text: 'dropdownMenu.tools.folderOptions',
    },
  ],
  Help: [
    {
      type: 'item',
      text: 'dropdownMenu.help.helpTopics',
    },
    {
      type: 'item',
      text: 'dropdownMenu.help.aboutWindows',
    },
  ],
}; 