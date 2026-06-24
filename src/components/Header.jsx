import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const navItems = [
  ["#profil", "Profil"],
  ["#produk", "Produk"],
  ["#foto", "Foto"],
  ["#data", "Data"],
  ["#keuangan", "Keuangan"],
  ["#chatbot", "Chatbot"],
];

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="topbar" aria-label="Navigasi utama">
      <a className="brand" href="#home" aria-label="Voksel Interactive Profile">
        <span className="brand-mark">V</span>
        <span>
          <strong>Voksel</strong>
          <small>Interactive Profile</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Menu halaman" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {navItems.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "50%",
            transition: "background 0.3s"
          }}
          title={isDarkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
          className="theme-toggle-btn"
        >
          {isDarkMode ? <Sun size={20} className="text-amber" /> : <Moon size={20} />}
        </button>
      </nav>
    </header>
  );
}