// Paint Uygulaması Kullanım Örnekleri
// Bu dosya, Paint uygulamasının nasıl kullanılacağını gösterir

import React from 'react';
import Paint from './Paint';

// 1. Basit Paint Kullanımı
function SimplePaintExample() {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <Paint 
        onClose={() => console.log('Paint closed')}
        isFocus={true}
      />
    </div>
  );
}

// 2. Paint ile Pencere Yönetimi
function PaintWithWindowManagement() {
  const [isPaintOpen, setIsPaintOpen] = React.useState(false);
  const [paintFocus, setPaintFocus] = React.useState(false);

  const openPaint = () => {
    setIsPaintOpen(true);
    setPaintFocus(true);
  };

  const closePaint = () => {
    setIsPaintOpen(false);
    setPaintFocus(false);
  };

  const handlePaintFocus = () => {
    setPaintFocus(true);
  };

  const handlePaintBlur = () => {
    setPaintFocus(false);
  };

  return (
    <div>
      <button onClick={openPaint}>Paint Aç</button>
      <button onClick={closePaint}>Paint Kapat</button>
      
      {isPaintOpen && (
        <div 
          style={{ 
            width: '800px', 
            height: '600px',
            border: paintFocus ? '2px solid blue' : '2px solid gray'
          }}
          onFocus={handlePaintFocus}
          onBlur={handlePaintBlur}
        >
          <Paint 
            onClose={closePaint}
            isFocus={paintFocus}
          />
        </div>
      )}
    </div>
  );
}

// 3. Çoklu Paint Penceresi
function MultiplePaintWindows() {
  const [paintWindows, setPaintWindows] = React.useState([]);
  const [nextId, setNextId] = React.useState(1);

  const addPaintWindow = () => {
    const newWindow = {
      id: nextId,
      isOpen: true,
      isFocus: false,
      position: { x: 50 * nextId, y: 50 * nextId }
    };
    
    setPaintWindows([...paintWindows, newWindow]);
    setNextId(nextId + 1);
  };

  const closePaintWindow = (id) => {
    setPaintWindows(paintWindows.filter(window => window.id !== id));
  };

  const focusPaintWindow = (id) => {
    setPaintWindows(paintWindows.map(window => ({
      ...window,
      isFocus: window.id === id
    })));
  };

  return (
    <div>
      <button onClick={addPaintWindow}>Yeni Paint Penceresi Ekle</button>
      
      {paintWindows.map(window => (
        <div
          key={window.id}
          style={{
            position: 'absolute',
            left: window.position.x,
            top: window.position.y,
            width: '600px',
            height: '500px',
            border: window.isFocus ? '2px solid blue' : '2px solid gray',
            zIndex: window.isFocus ? 1000 : 100
          }}
          onClick={() => focusPaintWindow(window.id)}
        >
          <div style={{ 
            background: '#c0c0c0', 
            padding: '5px', 
            borderBottom: '1px solid #808080',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Paint - Pencere {window.id}</span>
            <button onClick={() => closePaintWindow(window.id)}>X</button>
          </div>
          
          <Paint 
            onClose={() => closePaintWindow(window.id)}
            isFocus={window.isFocus}
          />
        </div>
      ))}
    </div>
  );
}

// 4. Paint ile Özel Stil
function StyledPaintExample() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '800px',
        height: '600px',
        margin: '0 auto',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        border: '3px solid #fff'
      }}>
        <Paint 
          onClose={() => console.log('Styled Paint closed')}
          isFocus={true}
        />
      </div>
    </div>
  );
}

// 5. Paint ile Event Handling
function PaintWithEvents() {
  const [paintEvents, setPaintEvents] = React.useState([]);

  const handlePaintEvent = (eventType, data) => {
    const newEvent = {
      id: Date.now(),
      type: eventType,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setPaintEvents([newEvent, ...paintEvents.slice(0, 9)]); // Son 10 event'i tut
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '800px', height: '600px' }}>
        <Paint 
          onClose={() => handlePaintEvent('close', 'Paint kapatıldı')}
          isFocus={true}
        />
      </div>
      
      <div style={{ 
        width: '300px', 
        height: '600px', 
        background: '#f5f5f5',
        padding: '10px',
        overflowY: 'auto'
      }}>
        <h3>Paint Events</h3>
        {paintEvents.map(event => (
          <div key={event.id} style={{
            background: '#fff',
            padding: '8px',
            margin: '5px 0',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <strong>{event.type}</strong>
            <br />
            <small>{event.timestamp}</small>
            {event.data && <div>{event.data}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Responsive Paint
function ResponsivePaintExample() {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paintWidth = Math.min(800, windowSize.width - 40);
  const paintHeight = Math.min(600, windowSize.height - 100);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f0f0'
    }}>
      <div style={{
        width: paintWidth,
        height: paintHeight,
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Paint 
          onClose={() => console.log('Responsive Paint closed')}
          isFocus={true}
        />
      </div>
    </div>
  );
}

// Export tüm örnekleri
export {
  SimplePaintExample,
  PaintWithWindowManagement,
  MultiplePaintWindows,
  StyledPaintExample,
  PaintWithEvents,
  ResponsivePaintExample
};

// Kullanım talimatları
export const usageInstructions = `
# Paint Uygulaması Kullanım Örnekleri

## 1. Basit Kullanım
<SimplePaintExample />

## 2. Pencere Yönetimi ile
<PaintWithWindowManagement />

## 3. Çoklu Pencere
<MultiplePaintWindows />

## 4. Özel Stil ile
<StyledPaintExample />

## 5. Event Handling ile
<PaintWithEvents />

## 6. Responsive Tasarım
<ResponsivePaintExample />

## Props Açıklamaları

- onClose: Paint penceresi kapatıldığında çağrılır
- isFocus: Paint penceresinin odaklanmış olup olmadığını belirtir

## Önemli Notlar

1. Paint uygulaması iframe içinde çalışır
2. İnternet bağlantısı gereklidir
3. Focus yönetimi önemlidir
4. Responsive tasarım için boyutları ayarlayın
`; 