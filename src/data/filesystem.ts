export type FileSystemItem = {
  id: string;
  type: "folder" | "file";
  label: string;
  translationKey?: string; // Translation key for internationalization
  disabled?: boolean;
  children?: FileSystemItem[]; // Only for folders
  icon?: string; // Icon path for the item
};

export const desktopItems: FileSystemItem[] = [
  {
    id: "my-computer",
    type: "folder",
    label: "My Computer",
    translationKey: "desktop.myComputer",
    icon: "/icons/MyComputer.png",
    children: [],
  },
  {
    id: "recycle-bin",
    type: "folder",
    label: "Recycle Bin",
    translationKey: "desktop.recycleBin",
    icon: "/icons/recycle.png",
    children: [],
  },
  {
    id: "who-am-i",
    type: "folder",
    label: "Who Am I?",
    translationKey: "desktop.1",
    icon: "/icons/folderdocument.png",
    children: [],
  },
  {
    id: "read-me-txt",
    type: "file",
    label: "ReadMe.txt",
    translationKey: "desktop.readme",
    icon: "/icons/notepad.png",
  },
]; 

export const FileItems: FileSystemItem[] = [  
  {
    id: "paint",
    type: "file",
    label: "Paint",
    translationKey: "desktop.paint",
    icon: "/icons/680(32x32).png",
  },
  {
    id: "winamp",
    type: "file",
    label: "Winamp",
    translationKey: "desktop.winamp",
    icon: "/icons/winamp.png",
  },
  {
    id: "about-me-txt",
  type: "file",
  label: "AboutMe.txt",
  translationKey: "desktop.aboutme",
  icon: "/icons/notepad.png",
  },
  {
    id: "gta-cheat-txt",
    type: "file",
    label: "GTA Cheats.txt",
    translationKey: "desktop.gtaCheats",
    icon: "/icons/notepad.png",
  },
  {
  id: "my-projects",
  type: "folder",
  label: "My Projects",
  translationKey: "desktop.myProjects",
  icon: "/icons/folderdocument.png",
  children: [],
},
  {
    id: "gtaViceCity",
    type: "file",
    label: "GTA Vice City",
    translationKey: "desktop.gtaViceCity",
    icon: "/icons/gtavc.ico",
  },
]