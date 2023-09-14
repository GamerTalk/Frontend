import React, {  useContext, } from "react";
import styles from "./SingleUserCard.module.css";
import { Systems } from "@/app/global.t";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import TitleCase from "@/app/utils/TitleCase";
import Upper from "@/app/utils/Upper";
import { User } from "@/app/global.t";
import { MessagesContext } from "@/app/context/MessageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faSteam, faXbox } from "@fortawesome/free-brands-svg-icons";
import Scale from "../elements/Scale";
import Image from "next/image";

interface LevelLookup {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export default function SingleUserCard(props: any) {
  const { uid } = UserAuth();
  const userObject: User = props.userObject
  //console.log("🐝", userObject)
  
  const levelLookup: LevelLookup = {
    1: "Beginner",
    2: "Elementary",
    3: "Intermediate",
    4: "Advanced",
    5: "Proficient",
  };

  const systems: Systems = {
    pc: faSteam,
    xbox: faXbox,
    playstation: faPlaystation,
    switch: faGamepad,
  };


  const { updateChatUserId, updateChatId, updateUserName, updateUserProfileURL } = useContext(MessagesContext);
  
  const router = useRouter();

  const handleGoToMessages = () => {
    if (uid) {
      // create combinedId for messging 
      const combinedId: string = uid > userObject.uid ? uid + userObject.uid : userObject.uid + uid;
      // set user info who user want to chat with
      updateChatUserId(userObject.uid);
      updateChatId(combinedId);
      updateUserName(userObject.username);
      updateUserProfileURL(userObject.profile_picture_url);
      // go to /messages/id
      router.push("/messages/message");
    }
  };

  return (
    <div>
      <h1 className={styles.username}> {userObject.username}</h1>
      {userObject.about_me ? (
        <>
        <div className={styles.first}>
          <div className={styles.userImg}>
          <img
              src={
                userObject.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image'
              id={styles.image}
            />
            {/* <Image
              src={
                userObject.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image'
              width={150}
              height={150}
              id={styles.image}
            /> */}
          </div>

          <div className={styles.speakAndLearn}>

          <p><span className={styles.langHeading}>Speaks:</span> 
          {userObject.languages.fluent.map((element: string, index: number) => (
            <p className={styles.langText} key={index}>{" " + Upper(element)}</p>
          ))}  </p>

          <div className={styles.learnContainer}> <span className={styles.langHeading}>Learning:</span>
          {userObject.languages.learning.map(
            (
              element: {
                level: number;
                language: string;
              },
              index: number
            ) => (
              <div className={styles.learningLanguageContainer} key={index}>
              <div className={styles.languageWraper}>
                <p key={index} className={styles.langText} >
                {`${Upper(element.language)} :`} 
                </p>
              </div>
                <div className={styles.scaleWraper}>
                  <Scale level={element.level}/>
                </div>
              </div>
            )
                )}
          </div>

          </div>

          </div>
        

          <p className={styles.heading}>
            Region <FontAwesomeIcon icon={faGlobe} />
          </p>
          <p className={styles.text}>{TitleCase(userObject.user_region)}</p>

          

          {/* <p className={styles.heading}>Date of Birth: </p>
          <p> {userObject.date_of_birth}</p> */}

         
            <p className={styles.heading}>User Systems</p>
            <div className={styles.systems}>
            {userObject.user_systems.map((system: string, index: number) => (
            <FontAwesomeIcon
            icon={systems[system]}
            className={styles.game}
            key={index}
            />
            ))}
          </div>

          <div className={styles.language}>
            <p className={styles.genreBox}><span className={styles.heading}>Genres</span>
            {userObject.user_genre.map((genre: string, index: number) => (
              <p className={styles.genre} key={index}>{Upper(genre)}</p>
            ))} </p>

            <div className={styles.sections}>
              <p className={styles.heading}>About Me</p>
              <p className={styles.text}>{userObject.about_me}</p>
            </div>

            <div className={styles.sections}>
            <p className={styles.heading}>
              Currently Playing <FontAwesomeIcon icon={faGamepad} />
            </p>
            <p className={styles.text}>{userObject.currently_playing}</p>
            </div>

            <div className={styles.buttonBox}><button className={styles.button} onClick={handleGoToMessages}>Message</button> </div>

          </div>
          
        </>
      ) : (
        "Loading Profile..."
      )}
    </div>
  );
}
