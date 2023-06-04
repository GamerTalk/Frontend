"use client"

import Checkbox from "../utils/Checkbox" 
import LearningCheckbox from "../utils/Learning-Checkbox "
import styles from './UserInfo.module.css'
import { useState, useEffect, ChangeEvent } from "react"


export default function UserInfo() {
  const [username, setUsername] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([])
  const [learning, setLearning] = useState([{}])
  const [birthday, setBirthday] = useState("");
  const [system, setSystem] = useState<string[]>([])
  const [genre, setGenre] = useState<string[]>([])
  const [aboutMe, setAboutMe] = useState<string>("");
  const [currPlay, setCurrPlay] = useState<string>("");
  


  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  }

  const handleLanguage = (event: { target: {  name : any }; }) => {
    const {  name } = event.target;
    if (language.includes(name)) {
      // If language is already selected, remove it from the array
      setLanguage((prevLanguages) => prevLanguages.filter((lang) => lang !== name));
    } else {
      // If language is not selected, add it to the array
      setLanguage((prevLanguages) => [...prevLanguages, name]);
    }
  }

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
    console.log('BIRTHDAY',birthday)
  },[birthday])
  

  return (
    <>
    <h1>Welcome!</h1>
    <p>Tell us a little about yourself so people can find you</p>

    <form>
      <div> 
        <label htmlFor="Username"> Username: </label>
        <input type="text" id="UserName" name="Username" onChange={handleUsername}></input>
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
      <div className={styles.learning}>

       <div className ={styles.learningRows}>
        <LearningCheckbox label="English" name="English" onChange={handleAboutMe}/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Spanish"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="German"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="French"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Japanese"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Chinese"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Korean"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>
  
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

