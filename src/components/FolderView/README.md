# FolderView Modüler Yapısı

Bu klasör, Windows XP tarzı klasör görünümlerini modüler bir şekilde oluşturmak için tasarlanmıştır.

## Yapı

```
FolderView/
├── base/                    # Ortak bileşenler
│   ├── BaseFolderView.tsx   # Ana klasör görünümü şablonu
│   ├── BaseSidebar.tsx      # Ortak sidebar bileşeni
│   ├── BaseContentGrid.tsx  # Ortak içerik grid bileşeni
│   └── index.ts            # Export dosyası
├── MyComputer/             # My Computer klasörü
│   ├── config.ts           # My Computer konfigürasyonu
│   └── MyComputer.tsx      # My Computer bileşeni
├── MyDocuments/            # My Documents klasörü
│   ├── config.ts           # My Documents konfigürasyonu
│   └── MyDocuments.tsx     # My Documents bileşeni
├── Toolbar.tsx             # Ortak toolbar
├── AddressBar.tsx          # Ortak address bar
└── README.md              # Bu dosya
```

## Yeni Klasör Türü Ekleme

### 1. Klasör Oluştur

```bash
mkdir src/components/FolderView/YourFolderName
```

### 2. config.ts Oluştur

```typescript
import { SidebarCard } from "../base/BaseSidebar";
import { ContentCard } from "../base/BaseContentGrid";

export const yourFolderSidebarConfig: SidebarCard[] = [
  {
    title: "Your Title",
    items: [
      {
        icon: "/icons/your-icon.png",
        text: "Your Item",
        onClick: () => console.log("Clicked!"),
      },
    ],
  },
];

export const yourFolderContentConfig: ContentCard[] = [
  {
    title: "Your Content",
    items: [
      {
        icon: "/icons/your-icon.png",
        text: "Your Content Item",
      },
    ],
  },
];
```

### 3. Ana Bileşen Oluştur

```typescript
import React from "react";
import { BaseFolderView, BaseSidebar, BaseContentGrid } from "../base";
import { yourFolderSidebarConfig, yourFolderContentConfig } from "./config";

const YourFolderName: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <BaseFolderView onClose={onClose}>
      <BaseSidebar cards={yourFolderSidebarConfig} />
      <BaseContentGrid cards={yourFolderContentConfig} />
    </BaseFolderView>
  );
};

export default YourFolderName;
```

## Özellikler

- **Modüler yapı**: Her klasör türü için ayrı konfigürasyon
- **Ortak bileşenler**: Tekrar kullanılabilir base bileşenler
- **Özelleştirilebilir**: Function bar ve address bar özelleştirme
- **Çeviri desteği**: next-intl entegrasyonu

## Konfigürasyon Seçenekleri

### SidebarItem Özellikleri

- `icon`: İkon dosya yolu
- `text`: Görüntülenecek metin
- `onClick`: Tıklama fonksiyonu
- `href`: Harici link (varsa onClick yerine kullanılır)
- `customStyle`: Özel CSS stilleri

### ContentItem Özellikleri

- `icon`: İkon dosya yolu
- `text`: Görüntülenecek metin
- `onClick`: Tıklama fonksiyonu
- `href`: Harici link
- `target`: Link hedefi (varsayılan: "\_blank")
- `rel`: Link rel özelliği (varsayılan: "noopener noreferrer")

### SidebarCard Özellikleri

- `title`: Kart başlığı
- `items`: SidebarItem dizisi
- `isCollapsible`: Daraltılabilir mi? (varsayılan: true)

### ContentCard Özellikleri

- `title`: Kart başlığı
- `items`: ContentItem dizisi

## Örnekler

### Basit Klasör

```typescript
// Basit bir klasör için sadece konfigürasyon yeterli
const simpleConfig = {
  sidebar: [{ title: "Tasks", items: [] }],
  content: [{ title: "Files", items: [] }],
};
```

### Karmaşık Klasör

```typescript
// Özel butonlar ve address bar ile
const complexConfig = {
  sidebar: [
    /* karmaşık sidebar */
  ],
  content: [
    /* karmaşık content */
  ],
  functionBar: <CustomButtons />,
  addressBar: <CustomAddressBar />,
};
```

## Çeviri Desteği

Çeviri desteği için `messages` klasöründe ilgili çeviri anahtarlarını ekleyin:

```json
{
  "folderView": {
    "yourFolderName": {
      "title": "Your Folder Title",
      "items": {
        "item1": "Item 1",
        "item2": "Item 2"
      }
    }
  }
}
```

## Stil Özelleştirme

Her klasör türü için özel CSS sınıfları ekleyebilirsiniz:

```typescript
<BaseSidebar cards={config} className="your-custom-sidebar" />
<BaseContentGrid cards={config} className="your-custom-content" />
```
