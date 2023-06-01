"use client"

import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
// Define your user object type here
}

interface AuthContextProps {
createUser: (email: string, password: string) => Promise<any>;
loginUser: (email: string, password: string) => Promise<any>;
logOut: () => Promise<any>;
user: User;
userEmail: string | null
}

const UserContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User>({});
const [userEmail, setUserEmail] = useState<null | string>(null);

const createUser = async (email: string, password: string) => {
const userCred = await createUserWithEmailAndPassword(auth, email, password);
console.log(userCred);
return userCred;
};

const loginUser = async (email: string, password: string) => {
const userCred = await signInWithEmailAndPassword(auth, email, password);
console.log(userCred);
return userCred;
};

const logOut = () => {
return signOut(auth);
};

useEffect(() => {
const authenticatedUser = onAuthStateChanged(auth, (currentUser) => {
console.log(currentUser);
setUser(currentUser || {});
setUserEmail(currentUser?.email || null);
});
return authenticatedUser;
}, []);

return (
<UserContext.Provider value={{ createUser, loginUser, logOut, user, userEmail }}>
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