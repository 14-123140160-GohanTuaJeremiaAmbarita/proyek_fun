import React from "react";
import { financialReview, marketData } from "../data/vokselData.js";
import { useDataPrinter } from "../hooks/useDataPrinter.js"; // <--- Impor hook baru kita
import { Printer } from "lucide-react";

export function FinanceSection() {
  const { printManifest } = useDataPrinter(); // <--- Ekstrak fungsi cetak dari file utilitas

  const marketCards = [
    ["Harga", marketData.stockPrice],
    ["Perubahan", marketData.change],
    ["EPS", marketData.eps],
    ["Market Cap", marketData.marketCap],
  ];

  return (
    <section id="keuangan" className="section finance-section">
      <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p className="eyebrow">Keuangan & Investor</p>
          <h2>Dataset sementara dari informasi publik</h2>
        </div>
        <button
          type="button"
          onClick={printManifest} // <--- Langsung eksekusi fungsi manifes
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "var(--blue)",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(20, 87, 217, 0.2)"
          }}
        >
          <Printer size={16} /> Cetak Manifes Data
        </button>
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