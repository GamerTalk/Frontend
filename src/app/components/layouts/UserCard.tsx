"use client"

import styles from "./UserCard.module.css";
import {data, Person} from "../../test/user"
import { useEffect, useState } from "react";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox, faSteam } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

const UserCard = () => {   
  const [userData, setUserData] = useState<Person[]>([]);

  interface Systems { 
    [key: string]: IconDefinition;
  }
  
  // test data 
  const userInfoFetch = async () => { 
    setTimeout(() => {
      setUserData(data);
    }, 2000)
  }

  useEffect(() => { 
    userInfoFetch();
  },[]);

  const systems:Systems = {
    PC: faSteam,
    Xbox: faXbox,
    PlayStation: faPlaystation,
    Switch: faGamepad
  }
  
  return (
    <>
      {
      userData.map((user, index) => { 
        return (
        <div className={styles.userCard} onClick={() => console.log("hello")} key={index}>
        <div className={styles.userInfo}>
          <div className={styles.userImg}>
            <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.image} />
          </div>
          <div className={styles.userAbout}>
            <div className={styles.text}>
                <p>{user.name}</p>
            </div>
              <div className={styles.text}>
                <p>speaks:</p>
                {user.fluent.map((language,index) => { 
                  return <p key={index}>{language}</p>;
                 })}
            </div>
            <div className={styles.text}>
                <div>
                    {user.learning.map((learn, index) => {   
                      return <p key={index}>{learn.language} : level {learn.level}</p>
                     }
                  )}
              </div>
            </div>
          </div>

          <div className={styles.systems}>
            <div className={styles.gamesWrapper}>
                {user.systems.map((system,index) => { 
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