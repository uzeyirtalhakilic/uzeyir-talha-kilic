export type FileSystemItem = {
  id: string;
  type: "folder" | "file";
  label: string;
  translationKey?: string; // Translation key for internationalization
  disabled?: boolean;
  children?: FileSystemItem[]; // Sadece klasörler için
};

export const desktopItems: FileSystemItem[] = [
  {
    id: "1",
    type: "folder",
    label: "Who Am I?",
    translationKey: "desktop.1",
    children: [
      {
        id: "my-documents",
        type: "folder",
        label: "My Documents",
        translationKey: "desktop.myDocuments",
        children: [],
      },
      {
        id: "My CV",
        type: "file",
        label: "My CV.pdf",
        disabled: true
      },
    ],
  },
  {
    id: "2",
    type: "folder",
    label: "My Projects",
    translationKey: "desktop.2",
    children: [
      {
        id: "my-documents",
        type: "folder",
        label: "My Documents",
        translationKey: "desktop.myDocuments",
        children: [],
      },
      {
        id: "readme",
        type: "file",
        label: "README.txt",
      },
    ],
  },
  {
    id: "3",
    type: "folder",
    label: "My Hobbies",
    translationKey: "desktop.3",
    children: [
      {
        id: "my-documents",
        type: "folder",
        label: "My Documents",
        translationKey: "desktop.myDocuments",
        children: [],
      },
      {
        id: "readme",
        type: "file",
        label: "README.txt",
      },
    ],
  },
]; 