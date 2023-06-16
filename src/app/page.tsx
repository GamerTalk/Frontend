'use client'

import React, { useEffect, useState } from "react";
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import axios from "axios";

export default function Open() {
const {uid} = UserAuth()
const router = useRouter()

const [timer, setTimer] = useState(false)

useEffect(() => {
  setTimeout(() => {
    setTimer(true);
  }, 1000);
}, []);

useEffect(() => {
  const redirect = () => {
    if (uid) {
      router.push('./home');
    } else {
      router.push('./landing');
    }
  };

  if (timer) {
    redirect();
  }
}, [timer, uid]);

return null; // Render a blank screen
}
