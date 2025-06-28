# Windows XP Start Menü Component'ı

Bu component, Windows XP'nin klasik start menüsünü React ve styled-components kullanarak yeniden oluşturur. Tüm özellikleri ve görsel detayları ile birlikte gelir.

## 🎯 Özellikler

- ✅ **Windows XP tarzı tasarım** - Orijinal Windows XP start menüsünün birebir kopyası
- ✅ **Gerçek icon'lar** - Orijinal Windows XP icon'ları kullanılıyor
- ✅ **Alt menüler** - Hover ile açılan alt menüler
- ✅ **Responsive tasarım** - Farklı ekran boyutlarında uyumlu
- ✅ **Hover efektleri** - Orijinal Windows XP hover animasyonları
- ✅ **Dışarı tıklandığında kapanma** - Kullanıcı dostu etkileşim
- ✅ **Customizable callback** - Menü öğelerine tıklandığında özel işlemler
- ✅ **Styled-components** - Modern CSS-in-JS yaklaşımı

## 📦 Kurulum

### Gereksinimler

```bash
npm install react styled-components
```

### Icon Dosyaları

Component'ın çalışması için aşağıdaki icon dosyalarının mevcut olması gerekir:

```
src/assets/windowsIcons/
├── start.png
├── user.png
├── ie.png
├── ie-paper.png
├── 327(32x32).png (notepad)
├── winamp.png
├── 680(32x32).png (paint)
├── 846(32x32).png (media player)
├── msn.png
├── 308(32x32).png (documents)
├── 301(32x32).png (recent documents)
├── 307(32x32).png (pictures)
├── 550(32x32).png (music)
├── 676(32x32).png (computer)
├── 300(32x32).png (control panel)
├── 227(32x32).png (set access)
├── 309(32x32).png (connect)
├── 549(32x32).png (printer)
├── 747(32x32).png (help)
├── 299(32x32).png (search)
├── 743(32x32).png (run)
├── 546(32x32).png (lock)
├── 310(32x32).png (shut)
├── all-programs.ico
└── empty.png

src/assets/minesweeper/
└── mine-icon.png

src/assets/windowsIcons/ (16x16 icon'lar)
├── 227(16x16).png
├── 392(16x16).png
├── 322(16x16).png
├── 358(16x16).png
├── 238(16x16).png
├── 817(16x16).png
├── narrator.ico
├── 58(16x16).png
├── 119(16x16).png
├── 669(16x16).png
├── 404(16x16).png
├── 664(16x16).png
├── 663(16x16).png
├── 234(16x16).png
├── 690(16x16).png
├── 120(16x16).png
├── 23(16x16).png
├── 128(16x16).png
├── 374(16x16).png
├── 505(16x16).png
├── 716(16x16).png
└── ... (diğer oyun icon'ları)
```

## 🚀 Kullanım

### Temel Kullanım

```jsx
import React from "react";
import WinXPStartMenu from "./WinXPStartMenu";

function App() {
  const handleMenuItemClick = (text) => {
    console.log("Seçilen menü öğesi:", text);

    // Menü öğesine göre işlemler
    switch (text) {
      case "Internet":
        // Internet Explorer'ı aç
        break;
      case "Minesweeper":
        // Minesweeper oyununu başlat
        break;
      case "My Computer":
        // My Computer'ı aç
        break;
      default:
        console.log(`${text} seçildi`);
    }
  };

  return (
    <div>
      <WinXPStartMenu onMenuItemClick={handleMenuItemClick} />
    </div>
  );
}
```

### Görev Çubuğu İçinde Kullanım

```jsx
import React from "react";
import WinXPStartMenu from "./WinXPStartMenu";

function TaskBar() {
  const handleMenuItemClick = (text) => {
    // Menü işlemleri
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        height: "30px",
        background:
          "linear-gradient(to bottom, #1f2f86 0, #3165c4 3%, #3682e5 6%, #4490e6 10%, #3883e5 12%, #2b71e0 15%, #2663da 18%, #235bd6 20%, #2258d5 23%, #2157d6 38%, #245ddb 54%, #2562df 86%, #245fdc 89%, #2158d4 92%, #1d4ec0 95%, #1941a5 98%)",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        zIndex: 1000,
      }}
    >
      <WinXPStartMenu onMenuItemClick={handleMenuItemClick} />

      {/* Diğer görev çubuğu öğeleri */}
    </div>
  );
}
```

## 📋 Props

| Prop              | Tip        | Zorunlu | Açıklama                                        |
| ----------------- | ---------- | ------- | ----------------------------------------------- |
| `onMenuItemClick` | `function` | ✅      | Menü öğesine tıklandığında çağrılacak fonksiyon |

### onMenuItemClick Fonksiyonu

```jsx
const handleMenuItemClick = (text) => {
  // text: Seçilen menü öğesinin adı (string)
  console.log("Seçilen:", text);
};
```

## 🎨 Menü Yapısı

### Sol Panel

- **Internet** - Internet Explorer
- **E-mail** - Outlook Express
- **Minesweeper** - Oyun
- **Notepad** - Metin editörü
- **Winamp** - Müzik çalar
- **Paint** - Çizim programı
- **Windows Media Player** - Medya oynatıcı
- **Windows Messenger** - Mesajlaşma
- **All Programs** - Tüm programlar (alt menü)

### Sağ Panel

- **My Documents** - Belgelerim
- **My Recent Documents** - Son kullanılan belgeler (alt menü)
- **My Pictures** - Resimlerim
- **My Music** - Müziklerim
- **My Computer** - Bilgisayarım
- **Control Panel** - Denetim Masası
- **Set Program Access and Defaults** - Program erişimi
- **Connect To** - Bağlantılar (alt menü)
- **Printers and Faxes** - Yazıcılar ve Faks
- **Help and Support** - Yardım ve Destek
- **Search** - Arama
- **Run...** - Çalıştır

### Alt Menüler

- **All Programs** > **Accessories** > **Accessibility**
- **All Programs** > **Accessories** > **Communications**
- **All Programs** > **Accessories** > **Entertainment**
- **All Programs** > **Accessories** > **System Tools**
- **All Programs** > **Games**

### Alt Bilgi

- **Log Off** - Çıkış yap
- **Turn Off Computer** - Bilgisayarı kapat

## 🎯 Özelleştirme

### Menü Verilerini Değiştirme

Component içindeki `AllPrograms`, `MyRecentDocuments` ve `ConnectTo` array'lerini düzenleyerek menü yapısını özelleştirebilirsiniz.

### Stil Özelleştirme

Styled-components kullanıldığı için, component'ın stillerini doğrudan düzenleyebilirsiniz:

```jsx
const CustomStartMenu = styled(WinXPStartMenu)`
  // Özel stiller
`;
```

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **React** - UI framework
- **styled-components** - CSS-in-JS
- **useState** - State yönetimi
- **useEffect** - Side effects
- **useRef** - DOM referansları

### Dosya Yapısı

```
WinXPStartMenu.jsx
├── Icon importları
├── Menü verileri (AllPrograms, MyRecentDocuments, ConnectTo)
├── SubMenu component'i
├── StartMenu component'i
├── StartButton component'i
├── Ana WinXPStartMenu component'i
└── Styled components
```

### Performans

- Lazy loading destekli
- Optimized re-renders
- Efficient event handling
- Minimal bundle size

## 🐛 Sorun Giderme

### Icon'lar Yüklenmiyor

- Icon dosyalarının doğru path'de olduğundan emin olun
- Import path'lerini kontrol edin
- Dosya isimlerinin doğru olduğunu kontrol edin

### Menü Açılmıyor

- `onMenuItemClick` prop'unun geçildiğinden emin olun
- Console'da hata mesajlarını kontrol edin

### Stil Sorunları

- styled-components'ın yüklü olduğundan emin olun
- CSS-in-JS desteğini kontrol edin

## 📄 Lisans

Bu component MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

**Not:** Bu component eğitim amaçlı oluşturulmuştur ve Windows XP'nin orijinal start menüsünün yeniden oluşturulmasıdır.
