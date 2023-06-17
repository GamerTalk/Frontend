"use client";
import React, { useState } from 'react'
import styles from "./Input.module.css"

const Input = () => {

  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    console.log('send message:', message);
   
    // reset
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