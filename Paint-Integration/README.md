# Paint Uygulaması Entegrasyonu

Bu klasör, Paint uygulamasını projenize entegre etmek için gerekli tüm dosyaları içerir.

## 📁 Dosya Yapısı

```
Paint-Integration/
├── README.md                    # Bu dosya
├── Paint/
│   └── index.js                # Ana Paint bileşeni
├── assets/
│   └── windowsIcons/
│       ├── 680(16x16).png      # Paint ikonu (16x16)
│       └── 680(32x32).png      # Paint ikonu (32x32)
├── app-config.js               # Paint uygulama konfigürasyonu
└── integration-steps.md        # Adım adım entegrasyon talimatları
```

## 🎨 Paint Uygulaması Hakkında

Paint uygulaması, harici bir iframe kullanarak [jspaint.app](https://jspaint.app) servisini entegre eder. Bu, tam özellikli bir çizim uygulamasıdır.

## 🚀 Entegrasyon Adımları

1. **Dosyaları Kopyalayın**: Bu klasördeki dosyaları projenizin uygun konumlarına kopyalayın
2. **Konfigürasyonu Ekleyin**: `app-config.js` dosyasındaki ayarları projenizin uygulama konfigürasyonuna ekleyin
3. **İkonları Kopyalayın**: `assets/windowsIcons/` klasöründeki ikonları projenizin assets klasörüne kopyalayın
4. **Import'ları Ekleyin**: Gerekli import ifadelerini projenizin ana dosyalarına ekleyin

## 📋 Gereksinimler

- React
- Styled Components (eğer kullanıyorsanız)
- İnternet bağlantısı (jspaint.app için)

## ⚠️ Önemli Notlar

- Paint uygulaması harici bir servis kullandığı için internet bağlantısı gereklidir
- Uygulama iframe içinde çalışır, bu yüzden focus yönetimi önemlidir
- Paint uygulaması multi-instance destekler (birden fazla pencere açılabilir)

## 🔧 Özelleştirme

Paint uygulamasının görünümünü ve davranışını özelleştirmek için:

- `Paint/index.js` dosyasını düzenleyin
- `app-config.js` dosyasındaki ayarları değiştirin
- İkonları değiştirin

## 📞 Destek

Herhangi bir sorun yaşarsanız, projenizin mevcut yapısına uygun şekilde entegrasyonu gerçekleştirin.
