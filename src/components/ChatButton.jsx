import React from "react";
import "./ChatButton.css";

function ChatButton() {
  const message = "Hello! I would like to know more about your services.";
  const whatsappURL = `https://wa.me/7905068217?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappURL} className="chat-button" target="_blank" rel="noreferrer">
      Chat with us
    </a>
  );
}

export default ChatButton;
