"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';

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

  useEffect(() => {
    async function getData() {
      const userData : any  = await axios.get(url, config).then((result) => result.data)
      setProfile(userData)
    }
    getData()
  },[uid])

  useEffect(() => {
    console.log(profile)
  },[profile])

  useEffect(() => {
    console.log('UID',uid)
  },[uid])

   /*
console.log(response.languages.fluent); // Output: ["English"]
console.log(response.languages.learning); // Output: [{level: 2, language: "German"}, {level: 1, language: "Japanese"}, {level: 1, language: "Korean"}]
console.log(response.user_systems); // Output: ["Xbox"]
   */
  return (
    <>
    <h1>Profile</h1>
    {profile ? <>
    <p>Username: {profile.username}</p>
    <p>Date of Birth: {profile.date_of_birth}</p>
    <p>About Me: {profile.about_me}</p>
    <p>Playing: {profile.currently_playing} </p>
    </>
    : ''}

  
    
    </>

    

  )
}
