import React, { useEffect, useState } from "react";
import XpErrorWindow from "@/components/XpErrorWindow";
import { useTranslations } from 'next-intl';

const MobileHome: React.FC = () => {
  const t = useTranslations('mobile');

  useEffect(() => {
    // Play error sound when component mounts
    const audio = new Audio('/sounds/error.wav');
    audio.play().catch(e => console.log('Audio play failed:', e));
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: 'url(/wallpapers/xp-bliss-placeholder.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* XpErrorWindow - Centered and non-closable */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="max-w-sm w-full">
          <XpErrorWindow
            title="Mobil Uyarı"
            message={t('warning')}
            onClose={() => {}} // Empty function to disable closing
          />
        </div>
      </div>
    </div>
  );
};

export default MobileHome; 