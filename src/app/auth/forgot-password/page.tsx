import { UserAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const { resetPasswordEmail } = UserAuth();

  const handleSubmit = () => {
    console.log(email);
    resetPasswordEmail(email);
  };

  return (
    <>
      <form action="">
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
