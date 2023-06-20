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
        if (userData.languages !== null) {
          setProfile(userData)
          console.log(userData)
          setRegion(userData.user_region)
          setSystem(userData.user_systems)
          setLanguage(userData.languages.fluent)
          setGenre(userData.user_genre)
          setLearning(userData.languages.learning)
          setAboutMe(userData.about_me)
          setCurrPlay(userData.currently_playing) 
          
        } else {
          console.log('fail')
        }
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
        <Checkbox type="radio" label="North America" name="region" value="north america" onChange={handleRegion} defaultChecked={region == 'north america'} />
        <Checkbox type="radio" label="South America" name="region" value="south america" onChange={handleRegion} defaultChecked={region == 'south america'} />
        <Checkbox type="radio" label="Europe" name="region" value="europe" onChange={handleRegion} defaultChecked={region == 'europe'} />
        <Checkbox type="radio" label="Asia" name="region" value="asia" onChange={handleRegion} defaultChecked={region == 'asia'} />
        <Checkbox type="radio" label="Oceania" name="region" value="oceania" onChange={handleRegion} defaultChecked={region == 'oceania'} />
        <Checkbox type="radio" label="Africa" name="region" value ="africa" onChange={handleRegion} defaultChecked={region == 'africa'} />
      </div>

    
    <p className={styles.heading}>What language(s) are you fluent in?:</p>
    <p className={styles.subheading}>Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox type="Checkbox" label="English" name="english" value="" onChange={handleLanguage} defaultChecked={language.includes('english')} />
       <Checkbox type="Checkbox" label="Spanish" name="spanish" value="" onChange={handleLanguage}  defaultChecked={language.includes('spanish')}/>
       <Checkbox type="Checkbox" label="German" name="german" value="" onChange={handleLanguage} defaultChecked={language.includes('german')} />
       <Checkbox type="Checkbox" label="French" name="french" value="" onChange={handleLanguage} defaultChecked={language.includes('french')}/>
       <Checkbox type="Checkbox" label="Japanese" name="japanese" value="" onChange={handleLanguage} defaultChecked={language.includes('japanese')}/>
       <Checkbox type="Checkbox" label="Chinese"name="chinese" value="" onChange={handleLanguage} defaultChecked={language.includes('chinese')}/>
       <Checkbox type="Checkbox" label="Korean" name="korean" value="" onChange={handleLanguage} defaultChecked={language.includes('korean')}/>
      </div>

    <p className={styles.heading}>Date of Birth: </p>
    <p> {profile.date_of_birth}</p>

    <p className={styles.heading}>User Systems:</p>
    <div className={styles.language}> 
       <Checkbox type="Checkbox" label="PC" name="pc" value="" onChange={handleSystem} defaultChecked={system.includes('pc')}/>
       <Checkbox type="Checkbox" label="Switch" name="switch" value="" onChange={handleSystem}  defaultChecked={system.includes('switch')}/>
       <Checkbox type="Checkbox" label="PlayStation" name="playstation" value="" onChange={handleSystem}  defaultChecked={system.includes('playstation')}/>
       <Checkbox type="Checkbox" label="Xbox" name="xbox" value="" onChange={handleSystem}  defaultChecked={system.includes('xbox')}/>
    </div>

    <p id='learning' className={styles.heading}>What language(s) do you want to learn and what is your level?</p>
      <p className={styles.learningSubheading}> 
      <p> <span className ={styles.number}>1</span>: Beginner 
        <span className ={styles.number}> 2</span>: Elementary </p>
       <p> <span className ={styles.number}>3</span>: Intermediate 
        <span className ={styles.number}> 4</span>: Advanced 
        <span className ={styles.number}> 5</span>: Proficent</p> </p>
      <p className={styles.learningSubheading}>For a more detailed explanation <a href="#levels-explain" className={styles.links}>click here</a> </p>
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
          label="English" name="english" onChange={handleLearning} 
          defaultChecked1={langCall('english',1,learning)} defaultChecked2={langCall('english',2,learning)} 
          defaultChecked3={langCall('english',3,learning)} defaultChecked4={langCall('english',4,learning)} 
          defaultChecked5={langCall('english',5,learning)}/>

        <LearningCheckbox 
          label="Spanish" name="spanish"  onChange={handleLearning} 
          defaultChecked1={langCall('spanish',1,learning)} defaultChecked2={langCall('spanish',2,learning)} 
          defaultChecked3={langCall('spanish',3,learning)} defaultChecked4={langCall('spanish',4,learning)} 
          defaultChecked5={langCall('spanish',5,learning)}/>

        <LearningCheckbox 
          label="German" name="german" onChange={handleLearning} 
          defaultChecked1={langCall('german',1,learning)} defaultChecked2={langCall('german',2,learning)} 
          defaultChecked3={langCall('german',3,learning)} defaultChecked4={langCall('german',4,learning)} 
          defaultChecked5={langCall('german',5,learning)}/>

        <LearningCheckbox 
          label="French" name="french" onChange={handleLearning} 
          defaultChecked1={langCall('french',1,learning)} defaultChecked2={langCall('french',2,learning)} 
          defaultChecked3={langCall('french',3,learning)} defaultChecked4={langCall('french',4,learning)} 
          defaultChecked5={langCall('french',5,learning)}/>

        <LearningCheckbox 
          label="Japanese" name="japanese" onChange={handleLearning} 
          defaultChecked1={langCall('japanese',1,learning)} defaultChecked2={langCall('japanese',2,learning)} 
          defaultChecked3={langCall('japanese',3,learning)} defaultChecked4={langCall('japanese',4,learning)} 
          defaultChecked5={langCall('japanese',5,learning)}/>

        <LearningCheckbox 
          label="Chinese" name="chinese" onChange={handleLearning} 
          defaultChecked1={langCall('chinese',1,learning)} defaultChecked2={langCall('chinese',2,learning)} 
          defaultChecked3={langCall('chinese',3,learning)} defaultChecked4={langCall('chinese',4,learning)} 
          defaultChecked5={langCall('chinese',5,learning)}/>

        <LearningCheckbox 
          label="Korean" name="korean" onChange={handleLearning} 
          defaultChecked1={langCall('korean',1,learning)} defaultChecked2={langCall('korean',2,learning)} 
          defaultChecked3={langCall('korean',3,learning)} defaultChecked4={langCall('korean',4,learning)}
          defaultChecked5={langCall('korean',5,learning)}/>

      </div>

      <p className={styles.heading}>Genre:</p>
      <div className={styles.language}> 
       <Checkbox type="Checkbox" label="Shooters" name="shooters" value="" onChange={handleGenre} defaultChecked={genre.includes('shooters')}/>
       <Checkbox type="Checkbox" label="Survial" name="survival" value="" onChange={handleGenre} defaultChecked={genre.includes('survivial')}/>
       <Checkbox type="Checkbox" label="Battle Royal" name="battle royal" value="" onChange={handleGenre} defaultChecked={genre.includes('battle royal')}/>
       <Checkbox type="Checkbox" label="Strategy" name="strategy" value="" onChange={handleGenre} defaultChecked={genre.includes('strategy')}/>
       <Checkbox type="Checkbox" label="Party" name="party" value="" onChange={handleGenre} defaultChecked={genre.includes('party')}/>
       <Checkbox type="Checkbox" label="Fighting" name="fighting" value="" onChange={handleGenre} defaultChecked={genre.includes('fighting')}/>
       <Checkbox type="Checkbox" label="RPG" name="rpg" value="" onChange={handleGenre} defaultChecked={genre.includes('rpg')}/>
       <Checkbox type="Checkbox" label="MMO" name="mmo" value="" onChange={handleGenre} defaultChecked={genre.includes('mmo')}/>
      </div>

    <p className={styles.heading}>About Me:</p>
    <textarea rows={5} cols={40} value={aboutMe} onChange={handleAboutMe}/>

    <p className={styles.heading}>Currently Playing:</p> 
    <textarea rows={5} cols={40} value={currPlay} onChange={handleCurrPlay} />

    <div>
      <button className={styles.editButton} type="submit">Submit</button>
    
    <div className={styles.levelsbox}>
      <a id="levels-explain" href="#learning" className={styles.links}>Go back</a>
      <h1>Language Levels</h1>
      <h2 className={styles.candoHeadings}>Beginner</h2>
      <p className={styles.cando}>Can make introductions and can ask and answer simple questions.</p>
      <h2 className={styles.candoHeadings}>Elementary</h2>
      <p className={styles.cando}>Can converse common topics and in daily situations.</p>
      <h2 className={styles.candoHeadings}>Intermediate</h2>
      <p className={styles.cando}>Can interact with native speakers more fluently and spontaneously.</p>
      <h2 className={styles.candoHeadings}>Advanced</h2>
      <p className={styles.cando}>Can express yourself naturally, effortlessly recalling authentic expressions.</p>
      <h2 className={styles.candoHeadings}>Proficient</h2>
      <p className={styles.cando}>Can comfortably comphrehend most things heard and read.</p>
    </div>
    </div>


    </>
    : <p className={styles.loading}>Loading Profile...</p>}
  
   </form>
    </>

    

  )
}
