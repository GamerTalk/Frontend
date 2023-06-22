"use client"

import { createContext, ReactNode, useState } from "react";

interface MessagesContextProp { 
  chatUserId: string;
  chatId: string;
  userName: string;
  userProfileURL: string;
  updateChatUserId: (userId: string) => void;
  updateChatId: (chatID: string) => void;
  updateUserName: (userName: string) => void;
  updateUserProfileURL: (profileURL: string) => void;
}


export const MessagesContext = createContext<MessagesContextProp>(
  {
      chatUserId: "",
      chatId: "",
      userName: "",
      userProfileURL: "",
      updateChatUserId: () => { },
      updateChatId: () => { },
      updateUserName: () => { },
      updateUserProfileURL: () => { }
    }
);

const MessageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => { 
  
  const [chatUserId, setChatUserId] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userProfileURL, setUserProfileURL] = useState<string>("");

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

  // user profile
  const updateUserProfileURL = (newUserProfileURL: string) => { 
    setUserProfileURL(newUserProfileURL);
  }
  
  const contextValue: MessagesContextProp = {
    chatUserId,
    chatId,
    userName,
    userProfileURL,
    updateChatUserId,
    updateChatId,
    updateUserName,
    updateUserProfileURL
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessageContextProvider;
