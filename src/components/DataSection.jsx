import React from "react";
import { addresses, company } from "../data/vokselData.js";

export function DataSection() {
  // Kita deklarasikan rows langsung di dalam fungsi agar aman membaca data objek
  const rows = [
    ["Nama", company?.name || "PT Voksel Electric Tbk"],
    ["Kode Saham", company?.ticker || "VOKS"],
    ["Sektor", company?.sector || "Industri"],
    ["Industri", company?.industry || "Kabel"],
    ["Berdiri", company?.founded || "1971"],
    ["IPO", company?.ipo || "1990"],
    ["Bisnis", company?.business || "Manufaktur Kabel"],
    ["Kontak", `${company?.phone || ""} / ${company?.email || ""}`],
  ];

  const metrics = [
    ["Kode Saham", company?.ticker || "VOKS"],
    ["Berdiri", "1971"],
    ["IPO", "1990"],
    ["Produk Inti", "5 Lini"],
  ];

  return (
    <section id="data" className="section data-section">
      <div className="section-heading">
        <p className="eyebrow">Data Ringkas</p>
        <h2>Informasi perusahaan dalam format mudah dibaca</h2>
      </div>
      <div className="data-layout">
        <div className="data-table-wrap">
          <table className="data-table">
            <tbody>
              {rows.map(([label, val]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{val}</td> {/* <--- SEKARANG SUDAH DIPERBAIKI MENGGUNAKAN KURUNG KURAWAL VARIABLE */}
                </tr>
              ))}
              {addresses && addresses.map((address) => (
                <tr key={address.label}>
                  <th>{address.label}</th>
                  <td>
                    {address.value}
                    <small style={{ marginLeft: "8px", color: "gray" }}>
                      ({address.status})
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="metric-board">
          {metrics.map(([label, value]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}