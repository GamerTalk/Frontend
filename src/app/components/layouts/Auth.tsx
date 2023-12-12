"use client"
import { useState , FC} from "react"
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
    <div className="bg-white h-96 mx-auto w-[90%] sm:w-[50%] mt-10 border-2 border-black rounded-xl shadow-md font-sans">
      {open && (
        <AlertModal
          open={open}
          handleClose={handleClose}
          title="Validation Error"
          message={alertMessage}
        />
      )}
      {isSignIn ? (
        <p className="text-black mt-9 mb-0 text-large">Welcome Back!</p>
      ) : (
        <p className="text-black mt-9 mb-0 text-large">
          Do not have an account? Sign Up!
        </p>
      )}

      <form onSubmit={isSignIn ? handleSubmit : handleSignUp}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            id="password"
            className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isSignIn ? (
          <>
            <SubmitButton word="Sign In" />
            <Link href="/auth/signup">
              <p className="text-blue-600 mt-6">
                Do not have an account? Sign-up here!
              </p>
            </Link>
          </>
        ) : (
          <>
            <SubmitButton word="Sign Up" />
            <Link href="/auth/signin">
              <p className="text-blue-600 mt-6">Already a user? Sign-in!</p>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}

export default Auth