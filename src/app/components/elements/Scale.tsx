import React from 'react'
import styles from "./Scale.module.css";

interface Prop { 
  level:number
}

const Scale = (props: Prop) => {
  const { level } = props;
  const scaleWidth = `${level * 20}%`;
  const backgroundColor =
  level <= 2 ? '#1E90FF' : level <= 4 ? '#FFD700' : '#00FF00';
  return (
    <div className={styles.scaleWrapper}>
      <div className={styles.scale} style={{ width: scaleWidth, background: backgroundColor}}></div>
    </div>
  )
}

export default Scale