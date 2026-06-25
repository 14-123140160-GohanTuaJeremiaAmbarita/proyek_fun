import { financialReview, marketData, company, addresses } from "../data/vokselData.js";

export function useDataPrinter() {
  const printManifest = () => {
    // 1. Membuat elemen iframe tersembunyi untuk isolasi cetak data
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // 2. Merakit dokumen HTML khusus yang hanya menarik esensi data penting di database
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Manifes Data Finansial & Emiten - VOKS</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #172033; padding: 25px; line-height: 1.5; }
          .header { border-bottom: 3px solid #0d3177; padding-bottom: 12px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #0d3177; font-size: 22px; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0 0; color: #667085; font-size: 13px; }
          .section-title { font-size: 14px; font-weight: bold; color: #00a8a8; margin: 25px 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          th, td { border: 1px solid #dde5ee; padding: 10px 12px; text-align: left; font-size: 13px; }
          th { background-color: #f8fbff; font-weight: bold; width: 30%; color: #0d3177; }
          .grid { display: flex; gap: 15px; margin-bottom: 15px; }
          .card { flex: 1; border: 1px solid #dde5ee; background: #f8fbff; padding: 12px; border-radius: 4px; text-align: center; }
          .card span { display: block; font-size: 11px; color: #667085; text-transform: uppercase; }
          .card strong { display: block; font-size: 16px; color: #1457d9; margin-top: 4px; }
          .summary-box { font-size: 13px; background: #f8fbff; padding: 12px; border: 1px solid #dde5ee; border-radius: 4px; color: #172033; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LAPORAN MANIFES DATABASE EMITEN</h1>
          <p>PT Voksel Electric Tbk (${company?.ticker || "VOKS"}) • Ringkasan Data Validasi Magang Frontend</p>
        </div>

        <div class="section-title">Informasi Pasar Saham (Market Metric)</div>
        <div class="grid">
          <div class="card"><span>Harga Saham</span><strong>${marketData?.stockPrice || "-"}</strong></div>
          <div class="card"><span>Perubahan</span><strong>${marketData?.change || "-"}</strong></div>
          <div class="card"><span>EPS</span><strong>${marketData?.eps || "-"}</strong></div>
          <div class="card"><span>Market Cap</span><strong>${marketData?.marketCap || "-"}</strong></div>
        </div>

        <div class="section-title">Profil Umum Perusahaan</div>
        <table>
          <tr><th>Nama Entitas</th><td>${company?.name || "-"}</td></tr>
          <tr><th>Sektor / Industri</th><td>${company?.sector || "-"} / ${company?.industry || "-"}</td></tr>
          <tr><th>Berdiri (IPO)</th><td>${company?.founded || "-"} (${company?.ipo || "-"})</td></tr>
          <tr><th>Deskripsi Bisnis</th><td>${company?.business || "-"}</td></tr>
          <tr><th>Hubungan Investor</th><td>${company?.phone || "-"} / ${company?.email || "-"}</td></tr>
        </table>

        <div class="section-title">Lokasi & Alamat Pabrik</div>
        <table>
          ${addresses ? addresses.map(addr => `
            <tr>
              <th>${addr.label}</th>
              <td>${addr.value} <em>(${addr.status})</em></td>
            </tr>
          `).join('') : ''}
        </table>

        <div class="section-title">Status Kelengkapan Validasi Data</div>
        <div class="summary-box">
          <strong>Review Pengembang:</strong> ${financialReview?.summary || "-"}
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // 3. Eksekusi pencetakan dokumen di dalam iframe terisolasi
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // 4. Bersihkan iframe dari DOM setelah interaksi selesai
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  return { printManifest };
}