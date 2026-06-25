import React from 'react';

/**
 * LoadingSpinner — tampilkan saat data sedang difetch.
 */
export function LoadingSpinner({ message = 'Memuat data...' }) {
  return (
    <div className="loading-state">
      <div className="spinner" aria-label="Loading" />
      <p>{message}</p>
    </div>
  );
}

/**
 * ErrorCard — tampilkan saat fetch gagal, dengan tombol retry.
 */
export function ErrorCard({ message, onRetry }) {
  return (
    <div className="error-state">
      <span className="error-icon">⚠️</span>
      <p>{message || 'Gagal memuat data dari server.'}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

/**
 * EmptyState — tampilkan saat data kosong.
 */
export function EmptyState({ message = 'Tidak ada data tersedia.' }) {
  return (
    <div className="empty-state">
      <span>📭</span>
      <p>{message}</p>
    </div>
  );
}

/**
 * ApiStatusBadge — badge kecil di Header yang menunjukkan status koneksi backend.
 */
export function ApiStatusBadge({ online }) {
  return (
    <span className={`api-badge ${online ? 'api-online' : 'api-offline'}`}>
      <span className="api-dot" />
      {online ? 'API Online' : 'API Offline'}
    </span>
  );
}