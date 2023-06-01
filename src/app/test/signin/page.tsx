"use client"

import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../../context/AuthContext'


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser } = UserAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}> 
        <h1>Welcome Back</h1>
        <label htmlFor="signin-email">Email</label>
        <input 
          id="signin-email"
          type="text"
          placeholder="someone@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}/>

        <label htmlFor="signin-password">Password</label>
        <input 
          id="signin-password"
          type="text"
          placeholder=""
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}/>
         <button type="submit">Sign In</button>
      </form>
      <p>
        New? <Link href='test/signup'>Sign Up</Link>
     </p>
    </div>
  )
}