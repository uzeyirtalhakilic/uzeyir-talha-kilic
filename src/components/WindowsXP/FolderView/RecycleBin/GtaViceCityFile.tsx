import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface GtaViceCityFileProps {
  onClose: () => void;
}

const GtaViceCityFile: React.FC<GtaViceCityFileProps> = () => {
  const locale = useLocale();
  const imageUrl = locale === 'tr' ? '/Photos/gta-turk.jpg' : '/Photos/vice-city.jpg';
  const altText = locale === 'tr' ? 'GTA Türk' : 'GTA Vice City';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#222' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          src={imageUrl}
          alt={altText}
          fill
          style={{ objectFit: 'contain', borderRadius: 8 }}
        />
      </div>
    </div>
  );
};

export default GtaViceCityFile; 