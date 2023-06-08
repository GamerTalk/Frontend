"use client"

import { useState, useEffect, ChangeEventHandler } from "react";

interface Param {
 label: string,
 name: string,
 onChange : ChangeEventHandler<HTMLInputElement>,
 defaultChecked: boolean;
}

const Checkbox = ({ label, name, onChange, defaultChecked }: Param) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);


  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox"  checked={isChecked} onChange={handleCheckboxChange} name={name} />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;