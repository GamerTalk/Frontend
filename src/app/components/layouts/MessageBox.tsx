"use client"
import React, { useContext } from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';
import { MessagesContext } from '@/app/context/MessageContext';

interface Prop { 
  chatUserName: string,
  chatUserId: string,
  chatId: string
  chatUserProfileURL:string
}

const MessageBox = (prop:Prop) => {
  const { chatUserName, chatUserId, chatId, chatUserProfileURL} = prop;

  const { updateChatUserId, updateChatId, updateUserName ,updateUserProfileURL} = useContext(MessagesContext);
  
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => { 
  // update a username, userId and chatId who you want to chat with
    updateChatUserId(chatUserId);
    updateChatId(chatId);
    updateUserName(chatUserName);
    updateUserProfileURL(chatUserProfileURL);
  }

  return (
    <Link href={"/messages/message"}>
    <div className={styles.messageBox} onClick={handleSelect}>
      <div className={styles.imageWrapper}>
      <img src={chatUserProfileURL} id={styles.userImg} />
      </div>
      <div className={styles.userInfo}>
          <p>{chatUserName}</p>
      </div>
    </div>
    </Link>
  )
}

export default MessageBox
