"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const { resetPasswordEmail } = UserAuth();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPasswordEmail(email);
      setErrorMessage("");
      setSuccessMessage("The reset email has been send.");
    } catch (error) {
      setErrorMessage("The email has not been recongized.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <form className="mt-5" action="" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>E-Mail Address:</p>
        <input
          type="email"
          value={email}
          className="text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className="my-5 rounded-full bg-buttonBackground w-40 h-10 border-2 border-white"
          >
            Send reset request
          </button>
        </div>
        {successMessage && (
          <p className="text-successMessage">{successMessage}</p>
        )}
        {errorMessage && <p className="text-errorMessage">{errorMessage}</p>}
      </form>
    </>
  );
}
