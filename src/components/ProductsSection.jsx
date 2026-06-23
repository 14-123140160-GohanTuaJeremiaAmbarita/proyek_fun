import { products } from "../data/vokselData.js";

export function ProductsSection() {
  return (
    <section id="produk" className="section product-section">
      <div className="section-heading">
        <p className="eyebrow">Lini Produk</p>
        <h2>5 produk utama yang bisa ditampilkan</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.title}>
            <img className="product-image" src={product.image} alt={`Ilustrasi ${product.title}`} />
            <div>
              <div className="product-icon">{product.icon}</div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
            <div className="product-tags">
              {product.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
