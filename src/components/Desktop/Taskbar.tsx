"use client";

import React from "react";
import Footer from "./Footer/index";

interface TaskbarProps {
  onMouseDownApp: (id: string) => void;
  apps: Array<{
    id: string;
    header: {
      icon: string;
      title: string;
      noFooterWindow?: boolean;
    };
  }>;
  focusedAppId: string | null;
  onMouseDown: () => void;
  onClickMenuItem: (name: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  onMouseDownApp,
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) => {
  return (
    <Footer
      onMouseDownApp={onMouseDownApp}
      apps={apps}
      focusedAppId={focusedAppId}
      onMouseDown={onMouseDown}
      onClickMenuItem={onClickMenuItem}
    />
  );
};

export default Taskbar; 