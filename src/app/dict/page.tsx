"use client"

import React, { useEffect, useState } from 'react'
import styles from './dict.module.css'
import DictCheckbox from '../components/elements/Dict-Checkbox'
import Add from '../components/elements/dict-add/page'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'
import Delete from '../components/elements/dict-delete/page'

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

  const getData = async () => {
    try {
      if (uid) {
        const userData: any = await axios.get(url, config).then((result) => result.data);
        setCards(userData);
      } else {
        console.log('fail');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [uid]);

  useEffect(() => {
    console.log('CAAAAARDs', cards.map((card : any) => card.front))
  },[cards])



  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
    await getData();
  };
  
  return  cards.length > 0 ? (
    <div className={styles.body}>
      <h1>Dictionary</h1>

      <form>
      <div className={styles.langBoxHeader}>  
        <input className={styles.checkbox} type="checkbox"/> 
        <p  className={styles.front}>Front</p>
        <p  className={styles.back}> Back</p>
      </div>

      {cards.map((card: any) => (
        <DictCheckbox front={card.front} back={card.back} key={card.id} />
      )).reverse()}
    
      </form>

      <div>
      <button className={styles.plus} onClick={openPopup}>+</button>
      {isPopupOpen && <Add onClose={closePopup} />}
     </div>

     <div>
     <button className={styles.minus} onClick={openPopup}>+</button>
      {isPopupOpen && <Delete onClose={closePopup} />}
     </div>



    </div>
  )  : "Now Loading "
}

