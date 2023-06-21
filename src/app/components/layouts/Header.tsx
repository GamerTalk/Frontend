"use client"

import Head from "next/head" // for title
import Link from "next/link" // link
import styles from "./Header.module.css"
import { UserAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { MessagesContext } from "@/app/context/MessageContext"
import { useContext, useEffect, useState } from "react"

export default function Header() { 
  const { userName } = useContext(MessagesContext);
  const { user, logOut, userEmail, userInfo } = UserAuth();
  
  const [loadingImg, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const img = new Image();
    if (userInfo?.profile_picture_url) {
      img.src = userInfo.profile_picture_url;
      img.onload = () => { 
        setLoading(!loadingImg);
      }
      img.onerror = () => { 
        setLoading(!loadingImg);
      }
    }
  }, [userInfo?.profile_picture_url]);

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
  console.log(userInfo?.profile_picture_url);

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
              <p>{userName}</p>
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
        {/* skeleton will show up until profile url is being fetched */}
        {loadingImg ? (
         <div className={styles.imageContainer}>
            <div id={styles.skeletonImage} />
         </div>
          ) : (
          <div className={styles.imageContainer}>
            <img id={styles.image} src={userInfo?.profile_picture_url} alt="user-photo" />
          </div>
          )
        }

        <div className="username">
         { userEmail ? (
        <div className="username">
         { userEmail ? (
        <Link href="" onClick={handleLogOut}>Log Out</Link>
        ) : <Link href="/auth/signin">Log In</Link> }
         </div>
        ) : <Link href="/auth/signin">Log In</Link> }
         </div>
        </div>
      </header>
        </div>
      }
    </>
    )
} 
