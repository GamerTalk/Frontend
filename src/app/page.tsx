'use client'

import styles from "./page.module.css";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from "./components/layouts/UserCard";

export default function Home() {

  const [name, setName] = useState([]);

  useEffect(() => {
    async function getNames() {
      const names : any = await axios.get('http://localhost:8000/api/test/').then((result) => result.data)
      setName(names)
    }
    getNames()
  },[])


  return ( 
    <>
      <div>
      <h2>{name[0]}</h2>
      <UserCard />
      </div>
  </>
)
}
