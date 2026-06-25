import React, { useState } from 'react';
import { fetchProducts, fetchCategories } from '../services/api.js';
import { useApi } from '../hooks/useApi.js';
import { LoadingSpinner, ErrorCard, EmptyState } from './UIKit.jsx';

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  const { data: categories } = useApi(fetchCategories);
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useApi(
    () => fetchProducts({ ...(activeCategory && { kategori: activeCategory }), ...(search && { search }) }),
    [activeCategory, search]
  );

  const categoryLabels = {
    power_cable:   'Power Cable',
    telecom_cable: 'Telecom Cable',
    fiber_optic:   'Fiber Optic',
    bare_conductor:'Bare Conductor',
    special_cable: 'Special Cable',
  };

  return (
    <section id="produk" className="section product-section">
      <div className="section-heading">
        <p className="eyebrow">Lini Produk</p>
        <h2>Produk utama PT Voksel Electric</h2>
      </div>

      {/* Filter bar */}
      <div className="product-filter-bar">
        <button
          className={`filter-btn ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => setActiveCategory('')}
        >
          Semua
        </button>
        {(categories || []).map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}

        <input
          className="product-search"
          type="search"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <LoadingSpinner message="Memuat produk..." />}
      {!loading && error && <ErrorCard message={error} onRetry={refetch} />}
      {!loading && !error && products?.length === 0 && (
        <EmptyState message="Tidak ada produk yang cocok dengan filter." />
      )}

      {!loading && !error && products?.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              {product.gambar_url && (
                <img
                  className="product-image"
                  src={product.gambar_url}
                  alt={`Ilustrasi ${product.nama}`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <div>
                <div className="product-icon">
                  {product.nama?.charAt(0) || 'P'}
                </div>
                <h3>{product.nama}</h3>
                <p>{product.deskripsi}</p>
              </div>
              <div className="product-tags">
                <span>{categoryLabels[product.kategori] || product.kategori}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}