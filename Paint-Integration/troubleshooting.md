# Paint Uygulaması Sorun Giderme Rehberi

Bu dosya, Paint uygulaması entegrasyonu sırasında karşılaşabileceğiniz yaygın sorunları ve çözümlerini içerir.

## 🚨 Yaygın Sorunlar ve Çözümleri

### 1. Paint Penceresi Açılmıyor

**Belirtiler:**

- Start menüsünden Paint'e tıkladığınızda hiçbir şey olmuyor
- Console'da hata mesajları görünüyor

**Olası Nedenler:**

- Import yolları yanlış
- appSettings'te Paint konfigürasyonu eksik
- Component export edilmemiş

**Çözümler:**

```javascript
// 1. Import'ları kontrol edin
import Paint from './Paint'; // Doğru yol
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';

// 2. appSettings'te Paint'in olduğundan emin olun
export const appSettings = {
  // ... diğer uygulamalar
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    // ... diğer ayarlar
  },
};

// 3. Export listesinde Paint'in olduğundan emin olun
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

### 2. Paint İkonu Görünmüyor

**Belirtiler:**

- Paint ikonu start menüsünde görünmüyor
- İkon dosyası bulunamıyor hatası

**Çözümler:**

```bash
# 1. İkon dosyalarının doğru konumda olduğunu kontrol edin
ls src/assets/windowsIcons/680*.png

# 2. Import yollarını kontrol edin
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
```

### 3. iframe Yüklenmiyor

**Belirtiler:**

- Paint penceresi açılıyor ama içi boş
- "jspaint.app yüklenemedi" hatası

**Olası Nedenler:**

- İnternet bağlantısı yok
- CORS politikası sorunu
- jspaint.app servisi erişilemez

**Çözümler:**

```javascript
// 1. Alternatif Paint servisi kullanın
function Paint({ onClose, isFocus }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src="https://excalidraw.com" // Alternatif servis
        frameBorder="0"
        title="paint"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(192,192,192)',
        }}
      />
      {!isFocus && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      )}
    </div>
  );
}
```

### 4. Focus Yönetimi Sorunları

**Belirtiler:**

- Paint penceresi açıkken diğer pencerelerle etkileşim sorunu
- iframe içinde tıklama çalışmıyor

**Çözümler:**

```javascript
// 1. Focus yönetimini iyileştirin
function Paint({ onClose, isFocus }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isFocus && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [isFocus]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        ref={iframeRef}
        src="https://jspaint.app"
        frameBorder="0"
        title="paint"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(192,192,192)',
        }}
      />
      {!isFocus && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none', // Sadece focus olmadığında
          }}
        />
      )}
    </div>
  );
}
```

### 5. Performans Sorunları

**Belirtiler:**

- Paint penceresi yavaş açılıyor
- Sayfa donuyor

**Çözümler:**

```javascript
// 1. Lazy loading kullanın
const Paint = React.lazy(() => import('./Paint'));

// 2. Loading state ekleyin
function PaintWrapper({ onClose, isFocus }) {
  return (
    <React.Suspense fallback={<div>Paint yükleniyor...</div>}>
      <Paint onClose={onClose} isFocus={isFocus} />
    </React.Suspense>
  );
}
```

### 6. Responsive Tasarım Sorunları

**Belirtiler:**

- Paint penceresi mobilde düzgün görünmüyor
- Boyutlandırma sorunları

**Çözümler:**

```javascript
// 1. Responsive boyutlar kullanın
const getPaintSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 768) {
    return { width: width - 20, height: height - 100 };
  }

  return { width: 800, height: 600 };
};

// 2. Paint bileşeninde kullanın
function ResponsivePaint({ onClose, isFocus }) {
  const size = getPaintSize();

  return (
    <div style={{ width: size.width, height: size.height }}>
      <Paint onClose={onClose} isFocus={isFocus} />
    </div>
  );
}
```

## 🔧 Debug Araçları

### Console Kontrolü

```javascript
// Paint bileşenine debug ekleyin
function Paint({ onClose, isFocus }) {
  console.log('Paint props:', { onClose, isFocus });

  useEffect(() => {
    console.log('Paint mounted');
    return () => console.log('Paint unmounted');
  }, []);

  // ... mevcut kod
}
```

### Network Kontrolü

```javascript
// iframe yükleme durumunu kontrol edin
function Paint({ onClose, isFocus }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!iframeLoaded && <div>Paint yükleniyor...</div>}
      {iframeError && <div>Hata: {iframeError}</div>}

      <iframe
        src="https://jspaint.app"
        frameBorder="0"
        title="paint"
        onLoad={() => setIframeLoaded(true)}
        onError={() => setIframeError('iframe yüklenemedi')}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(192,192,192)',
        }}
      />
    </div>
  );
}
```

## 📋 Kontrol Listesi

Entegrasyonu tamamladıktan sonra şunları kontrol edin:

- [ ] Paint start menüsünde görünüyor
- [ ] Paint ikonu doğru görünüyor
- [ ] Paint penceresi açılıyor
- [ ] iframe yükleniyor
- [ ] Çizim yapılabiliyor
- [ ] Pencere kapatılabiliyor
- [ ] Focus yönetimi çalışıyor
- [ ] Responsive tasarım çalışıyor
- [ ] Console'da hata yok

## 🆘 Ek Yardım

Eğer sorunlarınız devam ediyorsa:

1. **Console Hatalarını Kontrol Edin**: F12 > Console
2. **Network Sekmesini Kontrol Edin**: F12 > Network
3. **React Developer Tools Kullanın**: Component tree'yi inceleyin
4. **Proje Yapısını Kontrol Edin**: Import yollarını doğrulayın
5. **Bağımlılıkları Kontrol Edin**: package.json'da gerekli paketler var mı?

## 📞 İletişim

Sorunlarınızı çözmek için:

- Console hatalarını kopyalayın
- Ekran görüntüsü alın
- Proje yapınızı paylaşın
- Hangi adımda sorun yaşadığınızı belirtin
