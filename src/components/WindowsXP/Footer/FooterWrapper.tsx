"use client";
import { useRef, useEffect, useState } from "react";
import Footer from ".";
import FooterMenu from "./FooterMenu";

export default function FooterWrapper() {
  const [menuOn, setMenuOn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklanınca menüyü kapat
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      setTimeout(() => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOn(false);
        }
      }, 0);
    }
    if (menuOn) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOn]);

  function toggleMenu() {
    setMenuOn((on) => {
      if (on) return false;
      return true;
    });
  }

  return (
    <div ref={menuRef}>
      <Footer
        apps={[]}
        focusedAppId={null}
        onMouseDown={() => {}}
        onClickMenuItem={() => {}}
        onWindowClick={() => {}}
        menuOn={menuOn}
        toggleMenu={toggleMenu}
      />
      {menuOn && (
        <FooterMenu onClick={() => setMenuOn(false)} />
      )}
    </div>
  );
} 