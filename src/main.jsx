import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/app.css';

// 1. PETA PELACAK GLOBAL (Menangkap error sebelum React Render)
window.onerror = function (message, source, lineno, colno, error) {
  const errorContainer = document.getElementById('root');
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div style="padding: 20px; background: #fff5f5; color: #c53030; font-family: monospace; border: 2px solid #feb2b2; margin: 20px; border-radius: 8px;">
        <h2 style="margin-top:0;">🚨 JavaScript Global Error Terdeteksi!</h2>
        <p><strong>Pesan:</strong> ${message}</p>
        <p><strong>File Sumber:</strong> ${source}</p>
        <p><strong>Baris/Kolom:</strong> ${lineno}:${colno}</p>
        <hr style="border-color: #feb2b2;" />
        <p style="color: #4a5568; font-size: 13px;">Tips: Periksa file sumber di atas, kemungkinan ada kesalahan path impor (case-sensitive) atau pemanggilan variabel yang tidak ada.</p>
      </div>
    `;
  }
  return false;
};

// 2. COMPONENT ERROR BOUNDARY (Menangkap error di dalam komponen React)
class SafetyNet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("React SafetyNet Catch:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', background: '#fffaf0', color: '#dd6b20', fontFamily: 'sans-serif', border: '2px solid #fbd38d', margin: '20px', borderRadius: '8px' }}>
          <h2>⚠️ React Component Crash!</h2>
          <p>Salah satu komponen gagal merender struktur visualnya.</p>
          <pre style={{ background: '#edd6b1', padding: '12px', borderRadius: '4px', overflowX: 'auto', color: '#7b341e' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <p style={{ fontSize: '14px', color: '#4a5568' }}>Coba periksa tab <strong>Console</strong> pada Developer Tools (F12) untuk melihat stack trace lengkap.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Render Aplikasi dibungkus SafetyNet
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SafetyNet>
      <App />
    </SafetyNet>
  </React.StrictMode>
);