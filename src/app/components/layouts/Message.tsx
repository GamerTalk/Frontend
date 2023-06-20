import React from 'react'
import styles from "./Message.module.css"

interface Prop{
  message: string;
  date: Date;
}
const Message = (props:Prop) => {
  const { message, date } = props;
  return (
    <> 
    <div className={styles.messageBox}>
        <div className={styles.message}><p>{message}</p>{}</div>
    </div>
    </>
  )
}

export default Message


