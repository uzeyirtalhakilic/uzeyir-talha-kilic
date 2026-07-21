"use client";

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import '../../../styles/desktop.css';

export type PowerMode = 'logoff' | 'turnoff';

interface ShutdownModalProps {
  mode: PowerMode;
  onClose: () => void;
  onClickButton: (text: string) => void;
}

const Button: React.FC<{
  style?: React.CSSProperties;
  img: string;
  text: string;
  onClick: (text: string) => void;
}> = ({ style, img, text, onClick }) => (
  <div className="button-container">
    <img
      onClick={() => onClick(text)}
      style={style}
      src={img}
      alt={text}
      className="button-img"
      draggable={false}
    />
    <span className="button-text">{text}</span>
  </div>
);

const ButtonDisabled: React.FC<{ img: string; text: string }> = ({ img, text }) => (
  <div className="button-container disable">
    <img src={img} alt={text} className="button-img" draggable={false} />
    <span className="button-text">{text}</span>
  </div>
);

const ShutdownModal: React.FC<ShutdownModalProps> = ({ mode, onClose, onClickButton }) => {
  const t = useTranslations('shutdown');

  function noop(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function renderButtons() {
    if (mode === 'turnoff') {
      return (
        <>
          <ButtonDisabled img="/icons/310(32x32).png" text={t('standBy')} />
          <Button img="/icons/310(32x32).png" text={t('turnOff')} onClick={onClickButton} />
          <Button
            style={{ margin: '-3px 0 0px 0', width: '33px', height: '33px' }}
            img="/icons/restart.ico"
            text={t('restart')}
            onClick={onClickButton}
          />
        </>
      );
    }
    return (
      <>
        <Button
          img="/icons/290.png"
          text={t('switchUser')}
          style={{ border: '1px solid #fff', borderRadius: '3px' }}
          onClick={onClickButton}
        />
        <Button img="/icons/546(32x32).png" text={t('logOff')} onClick={onClickButton} />
      </>
    );
  }

  const content = (
    <div
      className="xp-shutdown"
      onMouseMove={noop}
      onClick={noop}
      onMouseDown={noop}
      onMouseUp={noop}
    >
      <div className="modal">
        <header className="header">
          <span className="header__text">{t('title')}</span>
          <img src="/icons/windows-off.png" alt="" className="header__img" draggable={false} />
        </header>
        <div className="content">{renderButtons()}</div>
        <footer className="footer">
          <button onClick={onClose} className="footer__button">
            {t('cancel')}
          </button>
        </footer>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(content, document.body);
  }
  return null;
};

export default ShutdownModal;
