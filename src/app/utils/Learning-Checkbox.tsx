import React, { useState, useEffect, ChangeEventHandler } from "react";
import styles from '../userinfo/UserInfo.module.css'

interface Param {
  label: string;
  name: string;
  onChange : ChangeEventHandler<HTMLInputElement>
}

interface LanguageLevel {
  language: string;
  level: number;
}

const LearningCheckbox: React.FC<Param> = ({ label, name, onChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  
  return (
    <div className={styles.learning}>
      <span>{label}</span>
      <div><input type="radio" name={name} value="1" onChange={onChange} /> </div>
      <div><input type="radio" name={name} value="2" onChange={onChange} /> </div>
      <div><input type="radio" name={name} value="3" onChange={onChange} /> </div>
    </div>
  );
};

export default LearningCheckbox;
