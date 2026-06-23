import React from 'react';
import { Chatbot } from "./components/Chatbot.jsx";
import { DataSection } from "./components/DataSection.jsx";
import { DatasetSection } from "./components/DatasetSection.jsx";
import { FinanceSection } from "./components/FinanceSection.jsx";
import { GallerySection } from "./components/GallerySection.jsx";
import { Header } from "./components/Header.jsx";
import  Hero  from "./components/Hero.jsx";
import { ProductsSection } from "./components/ProductsSection.jsx";
import { ProfileSection } from "./components/ProfileSection.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <ProfileSection />
        <ProductsSection />
        <GallerySection />
        <DataSection />
        <FinanceSection />
        <DatasetSection />
        <Chatbot />
      </main>
    </div>
  );
}
