import React, { useState, useRef } from "react";
import logo from "./logo.png";
const Chatbox = () => {
  const [state, setState] = useState(false); // Open/closed state
  const [messages, setMessages] = useState([]); // Chat messages
  const inputRef = useRef(null); // Reference for the input field
  const chatboxRef = useRef(null); // Reference for the chatbox

  // Toggle chatbox visibility
  const toggleState = () => {
    setState(!state);
  };

  // Handle sending a message
  const onSendButton = async () => {
    const text = inputRef.current.value;

    if (!text) return;

    const userMessage = { name: "User", message: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(
        "https://716d-59-145-191-138.ngrok-free.app/predict",
        {
          method: "POST",
          body: JSON.stringify({ message: text }),
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      const botMessage = { name: "GreenPick", message: data.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    inputRef.current.value = "";
  };

  // Render chat messages
  const renderMessages = () => {
    return messages
      .slice()
      .reverse()
      .map((msg, index) => (
        <div
          key={index}
          className={`messages__item ${
            msg.name === "GreenPick"
              ? "messages__item--visitor"
              : "messages__item--operator"
          }`}>
          {msg.message}
        </div>
      ));
  };

  // Handle "Enter" key in input field
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      onSendButton();
    }
  };

  return (
    <div className="chatbox relative">
      {/* Chatbox Button */}
      <div className="chatbox__button bottom-2 right-5">
        <button onClick={toggleState} id="btnnn">
          <img src={logo} alt="icon" className="w-20" />
        </button>
      </div>

      {/* Chatbox Support */}
      <div
        className={`chatbox__support ${state ? "chatbox--active" : ""}`}
        ref={chatboxRef}>
        {/* Header */}
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src={logo} alt="image" className="w-14" />
          </div>
          <div className="chatbox__content--header">
            <h1
              className="absolute right-5 top-5 cursor-pointer"
              onClick={toggleState}>
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 15 15"
                version="1.1"
                id="cross"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"
                />
              </svg>
            </h1>
            <h4 className="chatbox__heading--header">RA-Wee</h4>
            <p className="chatbox__description--header">How can I help you?</p>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbox__messages">{renderMessages()}</div>

        {/* Footer */}
        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Write a message..."
            ref={inputRef}
            onKeyUp={handleKeyUp}
            className="chatbox__input"
          />
          <button onClick={onSendButton} className="chatbox__send--footer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
