import React, { useState, useEffect } from 'react';

interface PaintProps {
  onClose: () => void;
  isFocus?: boolean;
  initialImagePath?: string; // Assets'den resim yolu
  canvasSize?: { width: number; height: number }; // Canvas boyutu
  backgroundColor?: string; // Arka plan rengi
}

const Paint: React.FC<PaintProps> = ({ 
  onClose, 
  isFocus = true, 
  initialImagePath,
  canvasSize = { width: 800, height: 600 },
  backgroundColor = 'white'
}) => {
  const [iframeSrc, setIframeSrc] = useState('https://jspaint.app');

  useEffect(() => {
    if (initialImagePath) {
      // Resmi encode ederek URL olarak kullan
      const loadParam = `load:${encodeURIComponent(initialImagePath)}`;
      setIframeSrc(`https://jspaint.app/#${loadParam}`);
    } else {
      // Canvas boyutunu ve arka plan rengini ayarla
      let url = 'https://jspaint.app';
      const params = new URLSearchParams();

      if (canvasSize) {
        params.append('width', canvasSize.width.toString());
        params.append('height', canvasSize.height.toString());
      }

      if (backgroundColor) {
        params.append('bg', backgroundColor);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      setIframeSrc(url);
    }
  }, [initialImagePath, canvasSize, backgroundColor]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <iframe
        src={iframeSrc}
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
};

export default Paint; 