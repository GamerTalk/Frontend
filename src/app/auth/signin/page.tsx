import Link from "next/link"
import Auth from "../../components/layouts/Auth"

export default function Sigin() {
  return ( 
    <>
      <Auth isSignIn={true}/>
      <p>Forgot your password? <Link href="/auth/forgot-password">Click here!</Link></p>
    </>
  )
}
  