import React, { useState, useEffect, ChangeEventHandler } from "react";
import styles from '../../entry-form/UserInfo.module.css'

interface Param {
  label: string;
  name: string;
  onChange : ChangeEventHandler<HTMLInputElement>
  defaultChecked1: boolean;
  defaultChecked2: boolean;
  defaultChecked3: boolean;
}

const LearningCheckbox: React.FC<Param> = ({ label, name, onChange, defaultChecked1, defaultChecked2,defaultChecked3 }) => {
  const [isChecked1, setIsChecked1] = useState(defaultChecked1);
  const [isChecked2, setIsChecked2] = useState(defaultChecked2);
  const [isChecked3, setIsChecked3] = useState(defaultChecked3);

  const handleCheckboxChange1: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked1(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  const handleCheckboxChange2: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked2(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  const handleCheckboxChange3: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked3(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };
  
  
  return (
    <div className={styles.learning}>
      <span>{label}</span>
      <div><input type="radio" name={name} value="1" onChange={handleCheckboxChange1} checked={isChecked1} /> </div>
      <div><input type="radio" name={name} value="2" onChange={handleCheckboxChange2} checked={isChecked2} /> </div>
      <div><input type="radio" name={name} value="3" onChange={handleCheckboxChange3} checked={isChecked3} /> </div>
    </div>
  );
};

export default LearningCheckbox;
