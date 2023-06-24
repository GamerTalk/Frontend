"use client"

import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User as userInfo } from "../global.t";
import { User as firebaseAuthUser } from "firebase/auth";

interface AuthContextProps {
createUser: (email: string, password: string) => Promise<any>;
loginUser: (email: string, password: string) => Promise<any>;
logOut: () => Promise<any>;
user: firebaseAuthUser | null;
userEmail: string | null
uid: string | null
userInfo: userInfo | null
retrieve: (user: firebaseAuthUser) => Promise<void>;
updateUserInfo: (userData: userInfo) => void;
}

const UserContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

const [user, setUser] = useState<firebaseAuthUser | null>(null); 
const [userEmail, setUserEmail] = useState<null | string>(null);
const [uid, setUid] = useState<null | string>(null)

const [userInfo, setUserInfo] = useState<userInfo | null>(null);

const createUser = async (email: string, password: string) => {
const userCred = await createUserWithEmailAndPassword(auth, email, password);

return userCred;
};

  const updateUserInfo = (userData: userInfo) => { 
    setUserInfo(userData)
  }
const loginUser = async (email: string, password: string) => {
const userCred = await signInWithEmailAndPassword(auth, email, password);

return userCred;
};

const logOut = () => {
  setUser(null);
  return signOut(auth);
};

const retrieve = async (user:firebaseAuthUser | null) => {
  if (user) {
    const config = {
      method: 'GET',
      headers: {
        'uid' : uid
      }
    }
    const url = (process.env.NEXT_PUBLIC_API_URL + "/api/user-info/");
    const userData : userInfo  = await axios.get(url, config).then((result) => result.data)
    return setUserInfo(userData)
  }
}

useEffect(() => {
const authenticatedUser = onAuthStateChanged(auth, (currentUser:firebaseAuthUser | null) => {
setUser(currentUser);
setUserEmail(currentUser?.email || null);
setUid(currentUser?.uid || null)

});
return authenticatedUser;
}, []);


  useEffect(() => {
    retrieve(user)
  }, [user])
  
  return (
<UserContext.Provider value={{ createUser, loginUser, logOut, user, userEmail, uid, userInfo, retrieve,updateUserInfo}}>
{children}
</UserContext.Provider>
);
};

export const UserAuth = (): AuthContextProps => {
const context = useContext(UserContext);
if (!context) {
throw new Error("UserAuth must be used within an AuthContextProvider");
}
return context;
};