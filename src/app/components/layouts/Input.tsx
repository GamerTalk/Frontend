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

const Input = () => {

  const { chatId , chatUserId , updateChatId, userName} = useContext(MessagesContext);
  const { uid , userInfo } = UserAuth();
  
  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };
  
  console.log("👹",userInfo.username);
  
  // firestore collection path
  const USER_CHATS  = "userChats";
  const CHATS = "chats";

  async function updateFireStore(collectionPath: string, documentId: string, data: any) {
    await updateDoc(doc(db, collectionPath, documentId), data );
  }
  
  async function setFireStore(collectionPath: string, documentId: string, data: any) {
    await setDoc(doc(db, collectionPath, documentId), data, { merge: true });
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(message);
    console.log("👹",chatId);
    console.log("👺", chatUserId);
    console.log("😊", userName);
    

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
    [chatId]: {
          userInfo: {
            uid: chatUserId,
            userName: userName,
          },
        date: serverTimestamp(),
        lastMessage: message
        },
        
      }
    
    const payloadForMessagingUserChats = {
      [chatId]: {
        userInfo: {
          uid: uid,
          userName: userInfo.username,
        },
        date: serverTimestamp(),
        lastMessage: message
      },
    }
    
    const updatePayloadForUserChats = {
      [`${chatId}.lastMessage`]: {
        message,
      },
      [`${chatId}.date`]: serverTimestamp()
    };
   
    if (uid) {
      try { 
        const res = await getDoc(doc(db, CHATS, chatId));
        console.log("chat id is exist?", res.exists());
        // when chat room does not exist 
        if (!res.exists()) {
          // create chats with combinedId
          await setFireStore(CHATS, chatId, { messages: [] });
        
          await updateFireStore(CHATS,chatId, payloadForChats)
          await setFireStore(USER_CHATS, uid, payloadForCurrentUserChats);
          await setFireStore(USER_CHATS, chatUserId, payloadForMessagingUserChats);
          console.log("new chat is created by combinedId");
        } else {
          await updateFireStore(CHATS, chatId, payloadForChats);
          await updateFireStore(USER_CHATS, uid, updatePayloadForUserChats);
          await updateFireStore(USER_CHATS, chatUserId, updatePayloadForUserChats);
          console.log("update chat");
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