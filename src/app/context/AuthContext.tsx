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
}

const UserContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

const [user, setUser] = useState<firebaseAuthUser | null>(null); 
const [userEmail, setUserEmail] = useState<null | string>(null);
const [uid, setUid] = useState<null | string>(null)

const [userInfo, setUserInfo] = useState<userInfo | null>(null);

const createUser = async (email: string, password: string) => {
const userCred = await createUserWithEmailAndPassword(auth, email, password);
console.log('USER-CRED', userCred);
return userCred;
};

const loginUser = async (email: string, password: string) => {
const userCred = await signInWithEmailAndPassword(auth, email, password);
console.log('USER-CRED', userCred);
return userCred;
};

const logOut = () => {
return signOut(auth);
};

const retrieve = async () => {
  if (user) {
    const config = {
      method: 'GET',
      headers: {
        'uid' : uid
      }
    }
    const url = "http://localhost:8000/api/user-info/"
    const userData: userInfo = await axios.get(url, config).then((result) => result.data)
    console.log(userData);
    
    return setUserInfo(userData)
  }
}

useEffect(() => {
const authenticatedUser = onAuthStateChanged(auth, (currentUser:firebaseAuthUser | null) => {
console.log('CURRENT-USER', currentUser);
setUser(currentUser);
setUserEmail(currentUser?.email || null);
setUid(currentUser?.uid || null)

});
return authenticatedUser;
}, []);


  useEffect(() => {
  retrieve()
}, [user])
  
  return (
<UserContext.Provider value={{ createUser, loginUser, logOut, user, userEmail, uid, userInfo }}>
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