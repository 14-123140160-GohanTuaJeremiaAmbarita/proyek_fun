import React from "react";

const navItems = [
  ["#profil", "Profil"],
  ["#produk", "Produk"],
  ["#foto", "Foto"],
  ["#data", "Data"],
  ["#keuangan", "Keuangan"],
  ["#chatbot", "Chatbot"],
];

export function Header() {
  return (
    <header className="topbar" aria-label="Navigasi utama">
      <a className="brand" href="#home" aria-label="Voksel Interactive Profile">
        <span className="brand-mark">V</span>
        <span>
          <strong>Voksel</strong>
          <small>Interactive Profile</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Menu halaman">
        {navItems.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}