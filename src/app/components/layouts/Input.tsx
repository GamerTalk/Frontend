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
import { randomUUID } from 'crypto';

const Input = () => {

  const { chatId , chatUserId , updateChatId} = useContext(MessagesContext);
  const { uid } = UserAuth();

  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async(event:any) => {
    event.preventDefault();
    if (uid) {
      // create a chat room id for one-on-one messaging
      const combinedId: string = uid > chatUserId ? uid + chatUserId : chatUserId + uid

      try { 
        const res = await getDoc(doc(db, "chats", combinedId));
        console.log("chat id is exist?", res.exists());
        
        if (!res.exists()) {
          // create chats with combinedId
          console.log("Chats is created by combinedId");
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          updateChatId(combinedId);
        }

        // save a messages to chats 
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: randomUUID,
            text: message,
            senderId: uid,
            date: Timestamp.now(),
          })
        })
      
      // save a last message for current user
        await updateDoc(doc(db, "userChats", ), {

        })

        await updateDoc(doc(db, "userChats", ))
      } catch (error) {
        // error handling
        console.log(error);
      }
    }
    
    console.log('send message:', message);
    // reset messages
    setMessage('');
  };

  return (
    <div className={styles.textContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputText}>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="here message"
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