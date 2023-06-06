"use client"
import styles from "./UserCard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox, faSteam } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { User } from "./../../global.t";

const UserCard = () => {   

  const [userData, setUserData] = useState<User[]>([]);

  interface Systems { 
    [key: string]: IconDefinition;
  }
  
  const systems:Systems = {
    PC: faSteam,
    Xbox: faXbox,
    PlayStation: faPlaystation,
    Switch: faGamepad
  }

  const fecthUserInfo = async () => {
    try { 
      const res = await axios.get("http://127.0.0.1:8000/api/all-users/");
      const userAllData: User[] = res.data;
      console.log(userAllData);
      setUserData(userAllData);
    } catch (error) { 
      console.log(error);
    }
  }
  
  useEffect(() => { 
    fecthUserInfo();
  },[]);

  return (
    <>
      {
      userData.map((user, index) => { 
        return (
        <div className={styles.userCard} onClick={() => console.log(user.id)} key={index}>
        <div className={styles.userInfo}>
          <div className={styles.userImg}>
            <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.image} />
          </div>
          <div className={styles.userAbout}>
            <div className={styles.text}>
                <p>{user.username}</p>
            </div>
              <div className={styles.text}>
                <p>speaks:</p>
                {user.languages.fluent.map((language,index) => { 
                  return <p key={index}>{language}</p>;
                 })}
            </div>
            <div className={styles.text}>
                  <div>
                    <p>Learning:</p>
                    {user.languages.learning.map((learn, index) => {   
                      return <p key={index}>{learn.language} : level {learn.level}</p>
                     }
                  )}
              </div>
            </div>
              </div>
              
           <div className={styles.systems}>
            <div className={styles.gamesWrapper}>
                {user.user_systems.map((system,index) => { 
                  return (
                  <div className={styles.game} key={index}>
                    <FontAwesomeIcon
                    icon={systems[system]}
                  className={styles.game} 
                />
              </div>
                 )
              })}
            </div>
          </div> 
        </div>
        </div> 
        )
      })
    }
    </>
  )
}

export default UserCard;
