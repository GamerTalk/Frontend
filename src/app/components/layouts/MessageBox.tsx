"use client"
import React from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';

const MessageBox = () => {

  const handleSelct = (e:any) => { 
    // e.preventDefault();
  }

  const param = "example";

  return (
    <Link href={`/messages/${param}`}>
    <div className={styles.messageBox} onClick={handleSelct}>
      <div className={styles.imageWrapper}>
      <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.userImg} />
      </div>
      <div className={styles.userInfo}>
        <p>User Name</p>
      </div>
    </div>
    </Link>
  )
}

export default MessageBox
