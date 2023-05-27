import Head from "next/head" // for title
import Link from "next/link" // link
import styles from "./Header.module.css"

export default function Header() { 
  return (
      <div>
        <Head>
          <title>Japane Finace</title>
        </Head>
        <header className={styles.headerContainer}>
        {/* link tag to home "/" */}
          <div className={styles.headerTitleContainer}>
           <Link href="/">
            <p id={styles.headerName}>Japan <br />Finance</p>
          </Link>
          </div>
         <div className={styles.imageContainer}>
          <img id={styles.image} src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" alt="user-photo" />
          </div>
        </header>
      </div>
    )
} 