"use client"
import { useState , FC} from "react"
import styles from "./Auth.module.css"
import Link from "next/link"
import SubmitButton from "../elements/SubmitBtn"
import { useRouter } from 'next/navigation';
import { UserAuth } from '../../context/AuthContext'
import AlertModal from "./AlertModal"

 interface Props {
  isSignIn: boolean
}

const Auth = ({isSignIn}: Props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { loginUser, createUser } = UserAuth();
  const router = useRouter();

  // handling alert modal
  const handleClose = () => setOpen(false);

  // handling submit email and password
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form
    try {
      await loginUser(email, password);
      router.push('/home');
    } catch (err) {
      setOpen(true);
      setAlertMessage('Incorrect Email or Password');
      console.error(err);
    }
    // console.log('EMAIL', email, 'PASSWORD', password);
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createUser(email,password);
      router.push('/entry-form')
    } catch (err) {
      setOpen(true);
      setAlertMessage('Invaild Email or Password \nThe Password needs to be at least 4 charcaters');
      console.error(err);
    }
  }

  return (
    
    <div className={styles.authContainer}>
      {open && (
          <AlertModal open={open} handleClose={handleClose} title="Validation Error"
          message={alertMessage}
        />
      )
      
      }
      {isSignIn ? (
        <p className={styles.title}>Welcome Back!</p>
         ) : (
        <p className={styles.title}>Do not have an account? Sign Up!</p>
      )}
      
      <form onSubmit={ isSignIn ? handleSubmit : handleSignUp}>

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
            <SubmitButton word="Sign In" />
              <Link href="/auth/signup">
               <p id={styles.toAuth}>Do not have an account? Sign-up here!</p>
              </Link>
          </>
          ) : (
            <>
              <SubmitButton word="Sign Up"/>
              <Link href="/auth/signin">
               <p id={styles.toAuth}>Already a user? Sign-in!</p>
              </Link>
           </>      
        )
      }
      </form>
    </div>
  );
}

export default Auth