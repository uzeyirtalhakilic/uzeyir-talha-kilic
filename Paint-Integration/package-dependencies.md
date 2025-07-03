# Paint Uygulaması Bağımlılıkları

Bu dosya, Paint uygulamasının çalışması için gerekli olan bağımlılıkları listeler.

## 📦 Gerekli NPM Paketleri

Paint uygulaması temel olarak React kullanır ve harici bir iframe servisi kullanır. Aşağıdaki paketlerin projenizde yüklü olduğundan emin olun:

### Temel Bağımlılıklar

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
}
```

### Opsiyonel Bağımlılıklar

Eğer projenizde styled-components kullanıyorsanız:

```json
{
  "styled-components": "^5.0.0 || ^6.0.0"
}
```

## 🔧 Kurulum Komutları

### Yarn ile Kurulum

```bash
# Temel React bağımlılıkları (eğer yoksa)
yarn add react react-dom

# Styled Components (eğer kullanıyorsanız)
yarn add styled-components
```

### NPM ile Kurulum

```bash
# Temel React bağımlılıkları (eğer yoksa)
npm install react react-dom

# Styled Components (eğer kullanıyorsanız)
npm install styled-components
```

## 🌐 Harici Servis Bağımlılıkları

Paint uygulaması aşağıdaki harici servisleri kullanır:

### jspaint.app

- **URL**: https://jspaint.app
- **Açıklama**: Tam özellikli web tabanlı Paint uygulaması
- **Gereksinim**: İnternet bağlantısı
- **Alternatif**: Eğer bu servis erişilemezse, başka bir Paint servisi kullanabilirsiniz

## 📋 Sistem Gereksinimleri

### Tarayıcı Desteği

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Minimum Sistem Gereksinimleri

- Modern web tarayıcısı
- İnternet bağlantısı
- JavaScript etkin

## ⚠️ Önemli Notlar

1. **İnternet Bağlantısı**: Paint uygulaması çalışmak için internet bağlantısı gerektirir
2. **CORS Politikaları**: iframe kullanımı için CORS politikalarının uygun olması gerekir
3. **Güvenlik**: Harici iframe kullanımı güvenlik riskleri oluşturabilir
4. **Performans**: iframe yükleme süresi kullanıcı deneyimini etkileyebilir

## 🔄 Alternatif Çözümler

Eğer harici servis kullanmak istemiyorsanız:

### 1. Kendi Paint Uygulamanızı Geliştirin

- Canvas API kullanarak
- Fabric.js kütüphanesi ile
- Konva.js kütüphanesi ile

### 2. Farklı Paint Servisleri

- https://excalidraw.com
- https://draw.io
- https://www.tldraw.com

### 3. Offline Çözümler

- HTML5 Canvas tabanlı basit çizim uygulaması
- SVG tabanlı çizim uygulaması

## 🧪 Test Etme

Bağımlılıkların doğru kurulduğunu test etmek için:

```bash
# Bağımlılıkları kontrol edin
npm list react react-dom
# veya
yarn list react react-dom

# Projeyi başlatın
npm start
# veya
yarn start
```

## 📞 Sorun Giderme

### Bağımlılık Hataları

```bash
# Node modules'u temizleyin
rm -rf node_modules
npm install
# veya
yarn install
```

### iframe Yükleme Sorunları

- İnternet bağlantınızı kontrol edin
- Tarayıcı konsolunda CORS hatalarını kontrol edin
- Güvenlik duvarı ayarlarını kontrol edin
