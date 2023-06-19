import React from 'react'
import styles from './dict.module.css'

export default function Dict() {
  return (
    <div className={styles.body}>
      <h1>Dictionary</h1>

      <form>
        <div className={styles.langBox}>
        <input type="checkbox"></input>
        <div><label>English </label></div>
        <div><label>Japanese</label></div>
        </div>
      
      </form>



    </div>
  )
}

