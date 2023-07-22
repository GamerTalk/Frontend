"use client"
import { UserAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import styles from './forgot.module.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const { resetPasswordEmail } = UserAuth();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPasswordEmail(email);
      setErrorMessage('');
      setSuccessMessage('The reset email has been send.')
    } catch (error) {
      setErrorMessage('The email has not been recongized. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>E-Mail Address:</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div><button type="submit" className={styles.reset}>Send reset request</button></div>
      </form>
    </>
  );
}
