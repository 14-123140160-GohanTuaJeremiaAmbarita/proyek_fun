import React, { useMemo, useState } from "react"; // <--- Sudah diimpor aman
import { answerQuestion, mainQuestions } from "../data/chatbotRules.js";

const welcome =
  "Halo, saya Voksel Bot. Silakan tanya tentang profil, produk, alamat Bogor, data keuangan, investor, penjualan, karyawan, atau dataset.";

export function Chatbot() {
  const [messages, setMessages] = useState([{ type: "bot", text: welcome }]);
  const [input, setInput] = useState("");

  const suggestedQuestions = useMemo(() => mainQuestions, []);

  const submitQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { type: "user", text: trimmed },
      { type: "bot", text: answerQuestion(trimmed) },
    ]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion(input);
  };

  return (
    <section id="chatbot" className="section chat-section">
      <div className="section-heading">
        <p className="eyebrow">Asisten Informasi</p>
        <h2>Tanyakan data Voksel</h2>
      </div>
      <div className="chat-layout">
        <div className="prompt-panel">
          {suggestedQuestions.map((question) => (
            <button key={question} type="button" onClick={() => submitQuestion(question)}>
              {question}
            </button>
          ))}
        </div>
        <div className="chatbot-card">
          <div className="chat-header">
            <div>
              <strong>Voksel Bot</strong>
              <span>Jawaban berbasis dataset frontend</span>
            </div>
            <button type="button" onClick={() => setMessages([{ type: "bot", text: welcome }])}>
              Reset
            </button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`message ${message.type}`} key={`${message.type}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Tulis pertanyaan tentang Voksel..."
              aria-label="Pertanyaan tentang Voksel"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Kirim</button>
          </form>
        </div>
      </div>
    </section>
  );
}