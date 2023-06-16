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

interface usersProps {
  users: User[];
}

// const UserCard = ({ users }: usersProps) => {
const UserCard = (props: any) => {
  const user: User = props.user;
  const key: number = props.key;
  const systems: Systems = {
    pc: faSteam,
    xbox: faXbox,
    playstation: faPlaystation,
    switch: faGamepad,
  };

  return (
    <>
      <div
        className={styles.userCard}
        onClick={() => console.log(user.uid)}
        key={key}
      >
        <div className={styles.userInfo}>
          <div className={styles.userImg}>
            <img
              src="https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg"
              id={styles.image}
            />
          </div>
          <div className={styles.userAbout}>
            <div className={styles.text}>
              <p>{user.username}</p>
            </div>
            <div className={styles.text}>
              <p>speaks:</p>
              {user.languages.fluent.map((language, index) => {
                return <p key={index}>{language}</p>;
              })}
            </div>
            <div className={styles.text}>
              <div>
                <p>Learning:</p>
                {user.languages.learning.map((learn, index) => {
                  return (
                    <p key={index}>
                      {learn.language} : level {learn.level}
                    </p>
                  );
                })}
              </div>
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
    </>
  );
};

export default UserCard;
