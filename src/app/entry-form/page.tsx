"use client";

import Checkbox from "../components/elements/Checkbox";
import LearningCheckbox from "../components/elements/Learning-Checkbox";
import styles from "./UserInfo.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default function UserInfo() {
  const { uid, user,updateUserInfo,retrieve} = UserAuth()
  const [username, setUsername] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [birthday, setBirthday] = useState("");
  const [system, setSystem] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>("");
  const [currPlay, setCurrPlay] = useState<string>("");

  // for setting up user profile image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  /*
      "uid": "delete me", // NOT LOWER CASE
#     "username": "GodSlayerXD", // NOT LOWERCASE
       region: 
#     "about_me": "I was born in a log cabin.", // NOT LOWERCASE
#     "fluent": ["english", "spanish"],
#     "learning": [{"language":"german", "level": 1}, {"language":"japanese", "level": 3}],
#     "date_of_birth": "1999-01-01",
#     "systems": ["playstation","PC"],
#     "genre": ["FPS", "survival"],
#     "currently_playing": "I am currently playing COD MW2, Fortnite, and some Ark Survival" // NOT LOWERCASE
  */
 

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // upload a user profile picutre to firebase
    if (selectedFile) {
      // uid + filename makes a path of profile img in firebase storage
      const storageRef = ref(storage, `/images/${uid}/${selectedFile.name}`);
      try {
        // upload
        const uploadedSnapshot = await uploadBytesResumable(
          storageRef,
          selectedFile
        );
        // url to access to firebase storage
        const downLoadURL: string = await getDownloadURL(uploadedSnapshot.ref);
        // send to data to
        sendFormData(downLoadURL);
       // console.log("upload is successed");
      } catch (error) {
        // error handling
        console.error("Upload error:", error);
      }
    } else {
      // user image as default
      const defaultPath = "/images/default/userdefault.png";
      const storageRef = ref(storage, defaultPath);
      try {
        const downloadURL = await getDownloadURL(storageRef);
        sendFormData(downloadURL);
        //console.log("default image upload is successed");
      } catch (error) {
        console.error("down load error", error);
      }
    }
  };

  const sendFormData = (profileImagURL: string) => {
   // console.log(profileImagURL);
    const payload = {
      uid,
      username,
      region,
      about_me: aboutMe,
      fluent: language,
      learning,
      date_of_birth: birthday,
      systems: system,
      genre,
      currently_playing: currPlay,
      profile_picture_url: profileImagURL,
    };

    //console.log(payload);

    // send a data to firestore
    setDoc(doc(db, "users", uid!), {
      uid: uid,
      userName: username,
      profileURL: profileImagURL,
    });

    const url = process.env.NEXT_PUBLIC_API_URL + "/api/new-user/";

    axios.post(url, payload)
      .then(response => {
        if (user) {
          retrieve(user);
        }
        router.push('/home')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handleRegion = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRegion(value.toLowerCase());
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

  const handleBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setBirthday(dateValue);
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
  };

  const handleCurrPlay = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setCurrPlay(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Tell us about yourself!</p>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.usernameBox}>
          <label htmlFor="Username" className={styles.heading}>
            {" "}
            Username:{" "}
          </label>
          <div>
            <input
              type="text"
              id="UserName"
              name="Username"
              onChange={handleUsername}
            ></input>
          </div>
        </div>

        <div className={styles.userUploadImg}>
          <label>
            <input type="file" name="image" onChange={handleFileChange} />
          </label>
        </div>

        <p className={styles.heading}>Region:</p>
        <div className={styles.language}>
          <Checkbox
            type="radio"
            label="North America"
            name="region"
            value="north america"
            onChange={handleRegion}
            defaultChecked={false}
          />
          <Checkbox
            type="radio"
            label="South America"
            name="region"
            value="south america"
            onChange={handleRegion}
            defaultChecked={false}
          />
          <Checkbox
            type="radio"
            label="Europe"
            name="region"
            value="europe"
            onChange={handleRegion}
            defaultChecked={false}
          />
          <Checkbox
            type="radio"
            label="Asia"
            name="region"
            value="asia"
            onChange={handleRegion}
            defaultChecked={false}
          />
          <Checkbox
            type="radio"
            label="Oceania"
            name="region"
            value="oceania"
            onChange={handleRegion}
            defaultChecked={false}
          />
          <Checkbox
            type="radio"
            label="Africa"
            name="region"
            value="africa"
            onChange={handleRegion}
            defaultChecked={false}
          />
        </div>

        <p className={styles.heading}>What language(s) are you fluent in?</p>
        <p className={styles.subheading}>Check all that apply</p>
        <div className={styles.language}>
          <Checkbox
            type="checkbox"
            label="English"
            name="english"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Spanish"
            name="spanish"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="German"
            name="german"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="French"
            name="french"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Japanese"
            name="japanese"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Chinese"
            name="chinese"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Korean"
            name="korean"
            value=""
            onChange={handleLanguage}
            defaultChecked={false}
          />
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
          </p>
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
          <LearningCheckbox
            label="English"
            name="english"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="Spanish"
            name="spanish"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="German"
            name="german"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="French"
            name="french"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="Japanese"
            name="japanese"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="Chinese"
            name="chinese"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />

          <LearningCheckbox
            label="Korean"
            name="korean"
            onChange={handleLearning}
            defaultChecked1={false}
            defaultChecked2={false}
            defaultChecked3={false}
            defaultChecked4={false}
            defaultChecked5={false}
          />
        </div>

        <p className={styles.heading}>Date of Birth:</p>
        <input type="date" onChange={handleBirthday}></input>

        <p className={styles.heading}>System(s):</p>
        <div className={styles.language}>
          <Checkbox
            type="checkbox"
            label="PC"
            name="pc"
            value=""
            onChange={handleSystem}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Switch"
            name="switch"
            value=""
            onChange={handleSystem}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="PlayStation"
            name="playstation"
            value=""
            onChange={handleSystem}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Xbox"
            name="xbox"
            value=""
            onChange={handleSystem}
            defaultChecked={false}
          />
        </div>

        <p className={styles.heading}>Genre:</p>
        <div className={styles.language}>
          <Checkbox
            type="checkbox"
            label="Shooters"
            name="shooters"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Survival"
            name="survival"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Battle Royal"
            name="battle royal"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Strategy"
            name="strategy"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Party"
            name="party"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="Fighting"
            name="fighting"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="RPG"
            name="rpg"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
          <Checkbox
            type="checkbox"
            label="MMO"
            name="mmo"
            value=""
            onChange={handleGenre}
            defaultChecked={false}
          />
        </div>

        <p className={styles.heading}>About Me:</p>
        <textarea rows={5} cols={40} onChange={handleAboutMe} />

        <p className={styles.heading}>Currently Playing:</p>

        <textarea rows={5} cols={40} onChange={handleCurrPlay} />

        <div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </div>

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
            Can interact with native speakers more fluently and spontaneously.
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
      </form>
    </div>
  );
}
