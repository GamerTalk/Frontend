import React from 'react'
import styles from './dict.module.css'
import DictCheckbox from '../components/elements/Dict-Checkbox'

export default function Dict() {
  return (
    <div className={styles.body}>
      <h1>Dictionary</h1>

      <form>

        <DictCheckbox front="English" back="Japanese"/>
        <DictCheckbox front="Word 1" back="Word 2"/>
        <DictCheckbox front="Word 3" back="Word 4"/>
        

       
      
      </form>



    </div>
  )
}

