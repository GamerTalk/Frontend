"use client";
import React, { useContext, useState } from 'react'
import styles from "./Input.module.css"
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from '@/app/firebase/firebase';
import { MessagesContext } from '@/app/context/MessageContext';
import { UserAuth } from '@/app/context/AuthContext';
import { v4 as uuid } from 'uuid';
import path from 'path';

const Input = () => {

  const { chatId , chatUserId , updateChatId} = useContext(MessagesContext);
  const { uid } = UserAuth();

  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };
  
  // firestore collection path
  const USER_CHATS  = "userChats";
  const CHATS = "chats";

  async function updateFireStore(collectionPath: string, documentId: string, data: any) {
    await updateDoc(doc(db, collectionPath, documentId), data);
  }
  
  async function setFireStore(collectionPath: string, documentId: string, data: any) {
    await setDoc(doc(db, collectionPath, documentId), data);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(message);
    console.log("👹",chatId);
    console.log("👺", chatUserId);

    const payloadForChats = {
      messages: arrayUnion({
        id: uuid(),
        text: message,
        senderId: uid,
        date: Timestamp.now(),
      }
      )
    }

    const payloadForCurrentUserChats = {
      [chatId + ".userInfo"]: {
        uid: uid,
      },
      [chatId + ".lastMessage"]: {
        text: message
      },
      [chatId + ".date"]: serverTimestamp(),
    }

    const payloadForMessagingUserChats = {
      [chatId + ".userInfo"]: {
        uid: chatUserId,
      },
      [chatId + ".lastMessage"]: {
        text: message
      },
      [chatId + ".date"]: serverTimestamp(),
    }


    if (uid) {
      try { 
        const res = await getDoc(doc(db, "chats", chatId));
        console.log("chat id is exist?", res.exists());
        // when chat room does not exist 
        if (!res.exists()) {
          // create chats with combinedId
          console.log("Chats is created by combinedId");
          await setFireStore(CHATS, chatId, { messages: [] });
          console.log("User Chats is created for current user");
          await setFireStore(USER_CHATS, uid, payloadForCurrentUserChats);
          console.log("User Chats is created for a user who a current user chat with");
          await setFireStore(USER_CHATS, chatUserId, payloadForMessagingUserChats);
        } else {
          
        }
  
      } catch (error) {
        // error handling
        console.log(error);
      }
    }

    // reset messages
    setMessage('');
  };

  return (
    <div className={styles.textContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputText}>
      <textarea
        value={message}
        placeholder="here message"
        onChange={handleMessageChange}
        className={styles.textbox}
        />
      </div>
      <div className={styles.sendButton}>    
        <button type="submit">Send</button>
      </div>
    </form>
    </div>
  )
}

export default Input