import React from 'react';
import styles from './add.module.css';

interface Param {
  onClose: any
}

const Add: React.FC<Param> = ({ onClose}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Add;