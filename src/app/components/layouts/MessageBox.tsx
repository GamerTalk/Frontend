"use client"
import React from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';
import { UserAuth } from '@/app/context/AuthContext';

interface Prop { 
  chatUserName: string,
  chatUserId: string,
  chatId: string
  // user image url : string is going to be add here
}

const MessageBox = (prop:Prop) => {
  const { chatUserName, chatUserId, chatId } = prop;
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => { 
    e.preventDefault();
    // set a username, userId and chatId who you want to chat with

  }

  const { userInfo } = UserAuth();

  return (
    <Link href={`/messages/${chatUserName}`}>
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
