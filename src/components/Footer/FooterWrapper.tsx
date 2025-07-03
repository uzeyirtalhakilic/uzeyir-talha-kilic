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
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOn(false);
      }
    }
    if (menuOn) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOn]);

  function toggleMenu() {
    setMenuOn((on) => !on);
  }

  return (
    <>
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
        <div ref={menuRef}>
          <FooterMenu onClick={() => setMenuOn(false)} />
        </div>
      )}
    </>
  );
} 