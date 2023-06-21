"use client"

import React, { useEffect, useState } from 'react'
import styles from './dict.module.css'
import DictCheckbox from '../components/elements/Dict-Checkbox'
import Add from '../components/elements/dict-add/page'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'

export default function Dict() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cards, setCards] = useState<any>([]);
  const [deleteCards, setDeleteCards] = useState<string[]>([]);

  const {uid} = UserAuth();

  const config = {
    method: 'GET',
    headers: {
      'uid' : uid
    }
  }

  const getURL = "http://localhost:8000/api/get-flashcards/"
  const deleteURL = "http://localhost:8000/api/delete-flashcard/"

  const getData = async () => {
    try {
      if (uid) {
        const userData: any = await axios.get(getURL, config).then((result) => result.data);
        setCards(userData);
      } else {
        console.log('fail');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async () => {
    try {
      if (uid) {
        await Promise.all(
          deleteCards.map(async (card) => {
            const requestData = {
              user_uid: uid,
              card_id: card
            };
            await axios.delete(deleteURL, { data: requestData, headers: { uid } });
          })
        );
        await getData(); // Refresh the data after deleting the cards
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

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
    await getData();
  };

  const handleDeleteCards = (event: { target: { name: string }; }) => {
    const {  name } = event.target;
    if (deleteCards.includes(name)) {
      // If card is already selected, remove it from the array
      setDeleteCards((prevCards) => prevCards.filter((card) => card !== name));
    } else {
      // If card is not selected, add it to the array
      setDeleteCards((prevCards) => [...prevCards, name]);
    }
  }

  useEffect(() => {
    console.log(deleteCards)
  },[deleteCards])

  function myFunction() {
    if (confirm("Are you sure you want to delete these cards?") === true) {
      deleteData()
    } else {
      closePopup()
    }
  }


  
  return  cards.length > 0 ? (
    <div className={styles.body}>
      <h1>Dictionary</h1>

      <form>
      <div className={styles.wholeBox}>  
      <div className={styles.langBoxHeader}>  
        <p></p>
        <p>Front</p>
        <p>Back</p>
      </div>

    
      
      {cards.map((card: any) => (
        <DictCheckbox front={card.front} back={card.back} key={card.id} name={card.id} isChecked={false} onChange={handleDeleteCards}/>
      )).reverse()}

    </div> 
    
      </form>

      <div className={styles.plusAndMinus}>

        <div>
          <button className={styles.plus} onClick={openPopup}>+</button>
          {isPopupOpen && <Add onClose={closePopup} />}
        </div>

        <div>
          <button className={styles.minus} onClick={myFunction}>-</button>
        </div>
     </div>



    </div>
  ) : <p className={styles.loading}>Loading Profile...</p>
}

