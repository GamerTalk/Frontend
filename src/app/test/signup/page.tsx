"use client"

import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserAuth } from '../../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {createUser} = UserAuth();
  const router = useRouter()

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await createUser(email,password);
      router.push('/home')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSignUp}> 
        <h1>Join Us!</h1>
        <label htmlFor="signup-email">Email</label>
        <input 
          id="signup-email"
          type="text"
          placeholder="someone@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}/>

        <label htmlFor="signup-password">Password</label>
        <input 
          id="signup-password"
          type="text"
          placeholder=""
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}/>
         <button type="submit">Sign Up</button>
      </form>
      <p>
          Already have an account? <Link href='/'>Sign In</Link>
      </p>
    </div>
  )
}


