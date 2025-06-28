import React from "react";
import Image from "next/image";
import Toolbar from "./Toolbar";
import AddressBar from "./AddressBar";
import "../../../styles/desktop.css";

interface BaseFolderViewProps {
  children: React.ReactNode;
  functionBarButtons?: React.ReactNode;
  addressBarContent?: React.ReactNode;
}

const BaseFolderView: React.FC<BaseFolderViewProps> = ({ 
  children, 
  functionBarButtons,
  addressBarContent 
}) => {
  return (
    <div className="mycomputer-container">
      {/* Toolbar Section */}
      <Toolbar />

      {/* Function Bar Section */}
      <section className="function-bar">
        {functionBarButtons || (
          <>
            <button className="function-button" disabled>
              <span className="function-button-icon">
                <Image src="/icons/back.png" alt="Back" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
              </span>
              <span className="function-button-text">Back</span>
              <div className="function-button-dropdown">
                <div className="function-button-dropdown-arrow"></div>
              </div>
            </button>

            <button className="function-button" disabled>
              <span className="function-button-icon">
                <Image src="/icons/forward.png" alt="Forward" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
              </span>
              <div className="function-button-dropdown">
                <div className="function-button-dropdown-arrow"></div>
              </div>
            </button>

            <button className="function-button">
              <span className="function-button-small-icon">
                <Image src="/icons/refresh.png" alt="Up" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
              </span>
            </button>

            <div className="function-separator"></div>

            <button className="function-button">
              <span className="function-button-small-icon">
                <Image src="/icons/ie-book.png" alt="Search" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
              </span>
              <span>Search</span>
            </button>

            <button className="function-button">
              <span className="function-button-small-icon">
                <Image src="/icons/foldericon.png" alt="Folders" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
              </span>
              <span>Folders</span>
            </button>

            <div className="function-separator"></div>

            <button className="function-button">
              <span className="function-button-small-icon">☰</span>
              <div className="function-button-dropdown">
                <div className="function-button-dropdown-arrow"></div>
              </div>
            </button>
          </>
        )}
      </section>

      {/* Address Bar Section */}
      <AddressBar customContent={addressBarContent} />

      {/* Content Section */}
      <div className="content-section">
        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseFolderView; 