import { ChangeEventHandler, useState } from 'react';
import styles from '../../dict/dict.module.css'

interface Param {
  front : string,
  back: string
  name: string
  isChecked: boolean
  onChange : ChangeEventHandler<HTMLInputElement>,
}

const DictCheckbox: React.FC<Param> = ({ front, back, onChange, name})  => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  return (
    <div className={styles.langBox}>
    <input className={styles.checkbox} type="checkbox" onChange={handleCheckboxChange} name={name} checked={isChecked}></input>
    <div className={styles.front}><label>{front}</label></div>
    <div className={styles.back}><label>{back}</label></div>
    </div>
  )
}


export default DictCheckbox