import React from "react";

interface AboutMeFileProps {
  onClose: () => void;
}

const AboutMeFile: React.FC<AboutMeFileProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col border border-gray-400" style={{ fontFamily: 'Tahoma, Arial, sans-serif', background: '#ece9d8' }}>
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-2"
        style={{ background: 'linear-gradient(to bottom, #3a6ea5 0%, #245389 100%)', color: 'white', height: 28 }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 'bold', fontSize: 13 }}>Hakkımda - Notepad</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: '#c0c0c0', color: 'black', border: '1px solid #888', borderRadius: 2, width: 22, height: 22, fontWeight: 'bold', fontSize: 16, lineHeight: '18px', marginLeft: 8 }}
        >
          ×
        </button>
      </div>

      {/* Menu Bar */}
      <div className="flex gap-4 px-2 text-xs" style={{ background: '#ece9d8', color: 'black', height: 22, borderBottom: '1px solid #b4b4b4', userSelect: 'none' }}>
        <span className="hover:bg-blue-200 cursor-pointer px-1">File</span>
        <span className="hover:bg-blue-200 cursor-pointer px-1">Edit</span>
        <span className="hover:bg-blue-200 cursor-pointer px-1">Format</span>
        <span className="hover:bg-blue-200 cursor-pointer px-1">View</span>
        <span className="hover:bg-blue-200 cursor-pointer px-1">Help</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto" style={{ background: 'white', padding: 0 }}>
        <textarea
          className="w-full h-full p-2 text-sm"
          style={{ resize: 'none', border: 'none', outline: 'none', background: 'white', fontFamily: 'Consolas, monospace', color: 'black', minHeight: '100%', minWidth: '100%' }}
          defaultValue={
`Merhabalar, ben Üzeyir Talha Kılıç.
(Ayrı bir component yapmaya üşendim. Ekranı büyütebilirsiniz.)

Kendimi tanıtmadan önce "Neden WinXP?" sorusuna cevap vermek istiyorum...

Yıl tahminen 2008. Ben 5 yaşındayım. Sokakta futbol oynarken, babamın elinde kutularla eve bir şey getirdiğini gördüm.
Yanında ise sadece bilgisayarından müzik dinlediğimiz komşumuz vardı.
Kutulardan bir şeyler çıktı, monitörü görünce o müzik dinlediğimiz ekran olduğunu anladım.
Bizi ilk karşılayan görüntü, o klasik görünüşüyle WinXP arka planı ve arayüzüydü.
Sabırsızlıkla bekledikten sonra, babamdan o şarkıyı açmasını istedim: Don Omar - Dale Don Dale.

Her gün 1 saat oynama hakkım vardı.
Ancak abim, "Abi yarış oyunu açsana," sözünden sıkılmış olacak ki, 10 dakika sonra beni masadan kaldırırdı.
(1 saatle 10 dakika arasındaki farkı o zaman bilmiyordum.)
Yıllar geçti… Oyunlar, hileler, internet kafeler derken bu arayüzün bende bu kadar etki bırakacağını bilemezdim.
Bu alanın benim mesleğim olacağını hiç bilemezdim.

Şu anda Ege Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim.
Önce bir web sitesi yayınlamanın nasıl yapıldığını merak ettim ve kendim yapmaya karar verdim.
Sonrasında bunun WinXP tarzında kişisel portföy olmasının motivasyonumu arttıracağını düşündüm.
Ve işte buradayız...

Birkaç web sitesi ve mobil uygulama projem oldu ancak hiçbirini yayınlamadım.
Bu alanlarda bir şeyler öğrendiğimi düşündüğüm için şimdi yapay zeka ve veri bilimi üzerine yoğunlaşıyorum.

Öğrenmeye hevesliyim. Konunun ne olduğu çok önemli değil; kazandığım her yeni bilgiden keyif alıyorum.
Yeni teknolojiler, tıp, kimya, tarih… Hiç fark etmez.
Takım çalışmasına kolay uyum sağlarım, iletişimim kuvvetlidir ve gerektiğinde inisiyatif almaktan çekinmem.
Hayatımı Aristotales'in Altın Orta Kuramı'na  göre yaşamaya çalışırım. (Denge her şeydir.)

Okul kulüplerinde oldukça aktif bir öğrenci olduğumu söyleyebilirim. (EKAMİT, IEEE, BEST).
Şu anki hobilerim: basketbol, futbol, yüzme, koşu, spor salonu (gym), müzik dinlemek, film/dizi izlemek.
Ancak denemek istediğim hobileri sayamam...

Belki bir gün bir fotoğraf klasörü açıp etkinliklerden ve hobilerimden kareleri de paylaşırım.
Belki de paylaşmam, bilmiyorum.

Sanırım anlatacaklarım bu kadardı.
Bana istediğiniz zaman mail yoluyla ulaşabilirsiniz.
Daha detaylı bilgi için özgeçmişime göz atmayı unutmayın!
`
          }
          readOnly
        />
      </div>
    </div>
  );
};

export default AboutMeFile; 