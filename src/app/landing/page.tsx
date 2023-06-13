"use client"

import React from 'react';
import styles from './landing.module.css';
import Auth from "../components/layouts/Auth"
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';


export default function Landing() {
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

  return (
    <div className={styles.area}>
      <div className={styles.circles}>
        <ul>{renderCircleElements()}</ul>
      </div>
      <div className={styles.context}>
        <div className={styles.box}>
        <h1 className={styles.title}>GamerTalk</h1>
          <h2 className={styles.subtitle}>Learn a Language Through Gaming</h2>
        </div>
        <Link href="/auth/signin"> <button className={styles.signin}> Sign In </button> </Link>
        <Link href="/auth/signup"> <p className={styles.signup}>Not a member? Sign Up!</p></Link>
      </div>
    </div>
  );
}