"use client"
import { UserAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const { resetPasswordEmail } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    try {
      resetPasswordEmail(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send reset request</button>
      </form>
    </>
  );
}
