"use client"
import React, { useState } from "react";
import MessageBox from "../components/layouts/MessageBox";
import Chat from "../components/layouts/Chat";

export default function Messages() { 
  const [chat, isChat] = useState(false);

  return <>
    {chat ? (
      <>
        <Chat isChat={isChat}/>
      </>
    ) : (  
      <>
        <MessageBox isChat={isChat} />
        <MessageBox isChat={isChat} />
        <MessageBox isChat={isChat} />
      </>
    )}
    </>
}