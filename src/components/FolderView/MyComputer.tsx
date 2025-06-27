import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import Toolbar from "./Toolbar";
import AddressBar from "./AddressBar";
import Sidebar from "./Sidebar";
import ContentGrid from "./ContentGrid";
import "../../styles/desktop.css";

interface MyComputerProps {
  onClose: () => void;
}

const MyComputer: React.FC<MyComputerProps> = ({ onClose }) => {
  const t = useTranslations('folderView.myComputer');

  return (
    <div className="mycomputer-container">
      {/* Toolbar Section */}
      <Toolbar onClose={onClose} />

      {/* Function Bar Section */}
      <section className="function-bar">
        <button className="function-button" disabled>
          <span className="function-button-icon">
            <Image src="/icons/back.png" alt="Back" width={30} height={30} />
          </span>
          <span className="function-button-text">{t('back')}</span>
          <div className="function-button-dropdown">
            <div className="function-button-dropdown-arrow"></div>
          </div>
        </button>

        <button className="function-button" disabled>
          <span className="function-button-icon">
            <Image src="/icons/forward.png" alt="Forward" width={30} height={30} />
          </span>
          <div className="function-button-dropdown">
            <div className="function-button-dropdown-arrow"></div>
          </div>
        </button>

        <button className="function-button">
          <span className="function-button-small-icon">
            <Image src="/icons/refresh.png" alt="Up" width={22} height={22} />
          </span>
        </button>

        <div className="function-separator"></div>

        <button className="function-button">
          <span className="function-button-small-icon">
            <Image src="/icons/ie-book.png" alt="Search" width={22} height={22} />
          </span>
          <span>{t('search')}</span>
        </button>

        <button className="function-button">
          <span className="function-button-small-icon">
            <Image src="/icons/foldericon.png" alt="Folders" width={22} height={22} />
          </span>
          <span>{t('folders')}</span>
        </button>

        <div className="function-separator"></div>

        <button className="function-button">
          <span className="function-button-small-icon">☰</span>
          <div className="function-button-dropdown">
            <div className="function-button-dropdown-arrow"></div>
          </div>
        </button>
      </section>

      {/* Address Bar Section */}
      <AddressBar />

      {/* Content Section */}
      <div className="content-section">
        <div className="content-container">
          {/* Left Sidebar */}
          <Sidebar />
          {/* Right Content */}
          <ContentGrid />
        </div>
      </div>
    </div>
  );
};

export default MyComputer; 