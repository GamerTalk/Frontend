"use client"
import React from 'react'
import styles from "./MessageBox.module.css";
import Link from 'next/link';
import { UserAuth } from '@/app/context/AuthContext';

const MessageBox = () => {

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => { 
    e.preventDefault();
  }

  const { userInfo } = UserAuth();

  const param = "example";

  return (
    <Link href={`/messages/${param}`}>
    <div className={styles.messageBox} onClick={handleSelect}>
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
