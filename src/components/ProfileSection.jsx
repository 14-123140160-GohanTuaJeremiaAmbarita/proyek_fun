import React from "react";
import { addresses, company } from "../data/vokselData.js";

const timeline = [
  ["1971", "Perusahaan berdiri"],
  ["1989", "Joint venture dengan Showa"],
  ["1990", "IPO sebagai VOKS"],
  ["2026", "Dataset frontend disiapkan untuk profil magang"],
];

export function ProfileSection() {
  return (
    <section id="profil" className="section profile-section">
      <div className="section-heading">
        <p className="eyebrow">Profil Perusahaan</p>
        <h2>Mengenal Voksel Electric</h2>
      </div>
      <div className="profile-layout">
        <article className="profile-copy">
          <p>
            {company.name} adalah produsen kabel Indonesia yang bergerak pada kabel
            tenaga listrik, telekomunikasi, fiber optic, konduktor, dan kabel khusus.
          </p>
          <p>
            Proyek ini dibuat dalam format React agar mudah dikembangkan menjadi
            dashboard profil, chatbot, dan portal data internal jika perusahaan
            menyediakan dataset resmi.
          </p>
          <div className="address-list">
            {addresses.map((address) => (
              <div key={address.label}>
                <strong>{address.label}</strong>
                <span>{address.value}</span>
                <small>{address.status}</small>
              </div>
            ))}
          </div>
          <div className="source-row">
            <a href="https://www.voksel.co.id" target="_blank" rel="noopener noreferrer">
              Situs resmi
            </a>
            <a
              href="https://www.idnfinancials.com/voks/pt-voksel-electric-tbk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data publik
            </a>
          </div>
        </article>
        <div className="timeline" aria-label="Linimasa Voksel">
          {timeline.map(([year, text], index) => (
            <button className={`timeline-item ${index === 0 ? "active" : ""}`} key={year}>
              <span>{year}</span>
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}