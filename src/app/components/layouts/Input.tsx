"use client";
import React, { useContext, useState } from 'react'
import styles from "./Input.module.css"
import {
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Input = () => {

  const { chatId , chatUserId , updateChatId, userName, userProfileURL} = useContext(MessagesContext);
  const { uid, userInfo } = UserAuth();
  
  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };
  
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

    const isWhiteSpace: boolean = /^\s*$/.test(message);
    // if message is empty , it return anything.
    console.log("is white space",isWhiteSpace);
    if (isWhiteSpace) { 
      return;
    }

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
            userProfileURL: userProfileURL
          },
        date: serverTimestamp(),
        lastMessage: message
        },
        
      }
  
      const payloadForMessagingUserChats = {
        [chatId]: {
          userInfo: {
            uid: uid,
            userName: userInfo?.username,
            userProfileURL: userInfo?.profile_picture_url
          },
          date: serverTimestamp(),
          lastMessage: message
        },
      }
    
    const updatePayloadForUserChats = {
      [`${chatId}.lastMessage`]: message,
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputText}>
      <textarea
        value={message}
        placeholder="Message"
        onChange={handleMessageChange}
        id={styles.textbox}
        />
      </div>
        <div className={styles.sendButton}>    
          <button type="submit" className={styles.sendButton}>
            <FontAwesomeIcon icon={faPaperPlane} id={styles.sendIcon} />
        </button>
      </div>
    </form>
    </div>
  )
}

export default Input