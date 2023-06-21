"use client"

import { UserAuth } from "../context/AuthContext";
import axios from "axios";

const {uid} = UserAuth();

const config = {
  method: 'GET',
  headers: {
    'uid' : uid
  }
}

const getURL = "http://localhost:8000/api/get-flashcards/"


const getData = async (setter: (arg0: any) => void) => {
  try {
    if (uid) {
      const userData: any = await axios.get(getURL, config).then((result) => result.data);
      setter(userData);
    } else {
      console.log('fail');
    }
  } catch (error) {
    console.log(error);
  }
};

export default getData