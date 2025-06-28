interface MenuItem {
  icon?: string;
  text?: string;
  type: 'item' | 'menu' | 'separator';
  items?: MenuItem[];
}

export const MyRecentDocuments: MenuItem[] = [
  {
    icon: '/icons/308(32x32).png',
    text: 'document1',
    type: 'item',
  },
  {
    icon: '/icons/308(32x32).png',
    text: 'document2',
    type: 'item',
  },
  {
    icon: '/icons/308(32x32).png',
    text: 'document3',
    type: 'item',
  },
];

export const ConnectTo: MenuItem[] = [
  {
    icon: '/icons/msn.png',
    text: 'msn',
    type: 'item',
  },
  {
    icon: '/icons/309(32x32).png',
    text: 'showAllConnections',
    type: 'item',
  },
];

export const AllPrograms: MenuItem[] = [
  {
    icon: '/icons/227(16x16).png',
    text: 'setProgramAccessAndDefaults',
    type: 'item',
  },
  {
    icon: '/icons/392(16x16).png',
    text: 'windowsCatalog',
    type: 'item',
  },
  {
    icon: '/icons/322(16x16).png',
    text: 'windowsUpdate',
    type: 'item',
  },
  {
    type: 'separator',
  },
  {
    icon: '/icons/358(16x16).png',
    text: 'accessories',
    type: 'menu',
    items: [
      {
        icon: '/icons/358(16x16).png',
        text: 'accessibility',
        type: 'menu',
        items: [
          { icon: '/icons/238(16x16).png', text: 'accessibilityWizard', type: 'item' },
          { icon: '/icons/817(16x16).png', text: 'magnifier', type: 'item' },
          { icon: '/icons/narrator.ico', text: 'narrator', type: 'item' },
          { icon: '/icons/58(16x16).png', text: 'onScreenKeyboard', type: 'item' },
          { icon: '/icons/119(16x16).png', text: 'utilityManager', type: 'item' },
        ],
      },
      {
        icon: '/icons/358(16x16).png',
        text: 'communications',
        type: 'menu',
        items: [
          { icon: '/icons/669(16x16).png', text: 'hyperTerminal', type: 'item' },
          { icon: '/icons/404(16x16).png', text: 'networkConnections', type: 'item' },
          { icon: '/icons/664(16x16).png', text: 'networkSetupWizard', type: 'item' },
          { icon: '/icons/663(16x16).png', text: 'newConnectionWizard', type: 'item' },
          { icon: '/icons/234(16x16).png', text: 'wirelessNetworkSetupWizard', type: 'item' },
        ],
      },
      {
        icon: '/icons/358(16x16).png',
        text: 'entertainment',
        type: 'menu',
        items: [
          { icon: '/icons/690(16x16).png', text: 'soundRecorder', type: 'item' },
          { icon: '/icons/120(16x16).png', text: 'volumeControl', type: 'item' },
          { icon: '/icons/846(32x32).png', text: 'windowsMediaPlayer', type: 'item' },
        ],
      },
      {
        icon: '/icons/358(16x16).png',
        text: 'systemTools',
        type: 'menu',
        items: [
          { icon: '/icons/23(16x16).png', text: 'backup', type: 'item' },
          { icon: '/icons/128(16x16).png', text: 'diskCleanup', type: 'item' },
          { icon: '/icons/374(16x16).png', text: 'diskDefragmenter', type: 'item' },
          { icon: '/icons/505(16x16).png', text: 'systemInformation', type: 'item' },
          { icon: '/icons/716(16x16).png', text: 'scheduledTasks', type: 'item' },
        ],
      },
      {
        icon: '/icons/358(16x16).png',
        text: 'games',
        type: 'menu',
        items: [
          { icon: '/icons/freecell.png', text: 'freeCell', type: 'item' },
          { icon: '/icons/heart.png', text: 'hearts', type: 'item' },
          { icon: '/icons/solitaire.png', text: 'minesweeper', type: 'item' },
          { icon: '/icons/pinball.png', text: 'pinball', type: 'item' },
          { icon: '/icons/solitaire.png', text: 'solitaire', type: 'item' },
          { icon: '/icons/spider.png', text: 'spiderSolitaire', type: 'item' },
        ],
      },
    ],
  },
];

export const AllProgramsDetails: MenuItem[] = [
  {
    icon: '/icons/access.png',
    text: 'setProgramAccessAndDefaults',
    type: 'item',
  },
  {
    icon: '/icons/catalog.png',
    text: 'windowsCatalog',
    type: 'item',
  },
  {
    icon: '/icons/update.png',
    text: 'windowsUpdate',
    type: 'item',
  },
  {
    icon: '/icons/accessories.png',
    text: 'accessories',
    type: 'item',
  },
  {
    icon: '/icons/games.png',
    text: 'games',
    type: 'item',
  },
  {
    icon: '/icons/ie.png',
    text: 'internetExplorer',
    type: 'item',
  },
  {
    icon: '/icons/outlook.png',
    text: 'outlookExpress',
    type: 'item',
  },
  {
    icon: '/icons/remote-desktop.png',
    text: 'remoteDesktopConnection',
    type: 'item',
  },
  {
    icon: '/icons/movie-maker.png',
    text: 'windowsMovieMaker',
    type: 'item',
  },
];

