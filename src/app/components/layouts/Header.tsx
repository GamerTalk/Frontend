"use client"

import Head from "next/head" // for title
import Link from "next/link" // link
import styles from "./Header.module.css"
import { UserAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation';

export default function Header() { 

  const { user, logOut, userEmail} = UserAuth();
  const router = useRouter();

  const handleLogOut = async() => {
    try {
      await logOut();
      router.push('/')
    } catch (err) {
      console.error(err);
    }
  };
 

  return (
      <div>
        <Head>
          <title>GamerTalk</title>
        </Head>
        <header className={styles.headerContainer}>
        {/* link tag to home "/" */}
          <div className={styles.headerTitleContainer}>
           <Link href="/">
            <p id={styles.headerName}> GamerTalk </p>
          </Link>
          </div>
        <div className={styles.userInfo}>
          <div className={styles.imageContainer}>
            <img id={styles.image} src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" alt="user-photo" />
          </div>

          <div className="username">
      { userEmail ? (
        <Link href="" onClick={handleLogOut}>Log Out</Link>
      ) : <Link href="/auth/signin">Log In</Link> }
    </div>
         
        </div>
        </header>
      </div>
    )
} 
