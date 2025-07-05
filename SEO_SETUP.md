# Google'da Görünürlük için SEO Kurulum Rehberi

## 🚀 Hızlı Başlangıç

Web sitenizi Google'da görünür hale getirmek için aşağıdaki adımları takip edin:

### 1. Google Search Console'a Kayıt Olun

1. [Google Search Console](https://search.google.com/search-console) adresine gidin
2. "URL öneki" seçeneğini seçin
3. `https://uzeyirtalhakilic.dev` adresini girin
4. HTML etiketi doğrulama yöntemini seçin
5. Verilen meta etiketini `src/app/[locale]/layout.tsx` dosyasındaki `verification.google` kısmına ekleyin

### 2. Google Analytics Kurulumu

1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. Yeni bir hesap oluşturun
3. Web sitesi için yeni bir property oluşturun
4. Measurement ID'yi (G-XXXXXXXXXX formatında) alın
5. Bu ID'yi aşağıdaki dosyalarda güncelleyin:
   - `src/app/gtag.ts` dosyasındaki `GA_TRACKING_ID`
   - `src/app/[locale]/layout.tsx` dosyasındaki Google Analytics script'lerinde

### 3. Sitemap'i Google'a Bildirin

1. Google Search Console'da "Sitemaps" bölümüne gidin
2. `https://uzeyirtalhakilic.dev/sitemap.xml` adresini ekleyin
3. "Submit" butonuna tıklayın

### 4. Google'a İndeksleme Talebi Gönderin

1. Google Search Console'da "URL Inspection" aracını kullanın
2. Ana sayfa URL'nizi (`https://uzeyirtalhakilic.dev`) girin
3. "Request Indexing" butonuna tıklayın

## 📝 Manuel Adımlar

### Google Search Console Doğrulama Kodu

`src/app/[locale]/layout.tsx` dosyasında şu satırı bulun:

```typescript
verification: {
  google: 'your-google-verification-code', // Buraya Google'dan aldığınız kodu yazın
},
```

### Google Analytics ID

`src/app/gtag.ts` ve `src/app/[locale]/layout.tsx` dosyalarında `G-XXXXXXXXXX` yerine gerçek Measurement ID'nizi yazın.

## 🔍 SEO Kontrol Listesi

- [ ] Google Search Console'a kayıt oldunuz
- [ ] Google Analytics kurulumu tamamlandı
- [ ] Sitemap Google'a bildirildi
- [ ] İndeksleme talebi gönderildi
- [ ] Meta etiketler doğru şekilde ayarlandı
- [ ] Canonical URL'ler eklendi
- [ ] Robots.txt dosyası oluşturuldu

## ⏱️ Beklenti Süreleri

- **İlk indeksleme**: 1-4 hafta
- **Arama sonuçlarında görünme**: 2-6 hafta
- **Tam SEO etkisi**: 3-6 ay

## 🛠️ Ek Öneriler

1. **İçerik Kalitesi**: Sitenizde kaliteli, özgün içerik bulundurun
2. **Sayfa Hızı**: Google PageSpeed Insights ile hızınızı test edin
3. **Mobil Uyumluluk**: Sitenizin mobil cihazlarda iyi göründüğünden emin olun
4. **Backlink'ler**: Diğer sitelerden link alın
5. **Sosyal Medya**: LinkedIn, GitHub gibi platformlarda sitenizi paylaşın

## 📊 İzleme

Google Search Console ve Google Analytics ile sitenizin performansını düzenli olarak izleyin:

- Arama sonuçlarında görünme sıklığı
- Tıklama oranları
- Sayfa yükleme hızları
- Kullanıcı davranışları

## 🆘 Sorun Giderme

Eğer siteniz hala Google'da görünmüyorsa:

1. Google Search Console'da hata mesajlarını kontrol edin
2. Sitenizin robots.txt dosyasının doğru olduğundan emin olun
3. Meta robots etiketlerini kontrol edin
4. Sitenizin erişilebilir olduğundan emin olun
5. İçerik kalitesini artırın

## 📞 Destek

Herhangi bir sorun yaşarsanız, bu dosyayı güncelleyerek sorununuzu belgeleyebilirsiniz.
