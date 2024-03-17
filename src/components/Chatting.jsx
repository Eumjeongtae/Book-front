
import React from "react";
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import MessageParser from "../chat/MessageParser";
import ActionProvider from "../chat/ActionProvider";
import config from "../chat/config";


function Chatting() {
  return (
    <div className="chatContainer">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Chatting;