# Paint Uygulaması Entegrasyon Adımları

Bu dosya, Paint uygulamasını projenize entegre etmek için gereken tüm adımları içerir.

## 📋 Ön Gereksinimler

- React projesi
- Styled Components (opsiyonel)
- İnternet bağlantısı

## 🚀 Adım Adım Entegrasyon

### 1. Dosyaları Kopyalama

```bash
# Paint bileşenini kopyalayın
cp Paint-Integration/Paint/ projeniz/src/apps/Paint/

# İkonları kopyalayın
cp Paint-Integration/assets/windowsIcons/680*.png projeniz/src/assets/windowsIcons/
```

### 2. Ana Uygulama Dosyasına Import Ekleme

`projeniz/src/apps/index.js` dosyasına şu import'ları ekleyin:

```javascript
import Paint from './Paint';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
```

### 3. AppSettings'e Paint Konfigürasyonu Ekleme

`projeniz/src/apps/index.js` dosyasındaki `appSettings` objesine şunu ekleyin:

```javascript
export const appSettings = {
  // ... mevcut uygulamalar ...

  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
};
```

### 4. Default Icon State'e Paint Ekleme

`projeniz/src/apps/index.js` dosyasındaki `defaultIconState` array'ine şunu ekleyin:

```javascript
export const defaultIconState = [
  // ... mevcut ikonlar ...
  {
    id: 5, // Benzersiz bir ID kullanın
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
];
```

### 5. Footer Menu'ye Paint Ekleme

`projeniz/src/WinXP/Footer/FooterMenuData.js` dosyasına şu import'u ekleyin:

```javascript
import painter from 'assets/windowsIcons/680(16x16).png';
```

Ve `footerMenuData` array'ine şunu ekleyin:

```javascript
{
  icon: painter,
  text: 'Paint',
  action: 'Paint'
},
```

### 6. Start Menu'ye Paint Ekleme

`projeniz/src/WinXP/Footer/FooterMenu.js` dosyasına şu import'u ekleyin:

```javascript
import paint from 'assets/windowsIcons/680(32x32).png';
```

Ve `startMenuData` array'ine şunu ekleyin:

```javascript
{ icon: paint, text: 'Paint' },
```

### 7. Ana Uygulama Yöneticisine Paint Ekleme

`projeniz/src/WinXP/index.js` dosyasındaki uygulama açma mantığına Paint'i ekleyin:

```javascript
// Uygulama açma fonksiyonunda
else if (o === 'Paint')
  dispatch({ type: ADD_APP, payload: appSettings.Paint });
```

### 8. Export Listesine Paint Ekleme

`projeniz/src/apps/index.js` dosyasının sonundaki export listesine Paint'i ekleyin:

```javascript
export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Winamp,
  Paint,
};
```

## 🔧 Özelleştirme Seçenekleri

### Pencere Boyutunu Değiştirme

```javascript
defaultSize: {
  width: 800,  // Genişlik
  height: 600, // Yükseklik
},
```

### Başlangıç Pozisyonunu Değiştirme

```javascript
defaultOffset: {
  x: 100, // X koordinatı
  y: 50,  // Y koordinatı
},
```

### Multi-Instance'ı Kapatma

```javascript
multiInstance: false, // Sadece bir pencere açılabilir
```

## ⚠️ Önemli Notlar

1. **İnternet Bağlantısı**: Paint uygulaması jspaint.app servisini kullanır
2. **Focus Yönetimi**: iframe focus yönetimi için özel div kullanılır
3. **Responsive**: Pencere boyutları responsive tasarım için ayarlanmıştır
4. **ID Çakışması**: defaultIconState'te benzersiz ID kullandığınızdan emin olun

## 🧪 Test Etme

Entegrasyonu test etmek için:

1. Projeyi başlatın: `npm start` veya `yarn start`
2. Start menüsünden Paint'i açın
3. Paint penceresinin düzgün açıldığını kontrol edin
4. Çizim yapabildiğinizi test edin
5. Birden fazla Paint penceresi açabildiğinizi kontrol edin

## 🐛 Sorun Giderme

### Paint Açılmıyor

- Import'ların doğru olduğunu kontrol edin
- appSettings'te Paint konfigürasyonunun eklendiğini kontrol edin
- Console'da hata olup olmadığını kontrol edin

### İkon Görünmüyor

- İkon dosyalarının doğru konuma kopyalandığını kontrol edin
- Import yollarının doğru olduğunu kontrol edin

### iframe Yüklenmiyor

- İnternet bağlantınızı kontrol edin
- jspaint.app'in erişilebilir olduğunu kontrol edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:

1. Console hatalarını kontrol edin
2. Import yollarını doğrulayın
3. Konfigürasyon dosyalarını kontrol edin
4. Gerekirse projenizin mevcut yapısına uygun şekilde adapte edin
