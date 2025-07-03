import React from "react";
import styles from "./DashedBox.module.css";

export default function DashedBox({ mouse, startPos }) {
  if (!startPos) return null;

  function getRect() {
    const footerHeight = 30;
    const maxY = window.innerHeight - footerHeight;
    const minY = 0;
    const x1 = startPos.x;
    const y1 = startPos.y;
    const x2 = mouse.docX;
    const y2 = mouse.docY;
    const x = Math.min(x1, x2);
    let y = Math.min(y1, y2);
    const w = Math.abs(x1 - x2);
    let h = Math.abs(y1 - y2);
    // Alt sınırı footer'a taşmasın
    if (y + h > maxY) h = maxY - y;
    // Üst sınırdan yukarı çıkmasın
    if (y < minY) {
      h = h - (minY - y);
      y = minY;
    }
    return { x, y, w, h };
  }
  const { x, y, w, h } = getRect();
  return (
    <div
    className={styles.dashedBox}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: w,
        height: h,
        position: 'absolute',
        border: `1px dotted gray`,
        pointerEvents: 'none',
      }}
    />
  );
}

