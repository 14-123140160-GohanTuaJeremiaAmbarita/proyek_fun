import { addresses, company } from "../data/vokselData.js";

const rows = [
  ["Nama", company.name],
  ["Kode Saham", company.ticker],
  ["Sektor", company.sector],
  ["Industri", company.industry],
  ["Berdiri", company.founded],
  ["IPO", company.ipo],
  ["Bisnis", company.business],
  ["Kontak", `${company.phone} / ${company.email}`],
];

const metrics = [
  ["Kode Saham", company.ticker],
  ["Berdiri", "1971"],
  ["IPO", "1990"],
  ["Produk Inti", "5 Lini"],
];

export function DataSection() {
  return (
    <section id="data" className="section data-section">
      <div className="section-heading">
        <p className="eyebrow">Data Ringkas</p>
        <h2>Informasi perusahaan dalam format mudah dibaca</h2>
      </div>
      <div className="data-layout">
        <div className="data-table-wrap">
          <table className="data-table">
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
              {addresses.map((address) => (
                <tr key={address.label}>
                  <th>{address.label}</th>
                  <td>
                    {address.value}
                    <small>{address.status}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="metric-board">
          {metrics.map(([label, value]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
