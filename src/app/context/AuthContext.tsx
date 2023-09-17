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
  deleteUser,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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
  userDeletion: () => Promise<any>;
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
 // const retrieve = useCallback(async (user: firebaseAuthUser | null) => {
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
  //}, [uid]);
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

  const userDeletion = async () => {
    const currentAuth = getAuth();
    const user: User | null = currentAuth.currentUser;


    console.log(user)
    if (!user || !user.email) {
      // There is no authenticated user, handle this case accordingly
      return "How did you hit this endpoint";
    }

    try {

      // const credentials = EmailAuthProvider.credential(
      //   user.email,
      //   "user-password"
      // );
      // await reauthenticateWithCredential(user, credentials);
      
      const password = prompt("Please enter your password:");
      if(password) {
        const credential = EmailAuthProvider.credential(user.email, password);
  
        const userUid = currentAuth.currentUser?.uid;
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/delete-user/";
        const payload = {
          uid: userUid,
          secretCode: process.env.NEXT_PUBLIC_SECRET_CODE
        };
        const config = {
          method: "DELETE",
          data: payload,
        };
  
        await axios.delete(url, config)
        await deleteUser(user);
        
      } else {
        alert("You must re-enter your password to delete the account.")
      }
      // User deleted.
    } catch (error) {
      // An error occurred
      console.error(error);
    }
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
 // }, [user, retrieve]);


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
        resetPassword,
        userDeletion,
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
