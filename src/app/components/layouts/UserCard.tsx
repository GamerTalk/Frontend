"use client"

import styles from "./UserCard.module.css";
import {data, UserData} from "../../test/user"
import { useEffect, useState } from "react";

const UserCard = () => { 
  const [user, setUserData] = useState<UserData[]>([]);

  // test data 
  const userInfoFetch = async () => { 

    setTimeout(() => { 
      setUserData(data);
    })

  }

  useEffect(() => { 
    
  },[]);

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.userName}>
          <p>userName</p>
        </div>
        <div className={styles.userFluent}>
          <p>fluent</p>
        </div>
        <div className={styles.userLearning}>
          <p>userName</p>
        </div>
      </div>
    </>
  )
}

export default UserCard;