"use client";

import { useState } from "react";
import "./Chat.css"
export default function Chat(){
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([
        {
            role : "assistant",
            content : "Hello, How can I help you today?"
        }
    ])

    function handleSend(){
        if(!input.trim()){
            return;
        }

        setMessages((prev) => [...prev,
            {
                role : "User",
                content : input
            }
        ])

        setInput("")
    }
    return(
        <div className="chat-container">
            <div className="chat-header">
                <h2>Customer Support</h2>
            </div>

            <div className="messages">
                {messages.map((message,index) => (
                    <div key={index} className={message.role === "assistant"? "bot-message" : "user-message"}>
                        {message.content}
                    </div>
                ))}
            </div>

            <div className="input-area">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type Your refund request"/>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}