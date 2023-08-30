"use client"
import React, { useContext } from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';
import Image from "next/image";
import { MessagesContext } from '@/app/context/MessageContext';
import { modifyDate } from '@/app/utils/modifyDate';

interface Prop { 
  chatUserName: string,
  chatUserId: string,
  chatId: string
  chatUserProfileURL: string
  lastMessage: string
  messageDate: { seconds: number; nanoseconds: number; };
}

const MessageBox = (prop:Prop) => {
  const { chatUserName, chatUserId, chatId, chatUserProfileURL,lastMessage,messageDate} = prop;

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
      <Image src={chatUserProfileURL} id={styles.userImg} alt='user-image' width={40} height={40}/>
      </div>
        <div className={styles.messageInfo}>
          <div className={styles.messageContentLeft}>
            <p>{chatUserName}</p>
          </div>
          <div className={styles.messageContentLeft}>
            {lastMessage.length > 10 ? (
              <>
                <p>{lastMessage.slice(0, 10)}...</p>
              </>
            ): (
              <>
                <p>{lastMessage}</p>
               </>
              )
            }
          </div>
          <div className={styles.messageContentRight}>
            <p> {modifyDate(messageDate.seconds,messageDate.nanoseconds)}</p>
            {/* <p>{lastDate.toLocaleDateString()}20</p> */}
          </div>
      </div>
    </div>
    </Link>
  )
}

export default MessageBox
