"use client";

import React from "react";
import Footer from "../Footer/index";

interface TaskbarProps {
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
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) => {
  return (
    <Footer
      apps={apps}
      focusedAppId={focusedAppId}
      onMouseDown={onMouseDown}
      onClickMenuItem={onClickMenuItem}
    />
  );
};

export default Taskbar; 