import DesktopIcon from "../components/Desktop/DesktopIcon";
import Taskbar from "../components/Desktop/Taskbar";
import Window from "../components/Desktop/Window";


export default function Home() {
  return (
    <div className="relative w-screen h-screen min-h-screen overflow-hidden font-sans">
      {/* Arka Plan */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/wallpapers/xp-bliss-placeholder.jpeg")'
        }}
      />

      {/* Masaüstü İkonları */}
      <div className="absolute left-6 top-6 flex flex-col gap-4 select-none">
        <DesktopIcon label="Projects" />
        {/* Başka ikonlar eklenebilir */}
      </div>

      {/* Görev Çubuğu */}
      <Taskbar />
    </div>
  );
}
