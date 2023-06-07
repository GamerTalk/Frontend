"use client"

import { useState, useEffect, ChangeEventHandler } from "react";

interface Param {
 label: string,
 name: string,
 onChange : ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({ label, name, onChange }: Param) => {
  const [isChecked, setIsChecked] = useState(false);

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