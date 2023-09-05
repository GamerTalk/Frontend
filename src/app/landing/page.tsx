"use client"

import React, { useEffect, useState } from 'react';
import styles from './landing.module.css';
import Auth from "../components/layouts/Auth"
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';


export default function Landing() {
  const {uid, userInfo} = UserAuth()
  const [flag, setFlag] = useState(false)

  const renderCircleElements = () => {
    const circleElements = [];

    for (let i = 1; i <= 10; i++) {
      const animationDelay = i % 2 === 0 ? `${i * 2}s` : `${i}s`;
      const animationDuration = i % 2 === 0 ? `${i * 6}s` : `${i * 3}s`;

      const circleStyle = {
        animationDelay,
        animationDuration,
      };

      circleElements.push(<li key={i} style={circleStyle}></li>);
    }

    return circleElements;
  };

  useEffect(() => {
    async function wakeUp() {
      // wake up the backend on render
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/")
    }

    wakeUp()
  }, [])

  return (
    <div className={styles.area}>
      <div className={styles.circles}>
        <ul>{renderCircleElements()}</ul>
      </div>
      <div className={styles.context}>
        <div className={styles.box}>
          <Image
            className={styles.image}
            src="/GamerTalkLogotransparent.png"
            alt="user-photo"
            height={250}
            width={350}
          />
        </div>
        <Link href="/auth/signin">
          {" "}
          <button className={styles.signin}> Sign In </button>{" "}
        </Link>
        <br />
        <Link className={styles.signup} href="/auth/signup">
          Not a member? Sign Up!
        </Link>
      </div>
      <p className={styles.copyright}>© 2023 GamerTalk</p>
    </div>
  );
}