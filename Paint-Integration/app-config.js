// Paint Uygulaması Konfigürasyonu
// Bu dosyayı projenizin uygulama konfigürasyonuna entegre edin

import Paint from './Paint';
import paintLarge from './assets/windowsIcons/680(32x32).png';
import paint from './assets/windowsIcons/680(16x16).png';

// Paint uygulaması için appSettings konfigürasyonu
export const paintAppSettings = {
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

// Paint için default icon state
export const paintIconState = {
  id: 5, // Benzersiz bir ID kullanın
  icon: paintLarge,
  title: 'Paint',
  component: Paint,
  isFocus: false,
};

// Paint için import ifadeleri
export const paintImports = {
  component: "import Paint from './Paint';",
  icons: [
    "import paintLarge from './assets/windowsIcons/680(32x32).png';",
    "import paint from './assets/windowsIcons/680(16x16).png';"
  ]
};

// Paint için footer menu konfigürasyonu
export const paintFooterConfig = {
  icon: paint,
  text: 'Paint',
  action: 'Paint'
};

// Paint için start menu konfigürasyonu
export const paintStartMenuConfig = {
  icon: paintLarge,
  title: 'Paint',
  component: Paint,
}; 