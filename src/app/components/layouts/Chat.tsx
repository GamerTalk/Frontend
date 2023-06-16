import React from 'react'
import Message from './Message'
import Input from './Input'
import styels from './Chat.module.css'

interface Prop{
  isChat: React.Dispatch<React.SetStateAction<boolean>>
}

const Chat = (props:Prop) => {
  return (
    <>
      <div className={styels.chatBox}>
          
      </div>
    </>
  )
}

export default Chat