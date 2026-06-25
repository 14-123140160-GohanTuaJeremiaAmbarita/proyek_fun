import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import { ProductsSection } from './components/ProductsSection.jsx';
import { GallerySection } from './components/GallerySection.jsx';
import { DataSection } from './components/DataSection.jsx';
import { FinanceSection } from './components/FinanceSection.jsx';
import { DatasetSection } from './components/DatasetSection.jsx';
import { Chatbot } from './components/Chatbot.jsx';
import { BantuanFooter } from './components/BantuanFooter.jsx'; 
import './styles/app.css';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <div id="profil"><ProfileSection /></div>
        <div id="produk"><ProductsSection /></div>
        <div id="foto"><GallerySection /></div>
        <div id="data"><DataSection /></div>
        <div id="keuangan"><FinanceSection /></div>
        <DatasetSection />
        <div id="chatbot"><Chatbot /></div>
      </main>
      <BantuanFooter />
    </div>
  );
}