'use client'

import styles from "./page.module.css";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from "./components/layouts/UserCard";
import FilterArea from "./components/layouts/FilterArea";
import {User} from "./global.t"

export default function Home() {
  // for User Card 
  const [users, setUsers] = useState<User[]>([]);
  // for Filter Area component 
  const [filterWords, setFilterWords] = useState<string[]>([]);

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
    if (filterWords.length === 0) {
      fetchAllusers();
    } else { 
      console.log("おわた");
    }
  },[filterWords])

  return ( 
    <>
      {console.log(filterWords)}
      <div>
        <FilterArea setUsers={setUsers} setFilterWords={setFilterWords} filterWords={filterWords} />
        <UserCard users={users} />
        <div>{filterWords}</div>
      </div>
  </>
)
}
