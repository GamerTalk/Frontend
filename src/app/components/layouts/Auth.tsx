"use client"
import { useState , FC} from "react"
import styles from "./Auth.module.css"
import Link from "next/link"
import Button from "../elements/SubmitBtn"

// for props
 interface Props {
  isSignIn: boolean
}

const Auth = ({isSignIn}: Props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handling submit email and password
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form
    console.log(email, password);
  };

  return (
    
    <div className={styles.authContainer}>

      {isSignIn ? (
        <p className={styles.title}>Hello Welcome Back!</p>
         ) : (
        <p className={styles.title}>Hello Welcome! We wait your sign up</p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.emailContainer}>    
          <label htmlFor="email" className={styles.labels}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.passwordContainer}>     
        <label htmlFor="password" className="labels">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          id="password"  
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        
        {isSignIn ? (
          <>
            <Button word="Sign In"/>
          </>
          ) : (
            <>
              <Button word="Sign In"/>
              <Link href="/auth/signin">
               <p id={styles.toSignIn}>Alredy a user? Sign-in</p>
              </Link>
           </>      
        )
      }
      </form>
    </div>
  );
}

export default Auth