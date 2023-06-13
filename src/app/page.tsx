'use client'

import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from "./components/layouts/UserCard";
import FilterArea from "./components/layouts/FilterArea";
import {User} from "./global.t"
import Landing from './landing/page';
import { UserAuth } from './context/AuthContext';
import { useRouter, redirect } from 'next/navigation';


export default function Home() {

  const [users, setUsers] = useState<User[]>([]);
  const [filterWords, setFilterWords] = useState<string[]>([]);
  const [isShowUserCard, setShowUserCard] = useState(true);

  const {uid} = UserAuth()
  const router = useRouter()

  const fetchAllusers = async () => { 
    try { 
      const response = await axios.get("http://127.0.0.1:8000/api/filter-users/");
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

  useEffect(() => {
    if (!uid) {
      const timeout = setTimeout(() => {
        router.push('/landing');
      }, 1000); // Delay of 3 seconds before redirecting

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [uid]);

  if (uid) {
    return (
      <>
        <div>
          <FilterArea
            setUsers={setUsers}
            setFilterWords={setFilterWords}
            filterWords={filterWords}
            setShowUserCard={setShowUserCard}
          />
          {isShowUserCard && <UserCard users={users} />}
        </div>
      </>
    );
  }

  return null;
}
