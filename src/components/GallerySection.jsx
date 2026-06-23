import { profilePhotos } from "../data/vokselData.js";

export function GallerySection() {
  return (
    <section id="foto" className="section gallery-section">
      <div className="section-heading">
        <p className="eyebrow">Foto Profil</p>
        <h2>Tempat foto perusahaan dan dokumentasi produk</h2>
      </div>
      <div className="gallery-grid">
        {profilePhotos.map((photo) => (
          <article className="gallery-card" key={photo.title}>
            <img src={photo.image} alt={photo.title} />
            <div>
              <h3>{photo.title}</h3>
              <p>{photo.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
