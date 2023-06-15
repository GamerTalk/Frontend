"use client"
import React from 'react'
import styles from "./MessageBox.module.css";

interface Prop{
  
}

const MessageBox = () => {
  return (
    <div className={styles.messageBox}>
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
