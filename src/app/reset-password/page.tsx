"use client"

import React, { useState } from 'react';
import styles from './reset.module.css'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { UserAuth } from "../context/AuthContext";


const Reset: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {resetPassword} = UserAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const successMessage = await resetPassword(oldPassword, newPassword);

      // Show a success message
      setSuccessMessage(successMessage);

      // Clear the form inputs after a successful password update
      setOldPassword('');
      setNewPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('The current password does not match');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <form onSubmit={handleResetPassword}>
        <h1>Reset Password</h1>
        <p>Current Password:</p>
        <input
          className="text-black"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <p>New Password:</p>
        <input
          className="text-black"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className="mb-5
    mt-5
    rounded-full
    text-base
    h-10
    w-28
    bg-buttonBackground
    text-white
    border-2
    border-white
    cursor-pointer"
          >
            Submit
          </button>
        </div>
        {successMessage && (
          <p className="text-successMessage">{successMessage}</p>
        )}
        {errorMessage && <p className="text-errorMessage">{errorMessage}</p>}
      </form>
    </>
  );
};

export default Reset;
