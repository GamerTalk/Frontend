"use client"

import Checkbox from "../components/elements/Checkbox" 
import styles from './UserInfo.module.css'
import { useState, useEffect, ChangeEvent } from "react"


export default function UserInfo() {
  const [username, setUsername] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([])
  const [aboutMe, setAboutMe] = useState<string>("");
  const [currPlay, setCurrPlay] = useState<string>("");


  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  }

  const handleLanguage = (event: { target: { value: any, name : any }; }) => {
    const { value, name } = event.target;
    if (language.includes(name)) {
      // If language is already selected, remove it from the array
      setLanguage((prevLanguages) => prevLanguages.filter((lang) => lang !== name));
    } else {
      // If language is not selected, add it to the array
      setLanguage((prevLanguages) => [...prevLanguages, name]);
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
    console.log(language)
  },[language])
  

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
        <Checkbox label="English"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
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
      <input type="date"></input>

      <p>Systems</p>
      <div className={styles.language}> 
       <Checkbox label="PC"/>
       <Checkbox label="Switch"/>
       <Checkbox label="PlayStation"/>
       <Checkbox label="Xbox"/>
      </div>

      <p>Genre</p>
      <div className={styles.language}> 
       <Checkbox label="Shooters"/>
       <Checkbox label="Survial"/>
       <Checkbox label="Battle Royal"/>
       <Checkbox label="Strategy"/>
       <Checkbox label="Party"/>
       <Checkbox label="Fighting"/>
       <Checkbox label="RPG"/>
       <Checkbox label="MMO"/>
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

