import React, { useEffect } from 'react';
import styled from 'styled-components';

function lineBreak(str: string) {
  return str.split('\n').map((s: string, i: number) => (
    <p key={i} className="error__message">
      {s}
    </p>
  ));
}

interface XpErrorWindowProps {
  title?: string;
  message: string;
  onClose: () => void;
}

const XpErrorWindow: React.FC<XpErrorWindowProps> = ({ title = "C:\\", message = "Something's wrong!", onClose }) => {
  // Removed automatic audio play due to browser autoplay policies
  // Audio will only play if user interacts with the page first

  const handleClose = () => {
    // Play error sound when user clicks OK button
    try {
      const audio = new Audio('/sounds/error.wav');
      audio.play();
    } catch (e) {
      console.log('Audio play failed:', e);
    }
    onClose();
  };

  return (
    <Div>
      <div className="error__top">
        <img src="/icons/897(32x32).png" alt="error" className="error__img" />
        <div className="error__messages">{lineBreak(message)}</div>
      </div>
      <div className="error__bottom">
        <div onClick={handleClose} className="error__button">
          <span className="error__confirm">OK</span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-size: 11px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  color: #000000;
  .error__top {
    display: flex;
    flex: 1;
  }
  .error__img {
    width: 30px;
    height: 30px;
  }
  .error__messages {
    padding: 2px 20px 12px;
    color: #000000;
  }
  .error__message {
    line-height: 16px;
    color: #000000;
    margin: 0;
  }
  .error__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .error__button {
    width: 80px;
    height: 22px;
    display: flex;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    box-shadow: inset -1px -1px 1px black;
    background-color: #f0f0f0;
    cursor: pointer;
    &:hover:active {
      box-shadow: inset 1px 1px 1px black;
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .error__confirm {
    line-height: 11px;
    color: #000000;
  }
`;

export default XpErrorWindow; 