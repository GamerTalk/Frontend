import React from 'react'
import styles from "./Message.module.css"

const Message = () => {
  return (
    <> 
    <div className={styles.messageBox}>
      <div className={styles.message}><p>Hi Yamato</p></div>
    </div>
    </>
  )
}

export default Message