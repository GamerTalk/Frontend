'use client'

import styles from "./page.module.css";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from "./components/layouts/UserCard";
import FilterArea from "./components/layouts/FilterArea";
import {User} from "./global.t"


export default function Home() {

  const [users, setUsers] = useState<User[]>([]);
  const [filterWords, setFilterWords] = useState<string[]>([]);
  const [isShowUserCard, setShowUserCard] = useState(true);

  const fetchAllusers = async () => { 
    try { 
      const response = await axios.get("http://127.0.0.1:8000/api/filter-users/");
      console.log("userData",response.data);
      const allUsers: User[] = response.data;
      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (filterWords.length === 0 && users.length === 0) {
      fetchAllusers();
    }
  },[filterWords])

  return ( 
    <>
      <div>
        <FilterArea setUsers={setUsers} setFilterWords={setFilterWords} filterWords={filterWords} setShowUserCard={setShowUserCard} />
        {isShowUserCard && <UserCard users={users} />}
      </div>
  </>
)
}
