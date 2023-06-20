import React, { useState, useEffect } from 'react';
import styles from '../dict-add/add.module.css'
import axios from 'axios';
import { UserAuth } from '@/app/context/AuthContext';



interface Param {
  onClose: any
}

const Delete: React.FC<Param> = ({ onClose}) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const {uid} = UserAuth();


  const handleFront = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setFront(value);
  }

  const handleBack = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setBack(value);
  }

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const payload = {
      user_uid: uid,
      front,
      back
    }
  
    axios.post('http://127.0.0.1:8000/api/new-flashcard/', payload)
      .then(response => {
        onClose()
    })
      .catch(error => {
      console.log(error);
    });
  }



  


  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <h2>Add a new card</h2>
        <form onSubmit={handleFormSubmit}>
        <div className={styles.card}><p className={styles.title}>Front</p><input className={styles.input} onChange={handleFront}/></div>
        <div className={styles.card}><p className={styles.title}>Back</p><input className={styles.input} onChange={handleBack}/></div>
        <button className={styles.submit}>Add</button>
        </form>
        <button onClick={onClose} className={styles.close}>Close</button>
      </div>
    </div>
  );
};

export default Delete;