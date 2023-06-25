import React, { useContext } from 'react'
import styles from "./Message.module.css"
import { UserAuth } from '@/app/context/AuthContext';

interface Prop{
  message: string;
  date: Date;
  id: string;
}
const Message = (props: Prop) => {
  const { uid } = UserAuth();
  const { message, date, id } = props;

  const isRightAligned = id === uid;
  console.log(isRightAligned);
  
  return (
    <> 
      <div className={`${styles.messageBox} ${isRightAligned ? styles.messageRight : styles.messageLeft}`}>
        <div className={styles.message}>
        <p className={styles.messageText}>{message}</p>
        </div>
    </div>
    </>
  )
}

export default Message


