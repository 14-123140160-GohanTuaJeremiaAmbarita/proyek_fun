import React from "react";
import { internalDatasetTemplate } from "../data/vokselData.js";

export function DatasetSection() {
  return (
    <section id="dataset" className="section dataset-section">
      <div className="section-heading">
        <p className="eyebrow">Dataset Internal</p>
        <h2>Tempat aman untuk data dari perusahaan</h2>
      </div>
      <div className="dataset-layout">
        <article className="dataset-card">
          <h3>Frontend siap, data perusahaan tetap terjaga</h3>
          <p>
            Data penjualan, karyawan, dan produksi biasanya bersifat internal. Struktur
            React ini menaruh data di <code>src/data/vokselData.js</code> supaya mudah
            diganti menjadi API atau dataset resmi.
          </p>
        </article>
        <div className="dataset-status">
          {internalDatasetTemplate.map((item) => (
            <article className="dataset-status-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.status}</strong>
              <small>{item.fields.join(", ")}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}