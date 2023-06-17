import React from 'react'
import Message from './Message'
import Input from './Input'
import styels from './Chat.module.css'

const Chat = () => {
  return (
    <>
      <div className={styels.chatBox}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Input />
      </div>
    </>
  )
}

export default Chat