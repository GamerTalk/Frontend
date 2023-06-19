"use client"

import React, { useEffect, useState } from "react";
import MessageBox from "../components/layouts/MessageBox";

import {
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  DocumentData
} from "firebase/firestore";

import { UserAuth } from '@/app/context/AuthContext';
import { db } from '@/app/firebase/firebase';
import { Chat } from "../global.t";

export default function Messages() {
  const { uid } = UserAuth();
  const [chats, setChats] = useState<{ [key: string]: Chat } | undefined>(undefined);

  useEffect(() => {
    const getChats = async () => {
      if (uid) {
        try {
          // observe userChats data  
          const unsub = await onSnapshot<DocumentData>(doc(db, "userChats", uid), (doc) => {
            // const chatData = doc.data() as Chat;
            const chatData = doc.data() as { [key: string]: Chat };
            console.log("Current data: ", chatData);
            // setChats(chatData);
            setChats(doc.data());
          });
          // stop observing user chats data
          return () => {
            unsub();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getChats();

  }, [uid]);
  console.log("chats data",chats);
  return (
    <>
   {chats === undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.entries(chats).map(([chatId, chatData], key) => (
            <div key={key}>
              {chatData.userInfo.userName}
              {chatId}
            </div>
          ))}
        </div>
      )}
    </>
  )
}