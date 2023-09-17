"use client";

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../entry-form/UserInfo.module.css";
import { UserAuth } from "../context/AuthContext";
import Checkbox from "../components/elements/Checkbox";
import LearningCheckbox from "../components/elements/Learning-Checkbox";
import langCall from "../utils/langCheckFunc";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Reset from "../reset-password/page";
import categories from "../data/data";
import Image from "next/image";

export default function Profile() {
  const { uid, updateUserInfo, userDeletion } = UserAuth();

  const config = {
    method: "GET",
    headers: {
      uid: uid,
    },
  };
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user-info/";
  const [profile, setProfile] = useState<any>();
  const [region, setRegion] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [system, setSystem] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>(
    profile ? profile.about_me : ""
  );
  const [aboutMeLength, setAboutMeLength] = useState<number>(0)
  const [currPlay, setCurrPlay] = useState<string>(
    profile ? profile.currently_playing : ""
  );
  const [currPlayLength, setCurrPlayLength] = useState<number>(0)
  const [profileURL, setProfileURL] = useState<string>(
    profile ? profile.profile_picture_url : ""
  );
  // for setting up user profile image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        if (uid) {
          const userData: any = await axios
            .get(url, config)
            .then((result) => result.data);
          if (userData.languages !== null) {
            setProfile(userData);
            //console.log(userData);
            setProfileURL(userData.userProfileURL);
            setRegion(userData.user_region);
            setSystem(userData.user_systems);
            setLanguage(userData.languages.fluent);
            setGenre(userData.user_genre);
            setLearning(userData.languages.learning);
            setAboutMe(userData.about_me);
            setAboutMeLength(userData.about_me.length)
            setCurrPlay(userData.currently_playing);
            setCurrPlayLength(userData.currently_playing.length)
          } else {
            //console.log("fail");
            setProfile({});
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [uid]);
  //}, [uid, config, url]);

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const userRef = doc(db, "users", uid!);
    const userChatRef = doc(db, "userChats", uid!);
    let newProfileURL = profileURL || "";

    if (selectedFile) {
      // upload new image to firebase storage
      // path /user/uid/image
      const storageRef = ref(storage, `/images/${uid}/${selectedFile.name}`);
      const uploadedSnapshot = await uploadBytesResumable(
        storageRef,
        selectedFile
      );
      const downLoadURL: string = await getDownloadURL(uploadedSnapshot.ref);
      setProfileURL(downLoadURL);
      newProfileURL = downLoadURL;
      // update user info in firebase firestore
      try {
        const updateUserData = {
          // uid: uid,
          // userName: profile?.username,
          [`${uid}.profileURL`]: newProfileURL,
        };
        updateDoc(doc(db, "users", uid!), updateUserData);

        const result = await getDoc(userChatRef);
        if (result.exists()) {
          let chatRoomIds = Object.keys(result.data() as {});
          const userChats: object[] = Object.values(result.data() as {});
          // update each users /userchats/userinfo/profileurl in firebase firestore when current user changes user profile
          if (Object.keys(userChats).length !== 0) {
            userChats.forEach(async (element: any, key: number) => {
              //console.log(element.userInfo.uid);
              await updateDoc(doc(db, "userChats", element.userInfo.uid), {
                [`${chatRoomIds[key]}.userInfo.userProfileURL`]: newProfileURL,
              });
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    sendFormData(newProfileURL);
  };

  const sendFormData = (profileImagURL: string = profileURL) => {
    const payload = {
      uid,
      username: profile.username,
      region,
      about_me: aboutMe,
      fluent: language,
      learning,
      date_of_birth: profile.date_of_birth,
      systems: system,
      genre,
      currently_playing: currPlay,
      profile_picture_url: profileImagURL,
    };

    const url = process.env.NEXT_PUBLIC_API_URL + "/api/edit-user/";

    axios
      .patch(url, payload)
      .then((response) => {
        updateUserInfo(response.data);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSystem = (event: { target: { name: string } }) => {
    const { name } = event.target;
    if (system.includes(name)) {
      // If system is already selected, remove it from the array
      setSystem((prevSystem) => prevSystem.filter((sys) => sys !== name));
    } else {
      // If system is not selected, add it to the array
      setSystem((prevSystem) => [...prevSystem, name]);
    }
  };

  const handleRegion = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRegion(value);
  };

  const handleLanguage = (event: {
    target: { name: string; value: string };
  }) => {
    const { name } = event.target;
    if (language.includes(name)) {
      // If language is already selected, remove it from the array
      setLanguage((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== name)
      );
    } else {
      // If language is not selected, add it to the array
      setLanguage((prevLanguages) => [...prevLanguages, name]);
    }
  };

  const handleLearning = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const newObj = { language: name, level: Number(value) };

    const languageExists = learning.some(
      (learn: any) => learn.language === name
    );
    if (languageExists) {
      // If language is already selected, update its level only
      setLearning((prevLearning) =>
        prevLearning.map((learn: any) =>
          learn.language === name ? { ...learn, level: value } : learn
        )
      );
    } else {
      // If language is not selected, add it to the array
      setLearning((prevLearning: any) => [...prevLearning, newObj]);
    }
  };

  const handleGenre = (event: { target: { name: string } }) => {
    const { name } = event.target;
    if (genre.includes(name)) {
      // If genre is already selected, remove it from the array
      setGenre((prevGenre) => prevGenre.filter((gen) => gen !== name));
    } else {
      // If genre is not selected, add it to the array
      setGenre((prevGenre) => [...prevGenre, name]);
    }
  };

  const handleAboutMe = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setAboutMe(value);
    setAboutMeLength(value.length)
  };

  const handleCurrPlay = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setCurrPlay(value);
    setCurrPlayLength(value.length)
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDeletion = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (confirm("Are you sure you want to delete your account?")) {
      if (
        confirm(
          "Warning: this cannot be undone. Are you sure you want to delete your account?"
        )
      ) {
        userDeletion();
        router.push("/");
      }
    }
  };

  return (
    <form style={{ paddingBottom: "100px" }} onSubmit={handleFormSubmit}>
      <h1>Profile</h1>
      {profile ? (
        <>
          <div className={styles.userImg}>
            <img
              src={
                profile.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image'
              id={styles.image}
            />
            {/* <Image
              src={
                profile.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image'
              id={styles.image}
              height={70}
              width={70}
            /> */}
          </div>
          <div>
            <label htmlFor={styles.userUploadImg}>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                id={styles.userUploadImg}
              />
            </label>
          </div>
          <div>
            <Link href="reset-password">
              <button type="button" className={styles.resetButton}>
                Reset Password
              </button>
            </Link>
          </div>

          <p className={styles.heading}>Username:</p>
          <p>{profile.username}</p>

          <p className={styles.heading}>Region:</p>
          <div className={styles.language}>
            {categories.regions.map((regionOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="radio"
                    label={regionOption}
                    name="region"
                    value={regionOption.toLocaleLowerCase()}
                    onChange={handleRegion}
                    defaultChecked={region === regionOption.toLocaleLowerCase()
                    }
                  />
                </div>
              )
            })}
          </div>
          
          <p className={styles.heading}>What language(s) are you fluent in?:</p>
          <p className={styles.subheading}>Check all that apply</p>
          <div className={styles.language}>
          {categories.languages.map((languageOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="Checkbox"
                    label={languageOption}
                    name={languageOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleLanguage}
                    defaultChecked={language.includes(languageOption.toLocaleLowerCase())}
                  />
                </div>
              )
            })}
            
          </div>

          <p className={styles.heading}>Date of Birth: </p>
          <p> {profile.date_of_birth}</p>

          <p className={styles.heading}>User Systems:</p>
          <div className={styles.language}>
          {categories.systems.map((systemOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="Checkbox"
                    label={systemOption}
                    name={systemOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleSystem}
                    defaultChecked={system.includes(systemOption.toLocaleLowerCase())}
                  />
                </div>
              )
            })}
            
          </div>

          <p id="learning" className={styles.heading}>
            What language(s) do you want to learn and what is your level?
          </p>
          <p className={styles.learningSubheading}>
            <p>
              {" "}
              <span className={styles.number}>1</span>: Beginner
              <span className={styles.number}> 2</span>: Elementary{" "}
            </p>
            <p>
              {" "}
              <span className={styles.number}>3</span>: Intermediate
              <span className={styles.number}> 4</span>: Advanced
              <span className={styles.number}> 5</span>: Proficent
            </p>{" "}
          </p>
          <p className={styles.learningSubheading}>
            For a more detailed explanation{" "}
            <a href="#levels-explain" className={styles.links}>
              click here
            </a>{" "}
          </p>
          <div>
            <div className={styles.learningHeadings}>
              <div>Language</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            {categories.languages.map((languageOption, key) => { 
              const languageOptionLowerCase = languageOption.toLocaleLowerCase();
              return (
                <div key={key}>
                  <LearningCheckbox
                    label={languageOption}
                    name={languageOptionLowerCase}
                    onChange={handleLearning}
                    defaultChecked1={langCall(languageOptionLowerCase, 1, learning)}
                    defaultChecked2={langCall(languageOptionLowerCase, 2, learning)}
                    defaultChecked3={langCall(languageOptionLowerCase, 3, learning)}
                    defaultChecked4={langCall(languageOptionLowerCase, 4, learning)}
                    defaultChecked5={langCall(languageOptionLowerCase, 5, learning)}
                  />
                </div>
              );
            })}
            
          </div>

          <p className={styles.heading}>Genre:</p>
          <div className={styles.language}>
          {categories.genres.map((genreOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="Checkbox"
                    label={genreOption}
                    name={genreOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleGenre}
                    defaultChecked={genre.includes(genreOption.toLocaleLowerCase())}
                  />
                </div>
              )
            })}
            
          </div>

          <p className={styles.heading}>About Me:</p>
          <textarea
            className={styles.textarea} 
            rows={5}
            cols={40}
            value={aboutMe}
            onChange={handleAboutMe}
            maxLength={500}
          />
          <p className={styles.length}>{aboutMeLength} / 500</p>

          <p className={styles.heading}>Currently Playing:</p>
          <textarea
            className={styles.textarea} 
            rows={5}
            cols={40}
            value={currPlay}
            onChange={handleCurrPlay}
            maxLength={500}
          />
          <p className={styles.length}>{currPlayLength} / 500</p>

          <div>
            <button className={styles.editButton} type="submit">
              Submit
            </button>
            <br />
            <button
              className={styles.deleteButton}
              type="button"
              onClick={handleDeletion}
            >
              Delete Account
            </button>

            <div className={styles.levelsbox}>
              <a id="levels-explain" href="#learning" className={styles.links}>
                Go back
              </a>
              <h1>Language Levels</h1>
              <h2 className={styles.candoHeadings}>Beginner</h2>
              <p className={styles.cando}>
                Can make introductions and can ask and answer simple questions.
              </p>
              <h2 className={styles.candoHeadings}>Elementary</h2>
              <p className={styles.cando}>
                Can converse common topics and in daily situations.
              </p>
              <h2 className={styles.candoHeadings}>Intermediate</h2>
              <p className={styles.cando}>
                Can interact with native speakers more fluently and
                spontaneously.
              </p>
              <h2 className={styles.candoHeadings}>Advanced</h2>
              <p className={styles.cando}>
                Can express yourself naturally, effortlessly recalling authentic
                expressions.
              </p>
              <h2 className={styles.candoHeadings}>Proficient</h2>
              <p className={styles.cando}>
                Can comfortably comphrehend most things heard and read.
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className={styles.loading}>Loading Profile...</p>
      )}
    </form>
  );
}
