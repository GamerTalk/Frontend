"use client"
import React from 'react'
import styles from "./MessageBox.module.css";

interface Prop{
  isChat: React.Dispatch<React.SetStateAction<boolean>>
}

const MessageBox = (props: Prop) => {

  const { isChat } = props;

  const handleSelct = (e:any) => { 
    e.preventDefault();
    isChat(true);
  }
  return (
    <div className={styles.messageBox} onClick={handleSelct}>
      <div className={styles.imageWrapper}>
      <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.userImg} />
      </div>
      <div className={styles.userInfo}>
        <p>User Name</p>
      </div>
    </div>
  )
}

export default MessageBox
