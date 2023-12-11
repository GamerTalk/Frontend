import { ChangeEventHandler, useState } from "react";

interface Param {
  front: string;
  back: string;
  name: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const DictCheckbox: React.FC<Param> = ({ front, back, onChange, name }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setIsChecked(event.target.checked);
    onChange(event); // Call the provided onChange event handler
  };

  return (
    <div className="flex border-3 border-gray-400 my-1">
      <input
        className="mx-auto h-4 w-2/12"
        type="checkbox"
        onChange={handleCheckboxChange}
        name={name}
        checked={isChecked}
      ></input>
      <div className="w-5/12 border-l-3 border-r-3 border-gray-400">
        <label>{front}</label>
      </div>
      <div className='w-5/12'>
        <label>{back}</label>
      </div>
    </div>
  );
};

export default DictCheckbox;
