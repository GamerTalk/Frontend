"use client"

import { createContext, useContext, ReactNode, useState } from "react";

interface MessagesContextProp { 
  chatUserId: string;
  chatId: string;
  userName: string;
  updateChatUserId: (userId: string) => void;
  updateChatId: (chatID: string) => void;
  updateUserName: (userName: string) => void;
}

export const MessagesContext = createContext<MessagesContextProp>({
  chatUserId: "",
  chatId: "",
  userName: "",
  updateChatUserId: () => {},
  updateChatId: () => {},
  updateUserName: () => {},
});

const MessageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => { 
  
  const [chatUserId, setChatUserId] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // a user id who you chat with is updated
  const updateChatUserId = (newChatUserId: string) => {
    setChatUserId(newChatUserId);
  };

  // update chatID
  const updateChatId = (newChatId: string) => {
    setChatId(newChatId);
  };

  // a user name who you chat with
  const updateUserName = (newUserName: string) => {
    setUserName(newUserName);
  };

  
  const contextValue: MessagesContextProp = {
    chatUserId,
    chatId,
    userName,
    updateChatUserId,
    updateChatId,
    updateUserName,
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessageContextProvider;
