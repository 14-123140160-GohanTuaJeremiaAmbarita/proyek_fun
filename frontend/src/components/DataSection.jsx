import React, { useState } from 'react';
import {
  fetchSalesSummary,
  fetchEmployeesSummary,
  fetchProductionSummary,
} from '../services/api.js';
import { useApi } from '../hooks/useApi.js';
import { LoadingSpinner, ErrorCard, EmptyState } from './UIKit.jsx';

const TABS = [
  { id: 'sales',      label: '📊 Penjualan' },
  { id: 'employees',  label: '👥 Karyawan' },
  { id: 'production', label: '🏭 Produksi' },
];

function SalesTab() {
  const [activeTab, setActiveTab] = useState('sales');
  const { data, loading, error, refetch } = useApi(fetchSalesSummary);
  if (loading) return <LoadingSpinner message="Memuat data penjualan..." />;
  if (error)   return <ErrorCard message={error} onRetry={refetch} />;
  if (!data || data.length === 0) return <EmptyState message="Data penjualan belum tersedia." />;

  return (
    <table className="data-table">
      <thead>
        <tr><th>Tahun</th><th>Kategori</th><th>Transaksi</th><th>Total Revenue</th></tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.tahun}</td>
            <td>{row.kategori}</td>
            <td>{row.jumlah_transaksi?.toLocaleString('id-ID')}</td>
            <td>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(row.total_revenue)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmployeesTab() {
  const { data, loading, error, refetch } = useApi(fetchEmployeesSummary);
  if (loading) return <LoadingSpinner message="Memuat data karyawan..." />;
  if (error)   return <ErrorCard message={error} onRetry={refetch} />;
  if (!data)   return <EmptyState message="Data karyawan belum tersedia." />;

  return (
    <div className="employees-summary">
      <div className="metric-board" style={{ marginBottom: '24px' }}>
        <article className="metric-card">
          <span>Total Karyawan</span>
          <strong>{data.total?.toLocaleString('id-ID')}</strong>
        </article>
      </div>

      <div className="finance-columns">
        <div>
          <h4>Per Departemen</h4>
          <table className="data-table">
            <tbody>
              {(data.by_departemen || []).map((d) => (
                <tr key={d.departemen}>
                  <td>{d.departemen}</td>
                  <td><strong>{d.jumlah}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4>Per Lokasi</h4>
          <table className="data-table">
            <tbody>
              {(data.by_lokasi || []).map((d) => (
                <tr key={d.lokasi}>
                  <td>{d.lokasi}</td>
                  <td><strong>{d.jumlah}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 style={{ marginTop: '16px' }}>Per Gender</h4>
          <table className="data-table">
            <tbody>
              {(data.by_gender || []).map((d) => (
                <tr key={d.gender}>
                  <td>{d.gender}</td>
                  <td><strong>{d.jumlah}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductionTab() {
  const { data, loading, error, refetch } = useApi(fetchProductionSummary);
  if (loading) return <LoadingSpinner message="Memuat data produksi..." />;
  if (error)   return <ErrorCard message={error} onRetry={refetch} />;
  if (!data || data.length === 0) return <EmptyState message="Data produksi belum tersedia." />;

  return (
    <table className="data-table">
      <thead>
        <tr><th>Tahun</th><th>Kategori</th><th>Target</th><th>Realisasi</th><th>Pencapaian</th></tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.tahun}</td>
            <td>{row.produk_kategori}</td>
            <td>{row.total_target?.toLocaleString('id-ID')}</td>
            <td>{row.total_realisasi?.toLocaleString('id-ID')}</td>
            <td>
              <span style={{ color: row.persen_pencapaian >= 100 ? 'var(--green)' : 'var(--amber)', fontWeight: 'bold' }}>
                {row.persen_pencapaian}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DatasetSection() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <section id="dataset" className="section dataset-section">
      <div className="section-heading">
        <p className="eyebrow">Dataset Internal</p>
        <h2>Data penjualan, karyawan & produksi dari database</h2>
      </div>

      {/* Tab navigation */}
      <div className="tab-nav">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'sales'      && <SalesTab />}
        {activeTab === 'employees'  && <EmployeesTab />}
        {activeTab === 'production' && <ProductionTab />}
      </div>
    </section>
  );
}

export function DataSection() {
  return <h1>TEST DATA SECTION</h1>;
}