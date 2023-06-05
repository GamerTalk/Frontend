"use client"

import Checkbox from "../utils/Checkbox" 
import LearningCheckbox from "../utils/Learning-Checkbox "
import styles from './UserInfo.module.css'
import { useState, useEffect, ChangeEvent } from "react"


export default function UserInfo() {
  const [username, setUsername] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([])
  const [learning, setLearning] = useState<string[]>([])
  const [birthday, setBirthday] = useState("");
  const [system, setSystem] = useState<string[]>([])
  const [genre, setGenre] = useState<string[]>([])
  const [aboutMe, setAboutMe] = useState<string>("");
  const [currPlay, setCurrPlay] = useState<string>("");
  
  /*

  */

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
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
    const newObj = { language: name, level: value };
  
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

  const handleSystem = (event: { target: { name : any }; }) => {
    const { name } = event.target;
    if (system.includes(name)) {
      // If system is already selected, remove it from the array
      setSystem((prevSystem) => prevSystem.filter((sys) => sys !== name));
    } else {
      // If system is not selected, add it to the array
      setSystem((prevSystem) => [...prevSystem, name]);
    }
  }

  const handleGenre = (event: { target: { name : any }; }) => {
    const { name } = event.target;
    if (genre.includes(name)) {
      // If system is already selected, remove it from the array
      setGenre((prevGenre) => prevGenre.filter((gen) => gen !== name));
    } else {
      // If system is not selected, add it to the array
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

  useEffect(() => {
    console.log(learning)
  },[learning])

  
  return (
    <>
    <h1>Welcome!</h1>
    <p>Tell us a little about yourself so people can find you</p>

    <form>
      <div className={styles.usernameBox}> 
        <label htmlFor="Username"> Username: </label>
        <div>
          <input type="text" id="UserName" name="Username" onChange={handleUsername}></input>
        </div>
      </div>

      <p>Fluent: Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox label="English" name="English" onChange={handleLanguage}/>
       <Checkbox label="Spanish" name="Spanish" onChange={handleLanguage} />
       <Checkbox label="German" name="German" onChange={handleLanguage} />
       <Checkbox label="French" name="French" onChange={handleLanguage}/>
       <Checkbox label="Japanese" name="Japanese" onChange={handleLanguage}/>
       <Checkbox label="Chinese"name="Chinese" onChange={handleLanguage}/>
       <Checkbox label="Korean" name="Korean" onChange={handleLanguage}/>
      </div>

      <p>Language you want to learn:</p>
      <p>1: Beginner, 2: Intermediate, 3: Advanced</p>
      <div className={styles.learning}>
        <LearningCheckbox label="English" name="English" onChange={handleLearning}/>
        <LearningCheckbox label="Spanish" name="Spanish"  onChange={handleLearning}/>
        <LearningCheckbox label="German" name="German" onChange={handleLearning} />
        <LearningCheckbox label="French" name="French" onChange={handleLearning} />
        <LearningCheckbox label="Japanese" name="Japanese"  onChange={handleLearning} />
        <LearningCheckbox label="Chinese" name="Chinese"  onChange={handleLearning}/>
        <LearningCheckbox label="Korean" name="Korean"  onChange={handleLearning}/>
        <LearningCheckbox label="Spanish" name="Spanish" onChange={handleLearning}/>
      </div>

      <p>Date of Birth</p>
      <input type="date" onChange={handleBirthday}></input>
      <p>Date as String: {birthday}</p>

      <p>Systems</p>
      <div className={styles.language}> 
       <Checkbox label="PC" name="PC"  onChange={handleSystem}/>
       <Checkbox label="Switch" name="Switch" onChange={handleSystem}/>
       <Checkbox label="PlayStation" name="PlayStation" onChange={handleSystem}/>
       <Checkbox label="Xbox" name="Xbox" onChange={handleSystem}/>
      </div>

      <p>Genre</p>
      <div className={styles.language}> 
       <Checkbox label="Shooters" name="Shooters" onChange={handleGenre}/>
       <Checkbox label="Survial" name="Survival" onChange={handleGenre}/>
       <Checkbox label="Battle Royal" name="Battle Royal" onChange={handleGenre}/>
       <Checkbox label="Strategy" name="Strategy" onChange={handleGenre}/>
       <Checkbox label="Party" name="Party" onChange={handleGenre}/>
       <Checkbox label="Fighting" name="Fighting" onChange={handleGenre}/>
       <Checkbox label="RPG" name="RPG" onChange={handleGenre}/>
       <Checkbox label="MMO" name="MMO" onChange={handleGenre}/>
      </div>

      <p>About Me</p>
      <textarea onChange={handleAboutMe}/>

      <p>Currently Playing</p>

      <textarea onChange={handleCurrPlay}/>

      

    </form>
       
    </>
  )
}
function UseState(arg0: string): [any, any] {
  throw new Error("Function not implemented.")
}

