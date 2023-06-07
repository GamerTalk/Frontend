"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from '../userinfo/UserInfo.module.css'
import { UserAuth } from '../context/AuthContext';
import Checkbox from '../utils/Checkbox';

export default function Profile() {

  const {uid} = UserAuth()

  const config = {
    method: 'GET',
    headers: {
      'uid' : 'e3mGrFMSOnTuDGz1v6pTujwVI063'
    }
  }

  const url = "http://localhost:8000/api/user-info/"

  const [profile, setProfile] = useState<any>()
  const [language, setLanguage] = useState<string[]>([]);
  const [system, setSystem] = useState<string[]>([])
  const [learning, setLearning] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const userData : any  = await axios.get(url, config).then((result) => result.data)
        setProfile(userData)
        console.log(userData)
        setSystem(userData.user_systems)
        setLanguage(userData.languages.fluent)
      } 
      catch(error) {
       console.log(error)
      }
    }
    getData()
  },[uid])

  useEffect(() => {
    console.log('LANGUAGE', language)
  },[system])

  useEffect(() => {
    console.log('UID',uid)
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


   /*
console.log(response.languages.fluent); // Output: ["English"]
console.log(response.languages.learning); // Output: [{level: 2, language: "German"}, {level: 1, language: "Japanese"}, {level: 1, language: "Korean"}]

   */
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

    

    <p className={styles.heading}>About Me:</p>
    <textarea rows={5} cols={40} value={profile.about_me}/>

    <p className={styles.heading}>Playing:</p> 
    <textarea rows={5} cols={40} value={profile.currently_playing}/>



    </>
    : "Loading Profile..."}

  
    
    </>

    

  )
}
