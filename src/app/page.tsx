'use client'

import React, { useEffect, useState } from "react";
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [posts, setPosts] = useState([])
  const [counter, setCounter] = useState<number>(0)


  const {uid, userInfo} = UserAuth()
  const router = useRouter()
  

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
    setCounter(counter+1)
    setMessage("")
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
      }, 3000); // Delay of 3 seconds before redirecting

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [uid]);

  useEffect(() => {
    async function getData() {
      try {
        if (uid) { 
        const userData : any  = await axios.get('http://localhost:8000/api/get-posts').then((result) => result.data)
        setPosts(userData)
      } 
    }
      catch(error) {
       console.log(error)
      }
    }
    getData()
    console.log('saved')
  },[uid, counter])

 

  useEffect(() => {
    console.log(posts)
  },[posts])


  if (uid) {
    return (
      <div style={{background: '#F0F2F5'}}>
      <form onSubmit={handleFormSubmit}>
      <textarea rows={5} cols={40} onChange={handleMessage} className={styles.textarea} placeholder="What's going on?" value={message}/> 
      <div><button className={styles.button}>Post</button></div>

    
      </form>

       
      {posts.map((x: any) => {

        const messageDate = new Date(x.time_of_message);
        // Format the date and time
        const formattedDate = messageDate.toLocaleDateString(); // Change the date format as desired
        const formattedTime = messageDate.toLocaleTimeString(); // Change the time format as desired

        return <div className={styles.post} key={x.id}>
        <div className={styles.pic}>Picture</div>
        <div className={styles.time}>{formattedDate} {formattedTime}</div>
        <div className={styles.user}>{x.sender_data.username}</div>
        <div className={styles.message}>{x.message.split('\n').map((e: string) => <p>{e}</p>)}</div>
      </div>
      } )}
    


      </div>
    )
  }

  return null;
}
