import React, { useState } from 'react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';

export default function Profile() {

  const {uid} = UserAuth()

  const options = {
    method: 'GET',
  
    url: 'http://localhost:8000/api/user-info/',
    headers: {
      'uid' : uid
    }
  }

  const [data, setData] = useState()

  


  return (
    <h1>Profile</h1>

  )
}
