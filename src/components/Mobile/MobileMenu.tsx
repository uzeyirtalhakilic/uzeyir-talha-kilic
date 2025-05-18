import React from "react";

const MobileMenu: React.FC = () => (
  <nav className="fixed bottom-0 left-0 w-full bg-white/80 border-t border-gray-300 flex items-center justify-around py-3 z-30">
    <button className="text-blue-700 font-semibold">Menü 1</button>
    <button className="text-blue-700 font-semibold">Menü 2</button>
    <button className="text-blue-700 font-semibold">Menü 3</button>
  </nav>
);

export default MobileMenu; 