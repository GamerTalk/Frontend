"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from '../userinfo/UserInfo.module.css'
import { UserAuth } from '../context/AuthContext';
import Checkbox from '../utils/Checkbox';
import LearningCheckbox from '../utils/Learning-Checkbox';
import langCall from '../utils/langCheckFunc';

export default function Profile() {

  const {uid} = UserAuth()

  const config = {
    method: 'GET',
    headers: {
      'uid' : uid
    }
  }

  const url = "http://localhost:8000/api/user-info/"

  const [profile, setProfile] = useState<any>()
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [system, setSystem] = useState<string[]>([])
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>(profile ? profile.about_me : "");
  const [currPlay, setCurrPlay] = useState<string>(profile ? profile.currently_playing : "");


  useEffect(() => {
    async function getData() {
      try {
        if (uid) { 
        const userData : any  = await axios.get(url, config).then((result) => result.data)
        setProfile(userData)
        console.log(userData)
        setSystem(userData.user_systems)
        setLanguage(userData.languages.fluent)
        setGenre(userData.user_genre)
        setLearning(userData.languages.learning)
        setAboutMe(userData.about_me)
        setCurrPlay(userData.currently_playing) 
      }
      } 
      catch(error) {
       console.log(error)
      }
    }
    getData()
  },[uid])




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
    <h1>Profile</h1>
    {profile ? <>

    <p className={styles.heading}>Username:</p>
    <p>{profile.username}</p>

    
    <p className={styles.heading}>What language(s) are you fluent in?:</p>
    <p className={styles.subheading}>Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox label="English" name="English" onChange={handleLanguage} defaultChecked={language.includes('English')} />
       <Checkbox label="Spanish" name="Spanish" onChange={handleLanguage}  defaultChecked={language.includes('Spanish')}/>
       <Checkbox label="German" name="German" onChange={handleLanguage} defaultChecked={language.includes('German')} />
       <Checkbox label="French" name="French" onChange={handleLanguage} defaultChecked={language.includes('French')}/>
       <Checkbox label="Japanese" name="Japanese" onChange={handleLanguage} defaultChecked={language.includes('Japanese')}/>
       <Checkbox label="Chinese"name="Chinese" onChange={handleLanguage} defaultChecked={language.includes('Chinese')}/>
       <Checkbox label="Korean" name="Korean" onChange={handleLanguage} defaultChecked={language.includes('Korean')}/>
      </div>

    <p className={styles.heading}>Date of Birth: </p>
    <p> {profile.date_of_birth}</p>

    <p className={styles.heading}>User Systems:</p>
    <div className={styles.language}> 
       <Checkbox label="PC" name="PC"  onChange={handleSystem} defaultChecked={system.includes('PC')}/>
       <Checkbox label="Switch" name="Switch" onChange={handleSystem}  defaultChecked={system.includes('Switch')}/>
       <Checkbox label="PlayStation" name="PlayStation" onChange={handleSystem}  defaultChecked={system.includes('PlayStation')}/>
       <Checkbox label="Xbox" name="Xbox" onChange={handleSystem}  defaultChecked={system.includes('Xbox')}/>
    </div>

    <p className={styles.heading}>What language(s) do you want to learn?</p>
      <p className={styles.subheading}>1: Beginner, 2: Intermediate, 3: Advanced</p>
      <div>
        <LearningCheckbox label="English" name="English" onChange={handleLearning} defaultChecked1={langCall('English',1,learning)} defaultChecked2={langCall('English',2,learning)} defaultChecked3={langCall('English',3,learning)}/>
        <LearningCheckbox label="Spanish" name="Spanish" onChange={handleLearning} defaultChecked1={langCall('Spanish',1,learning)} defaultChecked2={langCall('Spanish',2,learning)} defaultChecked3={langCall('Spanish',3,learning)}/>
        <LearningCheckbox label="German" name="German" onChange={handleLearning} defaultChecked1={langCall('German',1,learning)} defaultChecked2={langCall('German',2,learning)} defaultChecked3={langCall('German',3,learning)}/>
        <LearningCheckbox label="French" name="French" onChange={handleLearning} defaultChecked1={langCall('French',1,learning)} defaultChecked2={langCall('French',2,learning)} defaultChecked3={langCall('French',3,learning)}/>
        <LearningCheckbox label="Japanese" name="Japanese" onChange={handleLearning} defaultChecked1={langCall('Japanese',1,learning)} defaultChecked2={langCall('Japanese',2,learning)} defaultChecked3={langCall('Japanese',3,learning)}/>
        <LearningCheckbox label="Chinese" name="Chinese" onChange={handleLearning} defaultChecked1={langCall('Chinese',1,learning)} defaultChecked2={langCall('Chinese',2,learning)} defaultChecked3={langCall('Chinese',3,learning)}/>
        <LearningCheckbox label="Korean" name="Korean" onChange={handleLearning} defaultChecked1={langCall('Korean',1,learning)} defaultChecked2={langCall('Korean',2,learning)} defaultChecked3={langCall('Korean',3,learning)}/>
      </div>

      <p className={styles.heading}>Genre:</p>
      <div className={styles.language}> 
       <Checkbox label="Shooters" name="Shooters" onChange={handleGenre} defaultChecked={genre.includes('Shooters')}/>
       <Checkbox label="Survial" name="Survival" onChange={handleGenre} defaultChecked={genre.includes('Survivial')}/>
       <Checkbox label="Battle Royal" name="Battle Royal" onChange={handleGenre} defaultChecked={genre.includes('Battle Royal')}/>
       <Checkbox label="Strategy" name="Strategy" onChange={handleGenre} defaultChecked={genre.includes('Strategy')}/>
       <Checkbox label="Party" name="Party" onChange={handleGenre} defaultChecked={genre.includes('Party')}/>
       <Checkbox label="Fighting" name="Fighting" onChange={handleGenre} defaultChecked={genre.includes('Fighting')}/>
       <Checkbox label="RPG" name="RPG" onChange={handleGenre} defaultChecked={genre.includes('RPG')}/>
       <Checkbox label="MMO" name="MMO" onChange={handleGenre} defaultChecked={genre.includes('MMO')}/>
      </div>

    <p className={styles.heading}>About Me:</p>
    <textarea rows={5} cols={40} value={aboutMe} onChange={handleAboutMe}/>

    <p className={styles.heading}>Currently Playing:</p> 
    <textarea rows={5} cols={40} value={currPlay} onChange={handleCurrPlay} />

    <div><button className={styles.editButton} type="submit">Submit</button></div>


    </>
    : "Loading Profile..."}

  
    
    </>

    

  )
}
