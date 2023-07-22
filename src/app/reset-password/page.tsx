"use client"

import React, { useState } from 'react';
import styles from './password.module.css';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { UserAuth } from "../context/AuthContext";


const Reset: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {user, userEmail} = UserAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        setErrorMessage('User not found. Please log in again.');
        return;
      }
      // Create the credential using the provided email and old password
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);

      // Reauthenticate the user with the provided credentials
      await reauthenticateWithCredential(user, credential);

      // Update the password with the new password
      await updatePassword(user, newPassword);

      // Show a success message
      setSuccessMessage('Password updated successfully.');

      // Clear the form inputs after a successful password update
      setOldPassword('');
      setNewPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Password update failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <form onSubmit={handleResetPassword}>
        <h1>Reset Password</h1>
        <p>Current Password:</p>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <p>New Password:</p>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div>
          <button type="submit" className={styles.submit}>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Reset;
