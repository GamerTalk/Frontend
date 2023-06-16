"use client"

import Head from "next/head" // for title
import Link from "next/link" // link
import styles from "./Header.module.css"
import { UserAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Header() { 

  const { user, logOut, userEmail} = UserAuth();
  const router = useRouter();
  const pathName = usePathname();
  // checking current endpoint has id or something 
  const messagePath = /^\/messages\/\w+$/;
  // if current endpoint is message page, header will be changed for messagePage
  const isMessagesPage = messagePath.test(pathName);
  
  const handleLogOut = async() => {
    try {
      await logOut();
      router.push('/')
    } catch (err) {
      console.error(err);
    }
  };
 

  return (
    <>
    {isMessagesPage ? (
        <div className={styles.messageHeader}>
          <div>
            <Link href={"/messages/"}>
            <button>Back</button>
            </Link>
          </div>
          <div className={styles.userInfoForMessage}>
            <div>
            <img src="../../../favicon.ico" alt="userImage" id={styles.image} />
            </div>
            <div>
              <p>User Name</p>
            </div>
          </div>
        </div>
        
      ) :
    <div>
      <Head>
        <title>GamerTalk</title>
      </Head>
      <header className={styles.headerContainer}>
      {/* link tag to home "/" */}
        <div className={styles.headerTitleContainer}>
         <Link href="/home">
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
      }
    </>
    )
} 
