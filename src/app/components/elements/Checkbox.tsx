"use client"

import { useState, useEffect, ChangeEventHandler } from "react";

interface Param {
 label: string,
 name: string,
 type: string,
 value: string
 onChange : ChangeEventHandler<HTMLInputElement>,
 defaultChecked: boolean;
}

const Checkbox = ({ label, name, type, onChange, defaultChecked, value}: Param) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);


  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type={type}  checked={isChecked} onChange={handleCheckboxChange} name={name} value={value} />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;