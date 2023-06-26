"use client";
import styles from "./UserCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaystation,
  faXbox,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { User, Systems } from "./../../global.t";
import Upper from "@/app/utils/Upper";
import Scale from "../elements/Scale";

interface Props {
  user: User;
  key: number;
  setSingleUser: Function;
  setShowSingleUser: Function;
}

interface LevelLookup {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

// const UserCard = ({ users }: usersProps) => {
const UserCard = (props: Props) => {
  const { user, key, setSingleUser, setShowSingleUser } = props;

  const systems: Systems = {
    pc: faSteam,
    xbox: faXbox,
    playstation: faPlaystation,
    switch: faGamepad,
  };

  const levelLookup: LevelLookup = {
    1: "Beginner",
    2: "Elementary",
    3: "Intermediate",
    4: "Advanced",
    5: "Proficient",
  };

  
  return (
    <>
      <div
        className={styles.userCard}
        onClick={() => {
          console.log(user.uid);
          setSingleUser(user);
          setShowSingleUser(true);
        }}
        key={key}
      >
        <div className={styles.userInfo}>
          <div className={styles.userImg}>
            <img
              src={
                user.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              id={styles.image}
            />
          </div>
          <div className={styles.userAbout}>
            <div className={styles.text}>
              <p className={styles.userName}>{user.username}</p>
            </div>
            <div className={styles.text}>  
              <p className={styles.subTitle}>Speaks: </p>
              {user.languages.fluent.map((language, index) => {
                return (
                  <p className={styles.languageLine} key={index}>
                    {Upper(language)}
                  </p>
                );
              })}
            </div>
            <div className={styles.text}>
              <div>
                <p className={styles.subTitle}>Learning:</p>
                {user.languages.learning.map((learn, index) => {
                  return (
                    <>
                      <div className={styles.learningLaguagesContainer} key={index}>
                        <div className={styles.languageWraper}>
                      <p className={styles.languageLine} >
                      {`${Upper(learn.language)} :`} 
                      </p>
                      </div>
                      <div className={styles.scaleWraper}>
                         <Scale level={learn.level}/>
                      </div>
                    </div>
                    </>
                  );
                })}
              </div>
            </div>
          <div className={styles.systems}>
            <div className={styles.gamesWrapper}>
              {user.user_systems.map((system, index) => {
                return (
                  <div className={styles.game} key={index}>
                    <FontAwesomeIcon
                      icon={systems[system]}
                      className={styles.game}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserCard;
