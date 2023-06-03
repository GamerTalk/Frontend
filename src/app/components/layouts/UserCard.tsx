"use client"

import styles from "./UserCard.module.css";
import {data, Person} from "../../test/user"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation , faXbox, faSteam} from "@fortawesome/free-brands-svg-icons";
const UserCard = () => { 

  
  const [user, setUserData] = useState<Person[]>([]);

  // test data 
  const userInfoFetch = async () => { 
    setTimeout(() => {
      setUserData(data);
    }, 2000)
  }

  useEffect(() => { 
    userInfoFetch();
  },[]);

  return (
    <>
      <div className={styles.userCard} onClick={()=>console.log("押されたよ")}>

        <div className={styles.userInfo}>

          <div className={styles.userImg}>
            <img src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg" id={styles.image} />
          </div>
          
          <div className={styles.userAbout}>
            <div className={styles.text}>
                <p>Emma</p>
            </div>
            <div className={styles.text}>
                <p>Speaks:En</p>
            </div>
            <div className={styles.text}>
              <div>
                <p>Learning:JP Level1</p>
              </div>
              
            </div>
          </div>

          <div className={styles.systems}>
            <div className={styles.gamesWrapper}>
            <div className={styles.game}>
              <FontAwesomeIcon
                icon={faPlaystation}
                className={styles.game} 
                />
              </div>

              <div className={styles.game}>
              <FontAwesomeIcon
                icon={faPlaystation}
                className={styles.game} 
                />
              </div>
              <div className={styles.game}>
              <FontAwesomeIcon
                icon={faPlaystation}
                className={styles.game} 
                />
              </div>
              <div className={styles.game}>
              <FontAwesomeIcon
                icon={faPlaystation}
                className={styles.game} 
                />
              </div>
            </div>
          </div>

        </div>
       
      </div> 
    </>
  )
}

export default UserCard;