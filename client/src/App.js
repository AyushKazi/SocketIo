import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [messageDb, setMessageDb] = useState([]);

  const socket = io("http://localhost:8080/");

  socket.emit("public_channel", { message: "random message" });

  useEffect(() => {
    socket.on("public_channel", (data) => {
      console.log(data);
      setMessageDb((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const handleSendMessage = () => {
    // Emit the message to the server
    socket.emit("public_channel", { message: message });
    // Clear the message input field
    setMessage("");
  };

  const displayText = () => {
    return messageDb.map((message, index) => (
      <div key={index} className="message">
        {message.message}
      </div>
    ));
  };

  function sendMessage() {
    socket.emit("public_channel", { text: message });
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Chat Room</h1>
      {/* display message */}
      {console.log(messageDb)}

      {messageDb.map((message, index) => (
        <div key={index} className="message">
          {message.message.message} {/* Access the nested message property */}
        </div>
      ))}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "5px",
          width: "800px", // Set the width as desired
          marginRight: "10px", // Adjust spacing as needed
          marginBottom: "20px",
          marginTop: "80px",
        }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        SEND
      </button>
    </div>
  );
}

export default App;
