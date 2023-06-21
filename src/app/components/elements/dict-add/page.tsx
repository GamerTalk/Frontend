// @ts-nocheck

"use client"

import React, { useState } from 'react';
import styles from './add.module.css';
import axios from 'axios';
import { UserAuth } from '@/app/context/AuthContext';


const Add: React.FC<Param> = ({ handleClosePopup }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const { uid } = UserAuth();

  const handleFront = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFront(value);
  };

  const handleBack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBack(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      user_uid: uid,
      front,
      back,
    };

    axios
      .post('http://127.0.0.1:8000/api/new-flashcard/', payload)
      .then((response) => {
        // Handle success or perform any necessary actions
        // Close the pop-up
        handleClosePopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <h2>Add a new card</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.card}>
            <p className={styles.title}>Front</p>
            <input className={styles.input} value={front} onChange={handleFront} />
          </div>
          <div className={styles.card}>
            <p className={styles.title}>Back</p>
            <input className={styles.input} value={back} onChange={handleBack} />
          </div>
          <button className={styles.submit}>Add</button>
        </form>
        <button className={styles.close} onClick={handleClosePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Add;
