"use client";

import { useState } from "react";
import "./Chat.css";
import Reasoning from "../Reasoning/Reasoning";
export default function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, How can I help you today?",
    },
  ]);

  async function handleSend() {
    setLoading(true);
    if (!input.trim()) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      setLoading(false);

      setLogs(data.result.logs || []);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.result.reply,
        },
      ]);
    } catch (error) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }
  }
  return (
    <div className="main-layout">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Customer Support</h2>
        </div>

        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "assistant" ? "bot-message" : "user-message"
              }
            >
              {message.content}
            </div>
          ))}

          {loading && (
            <div className="thinking-message">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            disabled={loading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Your refund request"
          />
          <button onClick={handleSend} disabled={loading}>{loading ? "Thinking..." : "Send"}</button>
        </div>
      </div>
      <Reasoning logs={logs} />
    </div>
  );
}
