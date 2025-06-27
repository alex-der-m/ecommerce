import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaRobot, FaComments } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''} ${theme}`}>
        <div className={`chatbot-header ${theme}`}>
          <FaRobot className="avatar" />
          <div>
            <strong>ProfeBot</strong>
            <div className="subtitle">Tu tutor virtual 📘</div>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <MdClose />
          </button>
        </div>

        <div className={`chatbot-body ${theme}`}>
          <div className="message bot">¡Hola! 👋 ¿En qué puedo ayudarte hoy?</div>
          <div className="message bot">¿Estás buscando un curso o tenés dudas?</div>
          <div className="message user">Solo estoy mirando, ¡gracias!</div>
        </div>

        <div className="chatbot-input">
          <input type="text" placeholder="(Chat simulado)" disabled />
        </div>
      </div>

      <button className="chatbot-toggle" onClick={toggleChat} title="Abrir chat">
        <FaComments />
      </button>
    </>
  );
};

export default Chatbot;