'use client'

import React, { useEffect, useState } from "react";
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [posts, setPosts] = use


  const {uid, userInfo} = UserAuth()
  const router = useRouter()

//   new_post_payload = {
//     'sender': uid,
//     'time_of_message': time_of_message,
//     'message': message
// }

const handleFormSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault();

  const payload = {
    uid,
    message: message,
    time_of_message: new Date().toISOString(),
  }

  console.log(payload);

  axios.post('http://127.0.0.1:8000/api/new-post/', payload)
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log(error);
  });
}

const handleMessage = (event: { target: { value: string; }; }) => {
  const { value } = event.target;
  setMessage(value);
}



  useEffect(() => {
    if (!uid) {
      const timeout = setTimeout(() => {
        router.push('/landing');
      }, 2000); // Delay of 2 seconds before redirecting

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [uid]);

  if (uid) {
    return (
      <>
      <form onSubmit={handleFormSubmit}>
      <textarea rows={5} cols={40} onChange={handleMessage} className={styles.textarea} /> 
      <div><button>Post</button> </div>

    
      </form>

      <div className={styles.post}>
        <div className={styles.pic}>Picture</div>
        <div className={styles.time}>Time</div>
        <div className={styles.user}>Username</div>
        <div className={styles.message}>Message</div>
      </div>

      </>
    )
  }

  return null;
}
