import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Icon importları - aynı path'deki icon'ları kullanıyoruz
import startButton from './src/assets/windowsIcons/start.png';
import user from './src/assets/windowsIcons/user.png';
import ie from './src/assets/windowsIcons/ie.png';
import iePaper from './src/assets/windowsIcons/ie-paper.png';
import mine from './src/assets/minesweeper/mine-icon.png';
import notepad from './src/assets/windowsIcons/327(32x32).png';
import winamp from './src/assets/windowsIcons/winamp.png';
import paint from './src/assets/windowsIcons/680(32x32).png';
import mediaPlayer from './src/assets/windowsIcons/846(32x32).png';
import messenger from './src/assets/windowsIcons/msn.png';
import documents from './src/assets/windowsIcons/308(32x32).png';
import recentDocuments from './src/assets/windowsIcons/301(32x32).png';
import pictures from './src/assets/windowsIcons/307(32x32).png';
import music from './src/assets/windowsIcons/550(32x32).png';
import computer from './src/assets/windowsIcons/676(32x32).png';
import controlPanel from './src/assets/windowsIcons/300(32x32).png';
import setAccess from './src/assets/windowsIcons/227(32x32).png';
import connect from './src/assets/windowsIcons/309(32x32).png';
import printer from './src/assets/windowsIcons/549(32x32).png';
import help from './src/assets/windowsIcons/747(32x32).png';
import search from './src/assets/windowsIcons/299(32x32).png';
import run from './src/assets/windowsIcons/743(32x32).png';
import lock from './src/assets/windowsIcons/546(32x32).png';
import shut from './src/assets/windowsIcons/310(32x32).png';
import allProgramsIcon from './src/assets/windowsIcons/all-programs.ico';
import empty from './src/assets/empty.png';

// Alt menü icon'ları
import access from './src/assets/windowsIcons/227(16x16).png';
import catalog from './src/assets/windowsIcons/392(16x16).png';
import update from './src/assets/windowsIcons/322(16x16).png';
import menu from './src/assets/windowsIcons/358(16x16).png';
import accessibility from './src/assets/windowsIcons/238(16x16).png';
import magnifier from './src/assets/windowsIcons/817(16x16).png';
import narrator from './src/assets/windowsIcons/narrator.ico';
import keyboard from './src/assets/windowsIcons/58(16x16).png';
import utility from './src/assets/windowsIcons/119(16x16).png';
import hyperCmd from './src/assets/windowsIcons/669(16x16).png';
import networkConnection from './src/assets/windowsIcons/404(16x16).png';
import networkSetup from './src/assets/windowsIcons/664(16x16).png';
import connectionWizard from './src/assets/windowsIcons/663(16x16).png';
import wireless from './src/assets/windowsIcons/234(16x16).png';
import sound from './src/assets/windowsIcons/690(16x16).png';
import volume from './src/assets/windowsIcons/120(16x16).png';
import backup from './src/assets/windowsIcons/23(16x16).png';
import cleanDisk from './src/assets/windowsIcons/128(16x16).png';
import defragmenter from './src/assets/windowsIcons/374(16x16).png';
import info from './src/assets/windowsIcons/505(16x16).png';
import scheduled from './src/assets/windowsIcons/716(16x16).png';
import freecell from './src/assets/windowsIcons/freecell.png';
import hearts from './src/assets/windowsIcons/heart.png';
import pinball from './src/assets/windowsIcons/pinball.png';
import solitaire from './src/assets/windowsIcons/solitaire.png';
import spider from './src/assets/windowsIcons/spider.png';

// Start Menü Verileri
const AllPrograms = [
  {
    type: 'item',
    icon: access,
    text: 'Set Program Access and Defaults',
  },
  {
    type: 'item',
    icon: catalog,
    text: 'Windows Catalog',
  },
  {
    type: 'item',
    icon: update,
    text: 'Windows Update',
  },
  {
    type: 'separator',
  },
  {
    type: 'menu',
    icon: menu,
    text: 'Accessories',
    items: [
      {
        type: 'menu',
        icon: menu,
        text: 'Accessibility',
        items: [
          { type: 'item', icon: accessibility, text: 'Accessibility Wizard' },
          { type: 'item', icon: magnifier, text: 'Magnifier' },
          { type: 'item', icon: narrator, text: 'Narrator' },
          { type: 'item', icon: keyboard, text: 'On-Screen Keyboard' },
          { type: 'item', icon: utility, text: 'Utility Manager' },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'Communications',
        items: [
          { type: 'item', icon: hyperCmd, text: 'HyperTerminal' },
          { type: 'item', icon: networkConnection, text: 'Network Connections' },
          { type: 'item', icon: networkSetup, text: 'Network Setup Wizard' },
          { type: 'item', icon: connectionWizard, text: 'New Connection Wizard' },
          { type: 'item', icon: wireless, text: 'Wireless Network Setup Wizard' },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'Entertainment',
        items: [
          { type: 'item', icon: sound, text: 'Sound Recorder' },
          { type: 'item', icon: volume, text: 'Volume Control' },
          { type: 'item', icon: mediaPlayer, text: 'Windows Media Player' },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'System Tools',
        items: [
          { type: 'item', icon: backup, text: 'Backup' },
          { type: 'item', icon: cleanDisk, text: 'Disk Cleanup' },
          { type: 'item', icon: defragmenter, text: 'Disk Defragmenter' },
          { type: 'item', icon: info, text: 'System Information' },
          { type: 'item', icon: scheduled, text: 'Scheduled Tasks' },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'Games',
        items: [
          { type: 'item', icon: freecell, text: 'FreeCell' },
          { type: 'item', icon: hearts, text: 'Hearts' },
          { type: 'item', icon: mine, text: 'Minesweeper' },
          { type: 'item', icon: pinball, text: 'Pinball' },
          { type: 'item', icon: solitaire, text: 'Solitaire' },
          { type: 'item', icon: spider, text: 'Spider Solitaire' },
        ],
      },
    ],
  },
];

const MyRecentDocuments = [
  {
    type: 'item',
    icon: documents,
    text: 'Document1.doc',
  },
  {
    type: 'item',
    icon: documents,
    text: 'Document2.txt',
  },
  {
    type: 'item',
    icon: documents,
    text: 'Document3.xls',
  },
];

const ConnectTo = [
  {
    type: 'item',
    icon: messenger,
    text: 'MSN',
  },
  {
    type: 'item',
    icon: connect,
    text: 'Show all connections',
  },
];

// Alt Menü Component'i
const SubMenu = ({ data, style, onClick, onClose }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <SubMenuContainer style={style} onMouseLeave={handleMouseLeave}>
      {data.map((item, index) => (
        <SubMenuItem
          key={index}
          item={item}
          hover={hoverIndex === index}
          onMouseEnter={() => setHoverIndex(index)}
          onClick={onClick}
          onClose={onClose}
        />
      ))}
    </SubMenuContainer>
  );
};

const SubMenuItem = ({ item, hover, onMouseEnter, onClick, onClose }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleClick = () => {
    if (item.type === 'item') {
      onClick(item.text);
      onClose();
    }
  };

  const handleMouseEnter = () => {
    onMouseEnter();
    if (item.type === 'menu') {
      setShowSubMenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'menu') {
      setShowSubMenu(false);
    }
  };

  switch (item.type) {
    case 'item':
      return (
        <SubMenuItemContainer onClick={handleClick}>
          <SubMenuIcon src={item.icon} alt="" />
          <SubMenuText>{item.text}</SubMenuText>
        </SubMenuItemContainer>
      );
    case 'separator':
      return <SubMenuSeparator />;
    case 'menu':
      return (
        <SubMenuItemContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          hover={hover}
        >
          <SubMenuIcon src={item.icon} alt="" />
          <SubMenuText>{item.text}</SubMenuText>
          <SubMenuArrow>▶</SubMenuArrow>
          {showSubMenu && (
            <SubMenu
              data={item.items}
              style={{ left: '100%', top: '-1px' }}
              onClick={onClick}
              onClose={onClose}
            />
          )}
        </SubMenuItemContainer>
      );
    default:
      return null;
  }
};

// Ana Start Menü Component'i
const StartMenu = ({ isOpen, onClose, onMenuItemClick }) => {
  const [hovering, setHovering] = useState('');

  const handleMenuItemClick = (text) => {
    onMenuItemClick(text);
  };

  const handleMouseLeave = () => {
    setHovering('');
  };

  return (
    <StartMenuContainer isOpen={isOpen}>
      <StartMenuHeader>
        <UserAvatar src={user} alt="user" />
        <UserName>User</UserName>
      </StartMenuHeader>

      <StartMenuContent onMouseLeave={handleMouseLeave}>
        <OrangeDivider />
        
        <StartMenuLeft>
          <MenuItem onClick={handleMenuItemClick} icon={iePaper} text="Internet">
            <MenuItemSubtext>Internet Explorer</MenuItemSubtext>
          </MenuItem>
          
          <MenuItem onClick={handleMenuItemClick} icon={messenger} text="E-mail">
            <MenuItemSubtext>Outlook Express</MenuItemSubtext>
          </MenuItem>
          
          <MenuSeparator />
          
          <MenuItem onClick={handleMenuItemClick} icon={mine} text="Minesweeper" />
          <MenuItem onClick={handleMenuItemClick} icon={notepad} text="Notepad" />
          <MenuItem onClick={handleMenuItemClick} icon={winamp} text="Winamp" />
          <MenuItem onClick={handleMenuItemClick} icon={paint} text="Paint" />
          <MenuItem onClick={handleMenuItemClick} icon={mediaPlayer} text="Windows Media Player" />
          <MenuItem onClick={handleMenuItemClick} icon={messenger} text="Windows Messenger" />
          
          <MenuSpacer />
          <MenuSeparator />
          
          <MenuItem
            hover={hovering === 'All Programs'}
            onMouseEnter={() => setHovering('All Programs')}
            icon={empty}
            text={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                All Programs
                <img
                  src={allProgramsIcon}
                  alt=""
                  style={{
                    marginLeft: '5px',
                    height: '18px',
                  }}
                />
              </div>
            }
          >
            {hovering === 'All Programs' && (
              <SubMenu
                data={AllPrograms}
                style={{ left: '153px', top: '-1px' }}
                onClick={handleMenuItemClick}
                onClose={onClose}
              />
            )}
          </MenuItem>
        </StartMenuLeft>

        <StartMenuRight>
          <MenuItem onClick={handleMenuItemClick} icon={documents} text="My Documents" />
          
          <MenuItem
            hover={hovering === 'My Recent Documents'}
            onMouseEnter={() => setHovering('My Recent Documents')}
            icon={recentDocuments}
            text="My Recent Documents"
          >
            <MenuArrow hover={hovering === 'My Recent Documents'} />
            {hovering === 'My Recent Documents' && (
              <SubMenu
                data={MyRecentDocuments}
                style={{ left: '153px', top: '-1px' }}
                onClick={handleMenuItemClick}
                onClose={onClose}
              />
            )}
          </MenuItem>
          
          <MenuItem onClick={handleMenuItemClick} icon={pictures} text="My Pictures" />
          <MenuItem onClick={handleMenuItemClick} icon={music} text="My Music" />
          <MenuItem onClick={handleMenuItemClick} icon={computer} text="My Computer" />
          
          <MenuSeparator />
          
          <MenuItem onClick={handleMenuItemClick} icon={controlPanel} text="Control Panel" />
          <MenuItem onClick={handleMenuItemClick} icon={setAccess} text="Set Program Access and Defaults" />
          
          <MenuItem
            hover={hovering === 'Connect To'}
            onMouseEnter={() => setHovering('Connect To')}
            icon={connect}
            text="Connect To"
          >
            <MenuArrow hover={hovering === 'Connect To'} />
            {hovering === 'Connect To' && (
              <SubMenu
                data={ConnectTo}
                style={{ left: '153px', top: '-1px' }}
                onClick={handleMenuItemClick}
                onClose={onClose}
              />
            )}
          </MenuItem>
          
          <MenuItem onClick={handleMenuItemClick} icon={printer} text="Printers and Faxes" />
          
          <MenuSeparator />
          
          <MenuItem onClick={handleMenuItemClick} icon={help} text="Help and Support" />
          <MenuItem onClick={handleMenuItemClick} icon={search} text="Search" />
          <MenuItem onClick={handleMenuItemClick} icon={run} text="Run..." />
        </StartMenuRight>
      </StartMenuContent>

      <StartMenuFooter>
        <FooterItem onClick={() => handleMenuItemClick('Log Off')}>
          <FooterIcon src={lock} alt="" />
          <span>Log Off</span>
        </FooterItem>
        <FooterItem onClick={() => handleMenuItemClick('Turn Off Computer')}>
          <FooterIcon src={shut} alt="" />
          <span>Turn Off Computer</span>
        </FooterItem>
      </StartMenuFooter>
    </StartMenuContainer>
  );
};

// Start Butonu Component'i
const StartButton = ({ onClick, isActive }) => {
  return (
    <StartButtonContainer onClick={onClick} isActive={isActive}>
      <StartButtonImage src={startButton} alt="Start" />
    </StartButtonContainer>
  );
};

// Ana Component
const WinXPStartMenu = ({ onMenuItemClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (text) => {
    if (onMenuItemClick) {
      onMenuItemClick(text);
    }
    closeMenu();
  };

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Container ref={menuRef}>
      <StartButton onClick={toggleMenu} isActive={isMenuOpen} />
      {isMenuOpen && (
        <StartMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          onMenuItemClick={handleMenuItemClick}
        />
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StartButtonContainer = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  transition: all 0.1s ease;

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(85%);
  }

  ${({ isActive }) =>
    isActive &&
    `
    filter: brightness(85%);
  `}
`;

const StartButtonImage = styled.img`
  height: 100%;
  margin-right: 10px;
`;

const StartMenuContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 400px;
  background: white;
  border: 1px solid #72ade9;
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const StartMenuHeader = styled.header`
  background: linear-gradient(to right, #0a246a, #1e3a8a);
  color: white;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const OrangeDivider = styled.hr`
  height: 2px;
  background: linear-gradient(to right, #ff8c00, #ffa500);
  border: none;
  margin: 0;
`;

const StartMenuContent = styled.section`
  display: flex;
  min-height: 300px;
`;

const StartMenuLeft = styled.div`
  flex: 1;
  padding: 8px 0;
  border-right: 1px solid #ccc;
`;

const StartMenuRight = styled.div`
  flex: 1;
  padding: 8px 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;
  position: relative;
  background: ${({ hover }) => (hover ? '#2f71cd' : 'transparent')};
  color: ${({ hover }) => (hover ? 'white' : 'black')};

  &:hover {
    background: #2f71cd;
    color: white;
  }
`;

const MenuIcon = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

const MenuText = styled.span`
  font-size: 11px;
  flex: 1;
`;

const MenuItemSubtext = styled.div`
  font-size: 9px;
  color: #666;
  margin-left: 24px;
  margin-top: -2px;
`;

const MenuSeparator = styled.div`
  height: 1px;
  background: #ccc;
  margin: 4px 12px;
`;

const MenuSpacer = styled.div`
  flex: 1;
`;

const MenuArrow = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid ${({ hover }) => (hover ? '#fff' : '#00136b')};
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
`;

const StartMenuFooter = styled.footer`
  background: linear-gradient(to right, #0a246a, #1e3a8a);
  color: white;
  padding: 8px 12px;
  display: flex;
  gap: 16px;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 11px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterIcon = styled.img`
  width: 16px;
  height: 16px;
`;

// SubMenu Styled Components
const SubMenuContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #72ade9;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.5);
  min-width: 200px;
  z-index: 1001;
`;

const SubMenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  position: relative;
  background: ${({ hover }) => (hover ? '#1b65cc' : 'transparent')};
  color: ${({ hover }) => (hover ? 'white' : 'black')};

  &:hover {
    background: #1b65cc;
    color: white;
  }
`;

const SubMenuIcon = styled.img`
  margin-right: 6px;
  width: 16px;
  height: 16px;
`;

const SubMenuText = styled.span`
  font-size: 11px;
  flex: 1;
  white-space: nowrap;
`;

const SubMenuArrow = styled.span`
  font-size: 8px;
  margin-left: 4px;
`;

const SubMenuSeparator = styled.div`
  height: 2px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
  margin: 2px 0;
  box-shadow: inset 3px 0 #4081ff;
`;

export default WinXPStartMenu;
