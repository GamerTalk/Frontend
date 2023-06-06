'use client'

import styles from "./page.module.css";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from "./components/layouts/UserCard";
import FilterArea from "./components/layouts/FilterArea";

export default function Home() {
  // for User Card 
  const [users, setUsers] = useState<User[]>([]);
  // for Filter Area component 
  const [filterWords, setFilterWords] = useState([]);

  interface User {
    id: number;
    uid: string;
    username: string;
    date_of_birth: string;
    about_me: string;
    languages: {
      fluent: string[];
      learning: {
        level: number;
        language: string;
      }[];
    };
    currently_playing: string;
    user_systems: string[];
  }

  const fetchAllusers = async () => { 
    try { 
      const response = await axios.get("http://127.0.0.1:8000/api/all-users/");
      const allUsers: User[] = response.data;
      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // default 
    if (setFilterWords.length === 0) {
      fetchAllusers();
    } else { 
      
    }
  },[])


  return ( 
    <>
      <div>
         <FilterArea/>
         <UserCard />
      </div>
  </>
)
}
