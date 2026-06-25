import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendChatMessage } from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

const WELCOME = 'Halo, saya Voksel Bot! Sekarang saya terhubung ke database perusahaan secara langsung. Silakan tanya tentang profil, produk, keuangan, investor, karyawan, penjualan, atau produksi.';

const SUGGESTED = [
  'Berapa total karyawan?',
  'Apa saja produk Voksel?',
  'Penjualan tahun 2024?',
  'Bagaimana data keuangan terbaru?',
  'Di mana alamat kantor Voksel?',
];

function TypingDots() {
  return (
    <div className="typing-dots" aria-label="Sedang mengetik">
      <span /><span /><span />
    </div>
  );
}

export function Chatbot() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: WELCOME, done: true },
  ]);
  const [input, setInput]     = useState('');
  const [busy, setBusy]       = useState(false);
  const bottomRef             = useRef(null);
  const { toastError }        = useToast();

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Efek mesin tik untuk pesan bot
  const typeEffect = useCallback((fullText, onTick, onDone) => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      onTick(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(interval);
        onDone();
      }
    }, 14);
    return () => clearInterval(interval);
  }, []);

  const submitQuestion = useCallback(async (question) => {
    const q = question.trim();
    if (!q || busy) return;

    // Tambah pesan user
    setMessages((prev) => [...prev, { type: 'user', text: q, done: true }]);
    setInput('');
    setBusy(true);

    // Placeholder "sedang mengetik"
    setMessages((prev) => [...prev, { type: 'bot', text: '', done: false, typing: true }]);

    try {
      const result = await sendChatMessage(q);
      const reply  = result?.reply || 'Maaf, tidak ada jawaban dari server.';

      // Ganti placeholder dengan teks kosong, lalu jalankan typing effect
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: 'bot', text: '', done: false, typing: false };
        return updated;
      });

      typeEffect(
        reply,
        (partial) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { type: 'bot', text: partial, done: false, typing: false };
            return updated;
          });
        },
        () => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], done: true };
            return updated;
          });
          setBusy(false);
        }
      );
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: 'bot',
          text: 'Maaf, tidak bisa terhubung ke server. Pastikan backend berjalan.',
          done: true,
          isError: true,
        };
        return updated;
      });
      toastError('Chatbot tidak bisa terhubung ke backend.');
      setBusy(false);
    }
  }, [busy, typeEffect, toastError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion(input);
  };

  const handleReset = () => {
    setMessages([{ type: 'bot', text: WELCOME, done: true }]);
    setBusy(false);
    setInput('');
  };

  return (
    <section id="chatbot" className="section chat-section no-print">
      <div className="section-heading">
        <p className="eyebrow">Asisten Informasi</p>
        <h2>Tanyakan data Voksel secara langsung</h2>
      </div>

      <div className="chat-layout">
        {/* Panel saran pertanyaan */}
        <div className="prompt-panel">
          {SUGGESTED.map((q) => (
            <button key={q} type="button" onClick={() => submitQuestion(q)} disabled={busy}>
              {q}
            </button>
          ))}
        </div>

        {/* Jendela chat */}
        <div className="chatbot-card">
          <div className="chat-header">
            <div>
              <strong>Voksel Bot</strong>
              <span>Terhubung ke database backend</span>
            </div>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>

          <div className="chat-messages" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.type} ${msg.isError ? 'message-error' : ''}`}
              >
                {msg.typing ? <TypingDots /> : msg.text}
                {!msg.done && !msg.typing && <span className="typing-cursor">|</span>}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Tulis pertanyaan tentang Voksel..."
              aria-label="Pertanyaan"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              {busy ? '...' : 'Kirim'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}