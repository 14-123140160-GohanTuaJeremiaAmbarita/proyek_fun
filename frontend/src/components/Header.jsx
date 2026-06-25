import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api.js';
import { ApiStatusBadge } from './UIKit.jsx';

export default function Header() {
  const [theme, setTheme]     = useState(localStorage.getItem('theme') || 'light');
  const [apiOnline, setApiOnline] = useState(null); // null = belum dicek

  // Cek status backend saat mount, lalu setiap 60 detik
  useEffect(() => {
    const ping = async () => {
      try {
        await checkHealth();
        setApiOnline(true);
      } catch {
        setApiOnline(false);
      }
    };
    ping();
    const interval = setInterval(ping, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: targetId === 'bantuan-footer' ? 'end' : 'start' });
      window.history.pushState(null, null, `#${targetId}`);
    }
  };

  return (
    <header className="topbar">
      <div
        className="brand"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-mark">V</div>
        <div>
          <strong>PT Voksel Electric Tbk</strong>
          <small>IT Voksel</small>
        </div>
      </div>

      <nav className="nav-links">
        {[
          { label: 'Profil',    id: 'profil'   },
          { label: 'Produk',    id: 'produk'   },
          { label: 'Keuangan',  id: 'keuangan' },
          { label: 'Dataset',   id: 'dataset'  },
          { label: 'Chatbot',   id: 'chatbot'  },
          { label: 'Bantuan',   id: 'bantuan-footer' },
        ].map(({ label, id }) => (
          <a key={id} href={`#${id}`} onClick={(e) => handleScroll(e, id)}>
            {label}
          </a>
        ))}

        {/* Badge status API */}
        {apiOnline !== null && <ApiStatusBadge online={apiOnline} />}

        {/* Toggle dark/light mode */}
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.22" x2="5.64" y2="17.78" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}