import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BantuanFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const scrolledFromTop = window.scrollY + window.innerHeight;
      
      // Jika jarak ke bawah kurang dari 50px, aktifkan pop-up tombol panah
      if (totalHeight - scrolledFromTop <= 50) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="bantuan-footer" className="voksel-footer-dunia">
      <div className="footer-container text-left">
        
        {/* Kolom 1: Profil & Kontak */}
        <div className="footer-column brand-info">
          <div className="footer-logo">
            <span className="logo-text-ve">VE</span>
            <strong>PT VOKSEL ELECTRIC Tbk.</strong>
          </div>
          <p className="section-subtitle-footer">Kantor Eksekutif</p>
          <address>
            Menara Karya 3th Floor, Suite D<br />
            Jl. HR. Rasuna Said Block X-5; Kav. 1-2,<br />
            Jakarta 12950 - Indonesia
          </address>
          <div className="contact-details">
            <div><span>Telepon:</span> +62 21 5794 4622</div>
            <div><span>Email:</span> corsecve@voksel.com</div>
          </div>
        </div>

        {/* Kolom 2: Tentang Kami (Ringkas) */}
        <div className="footer-column">
          <h3>Tentang Kami</h3>
          <ul>
            <li><a href="#profil">Profil Perusahaan</a></li>
            <li><a href="#data">Data Perusahaan</a></li>
          </ul>
        </div>

        {/* Kolom 3: Produk (Sesuai 4 Lini Utama) */}
        <div className="footer-column">
          <h3>Produk</h3>
          <ul>
            <li><a href="#produk">Power Cable</a></li>
            <li><a href="#produk">Telecom Cable</a></li>
            <li><a href="#produk">Submarine Cable</a></li>
            <li><a href="#produk">Special Cables and Wires</a></li>
          </ul>
        </div>

        {/* Kolom 4: Hubungi Kami & Sosmed */}
        <div className="footer-column">
          <h3>Hubungi kami</h3>
          <ul>
            <li><a href="#data">Kantor & Pabrik</a></li>
            <li><a href="#chatbot">Pesan Produk</a></li>
          </ul>
          
          <h3 style={{ marginTop: '24px' }}>Ikuti Kami</h3>
          <div className="social-icons">
            <a href="#" className="icon-fb" aria-label="Facebook">f</a>
            <a href="#" className="icon-ig" aria-label="Instagram">📷</a>
            <a href="#" className="icon-in" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>

      {/* Baris Hak Cipta & Pop-up Back to Top Button */}
      <div className="footer-bottom">
        <p>Copyright © 2026 PT Voksel Electric Tbk. All Rights Reserved.</p>
        
        <AnimatePresence>
          {isAtBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="scroll-to-top-btn"
              aria-label="Kembali ke atas"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}