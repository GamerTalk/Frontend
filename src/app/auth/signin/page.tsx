import Link from "next/link"
import Auth from "../../components/layouts/Auth"
import styles from './signin.module.css'

export default function Sigin() {
  return ( 
    <>
      <Auth isSignIn={true}/>
      <p>Forgot your password? <Link href="/auth/forgot-password"><span className={styles.click}>Click here!</span></Link></p>
    </>
  )
}
  