import React from "react"; // <--- WAJIB TAMBAHKAN BARIS INI DI PALING ATAS!
import { motion } from "framer-motion";
import { useNetworkCanvas } from "../hooks/useNetworkCanvas.js";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const canvasRef = useNetworkCanvas();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} aria-hidden="true" />
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={itemVariants}>
          PT Voksel Electric Tbk • VOKS
        </motion.p>
        <motion.h1 variants={itemVariants}>
          Profil Perusahaan Kabel yang Interaktif & Modern
        </motion.h1>
        <motion.p className="hero-copy" variants={itemVariants}>
          Web aplikasi React ini merangkum profil, produk, data finansial publik, dan eksplorasi data internal Voksel untuk kebutuhan presentasi magang yang profesional.
        </motion.p>
        <motion.div className="hero-actions" variants={itemVariants}>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-action" 
            href="#chatbot"
          >
            Coba Chatbot <ArrowRight style={{ marginLeft: "8px" }} size={16} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="secondary-action" 
            href="#produk"
          >
            Lihat Produk
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.aside 
        className="signal-panel"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        aria-label="Ringkasan cepat"
      >
        <div>
          <span>Berdiri</span>
          <strong>1971</strong>
        </div>
        <div>
          <span>IPO</span>
          <strong>1990</strong>
        </div>
        <div>
          <span>Produk</span>
          <strong>5 Lini</strong>
        </div>
      </motion.aside>
    </section>
  );
}