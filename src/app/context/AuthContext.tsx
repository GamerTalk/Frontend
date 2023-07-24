"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { User as userInfo } from "../global.t";
import { User as firebaseAuthUser } from "firebase/auth";

interface AuthContextProps {
  createUser: (email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  resetPasswordEmail: (email: string) => Promise<any>;
  logOut: () => Promise<any>;
  user: firebaseAuthUser | null;
  userEmail: string | null;
  uid: string | null;
  userInfo: userInfo | null;
  retrieve: (user: firebaseAuthUser) => Promise<void>;
  updateUserInfo: (userData: userInfo) => void;
  resetPassword: (oldPassword: string | '', newPassword: string) => Promise<any>;
}

const UserContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebaseAuthUser | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');;
  const [uid, setUid] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);

  const createUser = async (email: string, password: string) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCred;
  };

  const updateUserInfo = (userData: userInfo) => {
    setUserInfo(userData);
  };
  const loginUser = async (email: string, password: string) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    return userCred;
  };

  const logOut = () => {
    setUser(null);
    setUserInfo(null);
    setUserEmail('');
    return signOut(auth);
  };

  const retrieve = async (user: firebaseAuthUser | null) => {
    if (user) {
      const config = {
        method: "GET",
        headers: {
          uid: uid,
        },
      };
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/user-info/";
      const userData: userInfo = await axios
        .get(url, config)
        .then((result) => result.data);
      return setUserInfo(userData);
    }
  };

  const resetPasswordEmail = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  }

  const resetPasswordCred = async (oldPassword: string | '', newPassword: string, user: firebaseAuthUser | null) => {
    try {
      if (!user) {
        throw new Error('User not found. Please log in again.');
      }
  
      // Create the credential using the provided email and old password
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);
  
      // Reauthenticate the user with the provided credentials
      await reauthenticateWithCredential(user, credential);
  
      // Update the password with the new password
      await updatePassword(user, newPassword);
  
      return 'Password updated successfully.';
    } catch (error) {
      throw new Error('Password update failed. Please try again.');
    }
  };
  
  const resetPassword = async (oldPassword: string | '', newPassword: string) => {
    return resetPasswordCred(oldPassword, newPassword, user);
  };
  


  useEffect(() => {
    const authenticatedUser = onAuthStateChanged(
      auth,
      (currentUser: firebaseAuthUser | null) => {
        setUser(currentUser);
        setUserEmail(currentUser?.email || '');
        setUid(currentUser?.uid || null);
      }
    );
    return authenticatedUser;
  }, []);

  useEffect(() => {
    retrieve(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        loginUser,
        logOut,
        user,
        userEmail,
        uid,
        userInfo,
        retrieve,
        updateUserInfo,
        resetPasswordEmail,
        resetPassword
      }}
    >
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
