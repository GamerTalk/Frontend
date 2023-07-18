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
      <h1>Reset Password</h1>
    </>
  );
};

export default Reset;

