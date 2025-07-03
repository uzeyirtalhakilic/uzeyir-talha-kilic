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
    id: "my-documents-desktop",
    type: "folder",
    label: "My Documents",
    translationKey: "desktop.myDocuments",
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
  id: "about-me-txt",
  type: "file",
  label: "AboutMe.txt",
  translationKey: "desktop.aboutme",
  icon: "/icons/notepad.png",
},
]