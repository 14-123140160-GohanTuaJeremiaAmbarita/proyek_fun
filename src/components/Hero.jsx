import { useNetworkCanvas } from "../hooks/useNetworkCanvas.js";

export function Hero() {
  const canvasRef = useNetworkCanvas();

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">PT Voksel Electric Tbk • VOKS</p>
        <h1>Profil perusahaan kabel yang interaktif, animatif, dan siap ditanya.</h1>
        <p className="hero-copy">
          Web React ini merangkum profil, produk, foto, data investor, dan dataset
          sementara Voksel dalam pengalaman modern untuk presentasi magang.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#chatbot">
            Coba Chatbot
          </a>
          <a className="secondary-action" href="#produk">
            Lihat Produk
          </a>
        </div>
      </div>
      <aside className="signal-panel" aria-label="Ringkasan cepat">
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
          <strong>5</strong>
        </div>
      </aside>
    </section>
  );
}
