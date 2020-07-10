import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
let socket;

const ChatWindow = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    socket = socketIOClient("https://chatapp-backend-dummy.herokuapp.com/");
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("welcome", (data) => {
      setMessages(data);
    });
  }, []);
  useEffect(() => {
    socket.on("receive", (msg) => {
      setMessages([...messages, msg]);
    });
    return () => socket.off("receive");
  }, [messages]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: props.username,
      avatar: props.avatar,
      body: newMessage,
    };
    console.log(data);
    socket.emit("send", data);
    setNewMessage("");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="msg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></input>
        <input type="submit" value="send"></input>
      </form>
      {messages.map((m, index) => (
        <div
          className="d-flex m-3 justify-content-flex-start align-items-center"
          key={index}
        >
          <img
            src={m.avatar}
            className={m.avatar ? "pr-2" : ""}
            style={{ display: "inline-block", height: "50px" }}
          ></img>
          <p style={{ margin: "auto", width: "100%" }}>
            {m.username}: {m.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
