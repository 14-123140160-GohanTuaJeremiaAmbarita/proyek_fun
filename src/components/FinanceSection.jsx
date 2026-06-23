import React from "react";
import { financialReview, marketData } from "../data/vokselData.js";

const marketCards = [
  ["Harga", marketData.stockPrice],
  ["Perubahan", marketData.change],
  ["EPS", marketData.eps],
  ["Market Cap", marketData.marketCap],
];

export function FinanceSection() {
  return (
    <section id="keuangan" className="section finance-section">
      <div className="section-heading">
        <p className="eyebrow">Keuangan & Investor</p>
        <h2>Dataset sementara dari informasi publik</h2>
      </div>
      <div className="finance-market-grid">
        {marketCards.map(([label, value]) => (
          <article className="market-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <article className="finance-summary">
        <h3>Tinjauan keuangan sementara</h3>
        <p>{financialReview.summary}</p>
        <div className="finance-columns">
          <div>
            <h4>Data tersedia</h4>
            <ul>
              {financialReview.availableTopics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Belum ditemukan</h4>
            <ul>
              {financialReview.missingTopics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}