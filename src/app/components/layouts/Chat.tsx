"use client";

import React, { useEffect, useState, useContext, useRef } from 'react'
import Message from './Message'
import Input from './Input'
import styels from './Chat.module.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
import { MessagesContext } from '@/app/context/MessageContext'
import { UserMessage } from '@/app/global.t'

const Chat = () => {

  const [messages, setMessages] = useState<UserMessage[]>([]);

  const { chatId, chatUserId, updateChatId, userName } = useContext(MessagesContext);
  
  const ref =useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      return ;
    }
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    
    return () => {
      unsub();
    };
  }, [chatId]);
  

  return (
    <>
      <div className={styels.chatBoxContainer}>
        {messages.map((message,key) => (
          <Message message={message.text} date={message.date} key={key} id={message.senderId}/>
          )
        )}
      <div ref={ref}></div>
      </div>
      <div className={styels.inputContainer}>
        <Input />
      </div >
    </>

  )
}

export default Chat
