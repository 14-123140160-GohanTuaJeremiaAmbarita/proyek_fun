import React, { useMemo, useState, useEffect, useRef } from "react";
import { answerQuestion, mainQuestions } from "../data/chatbotRules.js";

const welcome =
  "Halo, saya Voksel Bot. Silakan tanya tentang profil, produk, alamat Bogor, data keuangan, investor, penjualan, karyawan, atau dataset.";

export function Chatbot() {
  const [messages, setMessages] = useState([{ type: "bot", text: welcome, isTypingComplete: true }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const suggestedQuestions = useMemo(() => mainQuestions, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeEffect = (fullText, callback) => {
    let currentText = "";
    let index = 0;
    
    // Kecepatan mengetik: 15ms per karakter agar tidak terlalu lambat
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText.charAt(index);
        callback(currentText, false);
        index++;
      } else {
        clearInterval(interval);
        callback(fullText, true);
      }
    }, 15);
  };

  const submitQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    // 1. Tambahkan pertanyaan user
    setMessages((current) => [
      ...current,
      { type: "user", text: trimmed, isTypingComplete: true }
    ]);
    setInput("");

    // 2. Ambil jawaban asli dari rules
    const botAnswerText = answerQuestion(trimmed);

    // 3. Tambahkan slot kosong untuk jawaban bot dengan indikator sedang mengetik
    setMessages((current) => [
      ...current,
      { type: "bot", text: "", isTypingComplete: false }
    ]);

    // 4. Jalankan efek mesin tik
    typeEffect(botAnswerText, (typedText, isComplete) => {
      setMessages((current) => {
        const updated = [...current];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex].type === "bot") {
          updated[lastIndex] = {
            type: "bot",
            text: typedText,
            isTypingComplete: isComplete
          };
        }
        return updated;
      });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion(input);
  };

  return (
    <section id="chatbot" className="section chat-section no-print">
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
            <button type="button" onClick={() => setMessages([{ type: "bot", text: welcome, isTypingComplete: true }])}>
              Reset
            </button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div 
                className={`message ${message.type} ${!message.isTypingComplete && message.type === 'bot' ? 'typing-active' : ''}`} 
                key={`${message.type}-${index}`}
              >
                {message.text}
                {!message.isTypingComplete && message.type === 'bot' && (
                  <span className="typing-cursor">|</span>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
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