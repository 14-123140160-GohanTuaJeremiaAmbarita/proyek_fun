import React, { useEffect } from 'react';
// PERBAIKAN UTAMA: Header diimpor sebagai Default, tanpa tanda kurung kurawal { }
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { ProfileSection } from './components/ProfileSection.jsx';
import { ProductsSection } from './components/ProductsSection.jsx';
import { GallerySection } from './components/GallerySection.jsx';
import { DataSection } from './components/DataSection.jsx';
import { FinanceSection } from './components/FinanceSection.jsx';
import { DatasetSection } from './components/DatasetSection.jsx';
import { Chatbot } from './components/Chatbot.jsx';
import './styles/app.css';

export default function App() {
  useEffect(() => {
    // 1. Matikan pelacakan scroll otomatis bawaan browser agar tidak memotong animasi
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Berikan penundaan (delay) render agar halaman memuat canvas & struktur layout,
    // lalu jalankan efek scroll lambat sinematik ke atas
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        {/* Menyematkan ID jangkauan yang selaras dengan menu item di Toolbar */}
        <div id="profil"><ProfileSection /></div>
        <div id="produk"><ProductsSection /></div>
        <div id="foto"><GallerySection /></div>
        <div id="data"><DataSection /></div>
        <div id="keuangan"><FinanceSection /></div>
        <DatasetSection />
        <div id="chatbot"><Chatbot /></div>
      </main>
    </div>
  );
}