import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut
       } 
from "firebase/auth";

import { auth } from "../firebase/firebase"
import { createContext, useContext, useState, useEffect} from "react";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({});


  const createUser = async (email, password) => {
    const userCred = await(createUserWithEmailAndPassword(auth, email, password))
    console.log(userCred)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //this all goes in the server
  const loginUser = async (email, password) =>  {
    const userCred = await(signInWithEmailAndPassword(auth, email, password))
    console.log(userCred)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const authenticatedUser = onAuthStateChanged(auth, 
      (currentUser) => {
        console.log(currentUser)
        setUser(currentUser);
    })
    return authenticatedUser;
  },[]);

  return <UserContext.Provider value = {
    {createUser, 
    loginUser, 
    user, 
    logOut
    }}>
    {children}
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}