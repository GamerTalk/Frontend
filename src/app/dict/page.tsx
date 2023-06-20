"use client"

import React, { useEffect, useState } from 'react'
import styles from './dict.module.css'
import DictCheckbox from '../components/elements/Dict-Checkbox'
import Add from '../auth/dict-add/page'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'

export default function Dict() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cards, setCards] = useState<any>([]);

  const {uid} = UserAuth();

  const config = {
    method: 'GET',
    headers: {
      'uid' : uid
    }
  }

  const url = "http://localhost:8000/api/get-flashcards/"

  useEffect(() => {
    async function getData() {
      try {
        if (uid) { 
        const userData : any  = await axios.get(url, config).then((result) => result.data)
        setCards(userData) 
        } else {
          console.log('fail')
        }
      }
      catch(error) {
       console.log(error)
      }
    }
    getData()
  },[uid])

  useEffect(() => {
    console.log('CAAAAARDs', cards.map((card : any) => card.front))
  },[cards])



  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  
  return  cards.length > 0 ? (
    <div className={styles.body}>
      <h1>Dictionary</h1>

      <form>
      <div className={styles.langBoxHeader}>  
        <input type="checkbox"/> 
        <p  className={styles.front}>Front</p>
        <p  className={styles.back}> Back</p>
      </div>

      {cards.map((card: any) => (
        <DictCheckbox front={card.front} back={card.back} key={card.id} />
      ))}
    
      </form>

      <div>
      <button onClick={openPopup}>Open Popup</button>
      {isPopupOpen && <Add onClose={closePopup} />}
     </div>

    </div>
  )  : "Now Loading "
}

