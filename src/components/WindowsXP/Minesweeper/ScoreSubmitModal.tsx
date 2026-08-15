"use client";

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { Difficulty } from './Minesweeper';
import '../../../styles/desktop.css';

interface ScoreSubmitModalProps {
  difficulty: Difficulty;
  seconds: number;
  onClose: () => void;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const ScoreSubmitModal: React.FC<ScoreSubmitModalProps> = ({ difficulty, seconds, onClose }) => {
  const t = useTranslations('minesweeperScore');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(() => t('autoMessageTemplate', { difficulty, seconds }));
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;
    if (!accessKey) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', `Minesweeper - ${difficulty} - ${seconds}s`);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('difficulty', difficulty);
      formData.append('seconds', String(seconds));

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTimeout(onClose, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const content = (
    <div className="xp-score-modal">
      <div className="modal">
        <header className="header">
          <span className="header__text">{t('title')}</span>
          <button type="button" className="header__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <form className="content" onSubmit={handleSubmit}>
          <p className="congrats">{t('congrats')}</p>

          <label htmlFor="score-message">{t('messageLabel')}</label>
          <textarea
            id="score-message"
            value={message}
            placeholder={t('messagePlaceholder')}
            onChange={e => setMessage(e.target.value)}
            disabled={status === 'sending' || status === 'success'}
          />

          <label htmlFor="score-name">{t('nameLabel')}</label>
          <input
            id="score-name"
            type="text"
            value={name}
            placeholder={t('namePlaceholder')}
            onChange={e => setName(e.target.value)}
            required
            disabled={status === 'sending' || status === 'success'}
          />

          <label htmlFor="score-email">{t('emailLabel')}</label>
          <input
            id="score-email"
            type="email"
            value={email}
            placeholder={t('emailPlaceholder')}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={status === 'sending' || status === 'success'}
          />

          {status === 'success' && <p className="status-message success">{t('success')}</p>}
          {status === 'error' && <p className="status-message error">{t('error')}</p>}

          <footer className="footer">
            <button type="button" className="footer__button" onClick={onClose} disabled={status === 'sending'}>
              {t('cancel')}
            </button>
            <button type="submit" className="footer__button footer__button--primary" disabled={status === 'sending' || status === 'success'}>
              {status === 'sending' ? t('sending') : t('send')}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(content, document.body);
  }
  return null;
};

export default ScoreSubmitModal;
