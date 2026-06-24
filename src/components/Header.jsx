import React, { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      if (targetId === 'bantuan-footer') {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, null, `#${targetId}`);
    }
  };

  return (
    <header className="topbar">
      <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <div className="brand-mark">V</div>
        <div>
          <strong>PT Voksel Electric Tbk</strong>
          <small>Sistem Informasi Manifet v1.0</small>
        </div>
      </div>
      
      <div className="nav-links">
        <a href="#profil" onClick={(e) => handleScroll(e, 'profil')}>Profil</a>
        <a href="#produk" onClick={(e) => handleScroll(e, 'produk')}>Produk</a>
        <a href="#cetak" onClick={(e) => handleScroll(e, 'cetak')}>Cetak Data</a>
        <a href="#keuangan" onClick={(e) => handleScroll(e, 'keuangan')}>Keuangan</a>
        
        {/* Mengarah langsung ke elemen footer baru */}
        <a href="#bantuan-footer" onClick={(e) => handleScroll(e, 'bantuan-footer')}>Bantuan</a>

        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.22" x2="5.64" y2="17.78"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}