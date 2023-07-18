"use client"

import React from 'react';
import styles from './password.module.css';

// Define the type/interface for the "Param" prop
interface Param {

}

// Define the Reset component using React.FC (functional component)
const Reset: React.FC<Param> = ({  }) => {
  return (
    <>
      <form>
      <h1>Reset Password</h1>
      <p>Current Password:</p>
      <input type="text"/>
      <p>New Password</p>
      <input type="text"/>
      <div>
        <button>Submit</button>
      </div>
      </form>
      
    </>
  );
};

export default Reset;

