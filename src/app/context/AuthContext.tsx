"use client"

import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
// Define your user object type here
}

interface AuthContextProps {
createUser: (email: string, password: string) => Promise<any>;
loginUser: (email: string, password: string) => Promise<any>;
logOut: () => Promise<any>;
user: User;
userEmail: string | null
uid: string | null
userInfo: object
}

const UserContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User>({});
const [userEmail, setUserEmail] = useState<null | string>(null);
const [uid, setUid] = useState<null | string>(null)
const [userInfo, setUserInfo] = useState<object>({})

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
    const userData : any  = await axios.get(url, config).then((result) => result.data)
    return setUserInfo(userData)
  }
}

useEffect(() => {
const authenticatedUser = onAuthStateChanged(auth, (currentUser) => {
console.log('CURRENT-USER', currentUser);
setUser(currentUser || {});
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