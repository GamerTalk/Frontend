'use client'

import React, { useEffect } from "react";
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {

  const {uid} = UserAuth()
  const router = useRouter()

  useEffect(() => {
    if (!uid) {
      const timeout = setTimeout(() => {
        router.push('/landing');
      }, 1000); // Delay of 3 seconds before redirecting

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [uid]);

  if (uid) {
    return (
      <>
      <div>home</div>
      </>
    );
  }

  return null;
}
