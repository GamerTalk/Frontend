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
  const [loading, isLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const getChats = async () => {
      if (uid) {
        try {
          // observe userChats data  
          const unsub = await onSnapshot<DocumentData>(doc(db, "userChats", uid), (doc) => {
            const chatData = doc.data() as { [key: string]: Chat };
            // setChats(chatData);
            setChats(doc.data());
            isLoading(false);
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

return (
    <>
   {loading ? (
      <p>Loading...</p>
    ): chats === undefined ?(
    <p>You have not texted anyone yet.</p>
   ) : (
    <div>
      {Object.entries(chats).sort((a, b) => {
       const dateA = a[1].date && new Date(a[1].date.seconds * 1000 + a[1].date.nanoseconds / 1000000);
       const dateB = b[1].date && new Date(b[1].date.seconds * 1000 + b[1].date.nanoseconds / 1000000);
       if (dateA && dateB) {
         return dateB.getTime() - dateA.getTime();
       }
        return 0;
      }
      ).map(([chatId, chatData], key) => (
        <div key={key}>
          <MessageBox chatUserName={chatData.userInfo.userName} chatUserId={chatData.userInfo.uid}
            chatId={chatId} chatUserProfileURL={chatData.userInfo.userProfileURL} lastMessage={chatData.lastMessage} messageDate={chatData.date} />
        </div>
      ))}
    </div>
  )}
    </>
  )
}