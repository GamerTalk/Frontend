"use client"

import Checkbox from "../components/elements/Checkbox" ;
import LearningCheckbox from "../components/elements/Learning-Checkbox";
import styles from './UserInfo.module.css';
import { useState, useEffect, ChangeEvent } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function UserInfo() {
  const {uid} = UserAuth()
  const [username, setUsername] = useState<string>("");
  const [region, setRegion] = useState<string>("")
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [birthday, setBirthday] = useState("");
  const [system, setSystem] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>("");
  const [currPlay, setCurrPlay] = useState<string>("");
  
  const router = useRouter();
  /*
      "uid": "delete me",
#     "username": "GodSlayerXD",
#     "about_me": "I was born in a log cabin.",
#     "fluent": ["english", "spanish"],
#     "learning": [{"language":"german", "level": 1}, {"language":"japanese", "level": 3}],
#     "date_of_birth": "1999-01-01",
#     "systems": ["playstation","PC"],
#     "genre": ["FPS", "survival"],
#     "currently_playing": "I am currently playing COD MW2, Fortnite, and some Ark Survival"
  */

const handleFormSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault();

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
    currently_playing: currPlay
  }

  console.log(payload);

  axios.post('http://127.0.0.1:8000/api/new-user/', payload)
  .then(response => {
    router.push('/')
  })
  .catch(error => {
    console.log(error);
  });
}

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  }

  const handleRegion= (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRegion(value);
  }

  const handleLanguage = (event: { target: {  name : string, value: string }; }) => {
    const {  name } = event.target;
    if (language.includes(name)) {
      // If language is already selected, remove it from the array
      setLanguage((prevLanguages) => prevLanguages.filter((lang) => lang !== name));
    } else {
      // If language is not selected, add it to the array
      setLanguage((prevLanguages) => [...prevLanguages, name]);
    }
  }
  
  const handleLearning = (event: { target: { name: string; value: string }; }) => {
    const { name, value } = event.target;
    const newObj = { language: name, level: Number(value) };
  
    const languageExists = learning.some((learn: any) => learn.language === name);
    if (languageExists) {
      // If language is already selected, update its level only
      setLearning((prevLearning) =>
        prevLearning.map((learn: any) =>
          learn.language === name ? { ...learn, level: value } : learn
        )
      );
    } else {
      // If language is not selected, add it to the array
      setLearning((prevLearning : any) => [...prevLearning, newObj]);
    }
  };

  const handleBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setBirthday(dateValue);
  };

  const handleSystem = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    if (system.includes(name)) {
      // If system is already selected, remove it from the array
      setSystem((prevSystem) => prevSystem.filter((sys) => sys !== name));
    } else {
      // If system is not selected, add it to the array
      setSystem((prevSystem) => [...prevSystem, name]);
    }
  }

  const handleGenre = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    if (genre.includes(name)) {
      // If genre is already selected, remove it from the array
      setGenre((prevGenre) => prevGenre.filter((gen) => gen !== name));
    } else {
      // If genre is not selected, add it to the array
      setGenre((prevGenre) => [...prevGenre, name]);
    }
  }
  
  const handleAboutMe = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setAboutMe(value);
  }

  const handleCurrPlay = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setCurrPlay(value);
  }

  return (
    <>
    <h1>Welcome!</h1>
    <p>Tell us about yourself!</p>

    <form onSubmit={handleFormSubmit}>
      <div className={styles.usernameBox}> 
        <label htmlFor="Username" className={styles.heading}> Username: </label>
        <div>
          <input type="text" id="UserName" name="Username" onChange={handleUsername}></input>
        </div>
      </div>

      <p className={styles.heading}>Region:</p>
      <div className={styles.language}> 
        <Checkbox type="radio" label="North America" name="region" value="North_America" onChange={handleRegion} defaultChecked={false} />
        <Checkbox type="radio" label="South America" name="region" value="South_America" onChange={handleRegion} defaultChecked={false} />
        <Checkbox type="radio" label="Europe" name="region" value="Europe" onChange={handleRegion} defaultChecked={false} />
        <Checkbox type="radio" label="Asia" name="region" value="Asia" onChange={handleRegion} defaultChecked={false} />
        <Checkbox type="radio" label="Oceania" name="region" value="Oceania" onChange={handleRegion} defaultChecked={false} />
        <Checkbox type="radio" label="Africa" name="region" value ="Africa" onChange={handleRegion} defaultChecked={false} />
      </div>


      <p className={styles.heading}>What language(s) are you fluent in?</p>
      <p className={styles.subheading}>Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox type="checkbox" label="English" name="English" value="" onChange={handleLanguage} defaultChecked={false} />
       <Checkbox type="checkbox" label="Spanish" name="Spanish" value="" onChange={handleLanguage}  defaultChecked={false}/>
       <Checkbox type="checkbox" label="German" name="German" value="" onChange={handleLanguage} defaultChecked={false} />
       <Checkbox type="checkbox" label="French" name="French" value="" onChange={handleLanguage} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Japanese" name="Japanese" value="" onChange={handleLanguage} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Chinese"name="Chinese" value="" onChange={handleLanguage} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Korean" name="Korean" value="" onChange={handleLanguage} defaultChecked={false}/>
      </div>

      <p className={styles.heading}>What language(s) do you want to learn?</p>
      <p className={styles.subheading}>1: Beginner, 2: Intermediate, 3: Advanced</p>
      <div>
        <LearningCheckbox label="English" name="English" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="Spanish" name="Spanish" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="German" name="German" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="French" name="French" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="Japanese" name="Japanese" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="Chinese" name="Chinese" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
        <LearningCheckbox label="Korean" name="Korean" onChange={handleLearning} defaultChecked1={false} defaultChecked2={false} defaultChecked3={false}/>
      </div>

      <p className={styles.heading}>Date of Birth:</p>
      <input type="date" onChange={handleBirthday}></input>

      <p className={styles.heading}>System(s):</p>
      <div className={styles.language}> 
       <Checkbox type="checkbox" label="PC" name="PC" value="" onChange={handleSystem}  defaultChecked={false}/>
       <Checkbox type="checkbox" label="Switch" name="Switch" value="" onChange={handleSystem} defaultChecked={false}/>
       <Checkbox type="checkbox" label="PlayStation" name="PlayStation"value=""  onChange={handleSystem} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Xbox" name="Xbox" value="" onChange={handleSystem} defaultChecked={false}/>
      </div>

      <p className={styles.heading}>Genre:</p>
      <div className={styles.language}> 
       <Checkbox type="checkbox" label="Shooters" name="Shooters" value="" onChange={handleGenre}  defaultChecked={false}/>
       <Checkbox type="checkbox" label="Survival" name="Survival" value="" onChange={handleGenre}  defaultChecked={false}/>
       <Checkbox type="checkbox" label="Battle Royal" name="Battle Royal" value="" onChange={handleGenre} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Strategy" name="Strategy" value="" onChange={handleGenre} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Party" name="Party" value="" onChange={handleGenre} defaultChecked={false}/>
       <Checkbox type="checkbox" label="Fighting" name="Fighting" value="" onChange={handleGenre} defaultChecked={false}/>
       <Checkbox type="checkbox" label="RPG" name="RPG" value="" onChange={handleGenre} defaultChecked={false}/>
       <Checkbox type="checkbox" label="MMO" name="MMO" value="" onChange={handleGenre} defaultChecked={false}/>
      </div>

      <p className={styles.heading}>About Me:</p>
      <textarea rows={5} cols={40} onChange={handleAboutMe}/>

      <p className={styles.heading}>Currently Playing:</p>

      <textarea rows={5} cols={40} onChange={handleCurrPlay}/>

      <div><button className={styles.button} type="submit">Submit</button></div>

    </form>
       
    </>
  )
}
