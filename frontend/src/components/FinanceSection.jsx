import React from 'react';
import { fetchFinanceSummary, fetchFinanceAnnual, fetchInvestors } from '../services/api.js';
import { useApi } from '../hooks/useApi.js';
import { useDataPrinter } from '../hooks/useDataPrinter.js';
import { LoadingSpinner, ErrorCard, EmptyState } from './UIKit.jsx';
import { Printer } from 'lucide-react';

function formatRupiah(val) {
  if (!val) return '-';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
}

function MiniBarChart({ data }) {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map((d) => d.pendapatan || 0));
  return (
    <div className="mini-bar-chart" aria-label="Grafik pendapatan tahunan">
      {data.map((d) => {
        const pct = maxVal > 0 ? (d.pendapatan / maxVal) * 100 : 0;
        return (
          <div key={d.tahun} className="bar-item">
            <div className="bar-track">
              <div className="bar-fill" style={{ height: `${pct}%` }} title={formatRupiah(d.pendapatan)} />
            </div>
            <span className="bar-label">{d.tahun}</span>
          </div>
        );
      })}
    </div>
  );
}

export function FinanceSection() {
  const { printManifest } = useDataPrinter();

  const { data: summary,   loading: sL, error: sE, refetch: refetchS } = useApi(fetchFinanceSummary);
  const { data: annual,    loading: aL, error: aE, refetch: refetchA } = useApi(fetchFinanceAnnual);
  const { data: investors, loading: iL, error: iE, refetch: refetchI } = useApi(fetchInvestors);

  const loading = sL || aL || iL;
  const error   = sE || aE || iE;

  const summaryCards = summary ? [
    { label: 'Pendapatan',      value: formatRupiah(summary.pendapatan) },
    { label: 'Laba Bersih',     value: formatRupiah(summary.laba_bersih) },
    { label: 'Total Aset',      value: formatRupiah(summary.total_aset) },
    { label: 'Laba/Saham',      value: summary.laba_per_saham ? `Rp ${summary.laba_per_saham}` : '-' },
  ] : [];

  return (
    <section id="keuangan" className="section finance-section">
      <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p className="eyebrow">Keuangan & Investor</p>
          <h2>Data finansial dari database perusahaan</h2>
        </div>
        <button
          type="button"
          onClick={printManifest}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Printer size={16} /> Cetak Manifes
        </button>
      </div>

      {loading && <LoadingSpinner message="Memuat data keuangan..." />}
      {!loading && error && (
        <ErrorCard message={error} onRetry={() => { refetchS(); refetchA(); refetchI(); }} />
      )}

      {!loading && !error && (
        <>
          {/* Summary cards */}
          {summary ? (
            <div className="finance-market-grid">
              {summaryCards.map(({ label, value }) => (
                <article className="market-card" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="Data keuangan belum tersedia di database." />
          )}

          {/* Bar chart pendapatan tahunan */}
          {annual && annual.length > 0 && (
            <div className="finance-chart-wrap">
              <h3>Pendapatan Tahunan</h3>
              <MiniBarChart data={annual} />
            </div>
          )}

          {/* Investor table */}
          {investors && investors.length > 0 && (
            <div className="investor-table-wrap">
              <h3>Pemegang Saham</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Jenis</th>
                    <th>Kepemilikan</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.map((inv) => (
                    <tr key={inv.id}>
                      <td>{inv.nama}</td>
                      <td>{inv.jenis}</td>
                      <td><strong>{inv.persentase}%</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}