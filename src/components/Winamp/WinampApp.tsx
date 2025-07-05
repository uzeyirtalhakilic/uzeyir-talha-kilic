"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const playlist = [
  {
    url: "/winamp/Dale Don Dale.mp3",
    metaData: {
      artist: "Don Omar",
      title: "DALE DON DALE"
    }
  },
  {
    url: "/winamp/Seda Tripkolic - Gözlerinin Yeşilini Özledim (Offical Video).mp3",
    metaData: {
      artist: "Seda Tripkolic",
      title: "Gözlerinin Yeşilini Özledim"
    }
  },
  {
    url: "/winamp/İrem - Hayalet Sevgilim (Official Audio).mp3",
    metaData: {
      artist: "İrem",
      title: "Hayalet Sevgilim"
    }
  },
  {
    url: "/winamp/İsmail YK - Bas Gaza (Official Video).mp3",
    metaData: {
      artist: "İsmail YK",
      title: "Bas Gaza"
    }
  },
  {
    url: "/winamp/Justin Timberlake - SexyBack (Official Video) ft. Timbaland.mp3",
    metaData: {
      artist: "Justin Timberlake",
      title: "SexyBack"
    }
  },
  {
    url: "/winamp/Baytar.mp3",
    metaData: {
      artist: "Baytar",
      title: "Baytar"
    }
  },
  {
    url: "/winamp/Ceza - Yerli Plaka (Official Video) [Yüksek Kalite].mp3",
    metaData: {
      artist: "Ceza",
      title: "Yerli Plaka"
    }
  },
  {
    url: "/winamp/Coolio - Gangstas Paradise (feat. L.V.) [Official Music Video].mp3",
    metaData: {
      artist: "Coolio",
      title: "Gangsta's Paradise"
    }
  },
  {
    url: "/winamp/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3",
    metaData: {
      artist: "Dr. Dre",
      title: "Still D.R.E."
    }
  },
];

const WinampApp: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const winampRef = useRef<HTMLDivElement>(null);
  const webampInstance = useRef<any>(null);
  const [webampLoaded, setWebampLoaded] = useState(false);
  const onCloseRef = useRef(onClose);

  console.log('WinampApp onClose prop:', onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    let disposed = false;
    import("webamp")
      .then(({ default: Webamp }) => {
        setWebampLoaded(true);
        if (winampRef.current && !webampInstance.current) {
          webampInstance.current = new Webamp({
            initialTracks: playlist,
            availableSkins: [
              {
                url: "/skins/5e4f10275dcb1fb211d4a8b4f1bda236.wsz",
                name: "Winamp Custom Skin"
              }
            ],
            initialSkin: {
              url: "/skins/5e4f10275dcb1fb211d4a8b4f1bda236.wsz"
            },
            enableHotkeys: false,
          });
          webampInstance.current.onClose(() => {
            console.log('Webamp onClose event tetiklendi');
            if (onCloseRef.current) onCloseRef.current();
          });
          webampInstance.current.renderWhenReady(winampRef.current);
        }
      })
      .catch((err) => {
        console.error("Webamp import hatası:", err);
      });
    return () => {
      disposed = true;
      if (webampInstance.current) {
        webampInstance.current.dispose();
        webampInstance.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  // onClose cleanup'ta değil, butona tıklanınca çağrılır
  const handleClose = () => {
    if (webampInstance.current) {
      webampInstance.current.dispose();
      webampInstance.current = null;
    }
    if (onClose) onClose();
  };

  return (
    <>
      {/* Loading ekranı */}
      {!webampLoaded && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "300vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Image src="/icons/winamp.png" alt="Winamp" width={64} height={64} />
          </div>
        </div>
      )}
      {/* Webamp arayüzü */}
      <div
        ref={winampRef}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          pointerEvents: webampLoaded ? "auto" : "none"
        }}
      />
    </>
  );
};

export default WinampApp;