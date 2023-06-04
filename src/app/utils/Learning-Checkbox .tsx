"use client"

import { useState, useEffect, ChangeEventHandler } from "react";

interface Param {
 label: string,
 name: string,
 onChange : ChangeEventHandler<HTMLInputElement>
}

const LearningCheckbox = ({ label, name, onChange }: Param) => {
  const [isChecked, setIsChecked] = useState(false);
  const [num, setNum] = useState(1)

  useEffect(() => {
    console.log(num)
  },[num])

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  const handleNumberChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    const {  name } = event.target;
    setNum(parseInt(name))
  };


  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox"  checked={isChecked} onChange={handleCheckboxChange} name={name} />
        <input type="radio" name="1" onChange={handleNumberChange}/>
        <input type="radio" name="2" onChange={handleNumberChange}/>
        <input type="radio" name="3" onChange={handleNumberChange}/>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default LearningCheckbox;