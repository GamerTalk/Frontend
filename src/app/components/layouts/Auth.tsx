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
        <p className={styles.title}>Hello! We can not wait your sign up!</p>
      )}
      
      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>    
    
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>  
         
        <input
          type="password"
          placeholder="Password"
          value={password}
          id="password"  
          className={styles.input}
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