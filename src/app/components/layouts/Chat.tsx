"use client";

import React, { useEffect, useState, useContext } from 'react'
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
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };

  },[chatId]);

  console.log(messages);

  return (
    <>
      <div className={styels.chatBox}>
        {messages.map((message) => (
          <Message message={message.text} date={message.date}/>
          )
        )}
        <Input />
      </div>
    </>
  )
}

export default Chat