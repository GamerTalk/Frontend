"use client"
import React, { useContext } from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';
import { MessagesContext } from '@/app/context/MessageContext';

interface Prop { 
  chatUserName: string,
  chatUserId: string,
  chatId: string
  // user image url : string is going to be add here
}

const MessageBox = (prop:Prop) => {
  const { chatUserName, chatUserId, chatId } = prop;

  const { updateChatUserId, updateChatId, updateUserName } = useContext(MessagesContext);
  
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => { 
    
  // update a username, userId and chatId who you want to chat with
    updateChatUserId(chatUserId);
    updateChatId(chatId);
    updateUserName(chatUserName);
  }

  return (
    <Link href={"/messages/message"}>
    <div className={styles.messageBox} onClick={handleSelect}>
      <div className={styles.imageWrapper}>
      <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.userImg} />
      </div>
      <div className={styles.userInfo}>
          <p>{chatUserName}</p>
      </div>
    </div>
    </Link>
  )
}

export default MessageBox
