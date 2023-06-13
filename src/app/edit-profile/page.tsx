"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import styles from '../entry-form/UserInfo.module.css'
import { UserAuth } from '../context/AuthContext';
import Checkbox from '../components/elements/Checkbox';
import LearningCheckbox from '../components/elements/Learning-Checkbox';
import langCall from '../utils/langCheckFunc';
import { useRouter } from 'next/navigation';

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
  const [region, setRegion] = useState<string>("")
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [system, setSystem] = useState<string[]>([])
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>(profile ? profile.about_me : "");
  const [currPlay, setCurrPlay] = useState<string>(profile ? profile.currently_playing : "");

  const router = useRouter();


  useEffect(() => {
    async function getData() {
      try {
        if (uid) { 
        const userData : any  = await axios.get(url, config).then((result) => result.data)
        setProfile(userData)
        console.log(userData)
        setRegion(userData.user_region)
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

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault();

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
    currently_playing: currPlay
  }


  axios.patch('http://127.0.0.1:8000/api/edit-user/', payload)
  .then(response => {
    router.push('/')
  })
  .catch(error => {
    console.log(error);
  });
}

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
    <form onSubmit={handleFormSubmit}> 
    <h1>Profile</h1>
    {profile ? <>

    <p className={styles.heading}>Username:</p>
    <p>{profile.username}</p>

    <p className={styles.heading}>Region:</p>
      <div className={styles.language}> 
        <Checkbox type="radio" label="North America" name="region" value="North_America" onChange={handleRegion} defaultChecked={region == 'North_America'} />
        <Checkbox type="radio" label="South America" name="region" value="South_America" onChange={handleRegion} defaultChecked={region == 'South_America'} />
        <Checkbox type="radio" label="Europe" name="region" value="Europe" onChange={handleRegion} defaultChecked={region == 'Europe'} />
        <Checkbox type="radio" label="Asia" name="region" value="Asia" onChange={handleRegion} defaultChecked={region == 'Asia'} />
        <Checkbox type="radio" label="Oceania" name="region" value="Oceania" onChange={handleRegion} defaultChecked={region == 'Oceania'} />
        <Checkbox type="radio" label="Africa" name="region" value ="Africa" onChange={handleRegion} defaultChecked={region == 'Africa'} />
      </div>

    
    <p className={styles.heading}>What language(s) are you fluent in?:</p>
    <p className={styles.subheading}>Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox type="Checkbox" label="English" name="English" value="" onChange={handleLanguage} defaultChecked={language.includes('English')} />
       <Checkbox type="Checkbox" label="Spanish" name="Spanish" value="" onChange={handleLanguage}  defaultChecked={language.includes('Spanish')}/>
       <Checkbox type="Checkbox" label="German" name="German" value="" onChange={handleLanguage} defaultChecked={language.includes('German')} />
       <Checkbox type="Checkbox" label="French" name="French" value="" onChange={handleLanguage} defaultChecked={language.includes('French')}/>
       <Checkbox type="Checkbox" label="Japanese" name="Japanese" value="" onChange={handleLanguage} defaultChecked={language.includes('Japanese')}/>
       <Checkbox type="Checkbox" label="Chinese"name="Chinese" value="" onChange={handleLanguage} defaultChecked={language.includes('Chinese')}/>
       <Checkbox type="Checkbox" label="Korean" name="Korean" value="" onChange={handleLanguage} defaultChecked={language.includes('Korean')}/>
      </div>

    <p className={styles.heading}>Date of Birth: </p>
    <p> {profile.date_of_birth}</p>

    <p className={styles.heading}>User Systems:</p>
    <div className={styles.language}> 
       <Checkbox type="Checkbox" label="PC" name="PC" value="" onChange={handleSystem} defaultChecked={system.includes('PC')}/>
       <Checkbox type="Checkbox" label="Switch" name="Switch" value="" onChange={handleSystem}  defaultChecked={system.includes('Switch')}/>
       <Checkbox type="Checkbox" label="PlayStation" name="PlayStation" value="" onChange={handleSystem}  defaultChecked={system.includes('PlayStation')}/>
       <Checkbox type="Checkbox" label="Xbox" name="Xbox" value="" onChange={handleSystem}  defaultChecked={system.includes('Xbox')}/>
    </div>

    <p className={styles.heading}>What language(s) do you want to learn?</p>
      <p className={styles.subheading}>1: Beginner, 2: Intermediate, 3: Advanced</p>
      <div>
        <LearningCheckbox label="English" name="English" onChange={handleLearning} defaultChecked1={langCall('English',1,learning)} defaultChecked2={langCall('English',2,learning)} defaultChecked3={langCall('English',3,learning)}/>
        <LearningCheckbox label="Spanish" name="Spanish"  onChange={handleLearning} defaultChecked1={langCall('Spanish',1,learning)} defaultChecked2={langCall('Spanish',2,learning)} defaultChecked3={langCall('Spanish',3,learning)}/>
        <LearningCheckbox label="German" name="German" onChange={handleLearning} defaultChecked1={langCall('German',1,learning)} defaultChecked2={langCall('German',2,learning)} defaultChecked3={langCall('German',3,learning)}/>
        <LearningCheckbox label="French" name="French" onChange={handleLearning} defaultChecked1={langCall('French',1,learning)} defaultChecked2={langCall('French',2,learning)} defaultChecked3={langCall('French',3,learning)}/>
        <LearningCheckbox label="Japanese" name="Japanese" onChange={handleLearning} defaultChecked1={langCall('Japanese',1,learning)} defaultChecked2={langCall('Japanese',2,learning)} defaultChecked3={langCall('Japanese',3,learning)}/>
        <LearningCheckbox label="Chinese" name="Chinese" onChange={handleLearning} defaultChecked1={langCall('Chinese',1,learning)} defaultChecked2={langCall('Chinese',2,learning)} defaultChecked3={langCall('Chinese',3,learning)}/>
        <LearningCheckbox label="Korean" name="Korean" onChange={handleLearning} defaultChecked1={langCall('Korean',1,learning)} defaultChecked2={langCall('Korean',2,learning)} defaultChecked3={langCall('Korean',3,learning)}/>
      </div>

      <p className={styles.heading}>Genre:</p>
      <div className={styles.language}> 
       <Checkbox type="Checkbox" label="Shooters" name="Shooters" value="" onChange={handleGenre} defaultChecked={genre.includes('Shooters')}/>
       <Checkbox type="Checkbox" label="Survial" name="Survival" value="" onChange={handleGenre} defaultChecked={genre.includes('Survivial')}/>
       <Checkbox type="Checkbox" label="Battle Royal" name="Battle Royal" value="" onChange={handleGenre} defaultChecked={genre.includes('Battle Royal')}/>
       <Checkbox type="Checkbox" label="Strategy" name="Strategy" value="" onChange={handleGenre} defaultChecked={genre.includes('Strategy')}/>
       <Checkbox type="Checkbox" label="Party" name="Party" value="" onChange={handleGenre} defaultChecked={genre.includes('Party')}/>
       <Checkbox type="Checkbox" label="Fighting" name="Fighting" value="" onChange={handleGenre} defaultChecked={genre.includes('Fighting')}/>
       <Checkbox type="Checkbox" label="RPG" name="RPG" value="" onChange={handleGenre} defaultChecked={genre.includes('RPG')}/>
       <Checkbox type="Checkbox" label="MMO" name="MMO" value="" onChange={handleGenre} defaultChecked={genre.includes('MMO')}/>
      </div>

    <p className={styles.heading}>About Me:</p>
    <textarea rows={5} cols={40} value={aboutMe} onChange={handleAboutMe}/>

    <p className={styles.heading}>Currently Playing:</p> 
    <textarea rows={5} cols={40} value={currPlay} onChange={handleCurrPlay} />

    <div><button className={styles.editButton} type="submit">Submit</button></div>


    </>
    : "Loading Profile..."}
  
   </form>
    </>

    

  )
}
