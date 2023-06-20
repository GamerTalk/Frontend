"use client";

import { User } from "../global.t";
import UserCard from "../components/layouts/UserCard";
import FilterArea from "../components/layouts/FilterArea";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleUserCard from "../components/layouts/SingleUserCard";

export default function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterWords, setFilterWords] = useState<string[]>([]);
  const [isShowUserCard, setShowUserCard] = useState(true);
  const [showSingleUser, setShowSingleUser] = useState<Boolean>(false);
  const [singleUser, setSingleUser] = useState<User | object>({});

  const fetchAllusers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/filter-users/"
      );
      const allUsers: User[] = response.data;
      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filterWords.length === 0 && users.length === 0) {
      fetchAllusers();
    }
  }, [filterWords]);

  console.log("hoge",users);
  
  return (
    <>
      <div>
        <FilterArea
          setUsers={setUsers}
          setFilterWords={setFilterWords}
          filterWords={filterWords}
          setShowUserCard={setShowUserCard}
        />
        {showSingleUser ? (
          <button onClick={(e) => setShowSingleUser(false)}>Back</button>
        ) : (
          ""
        )}
        {isShowUserCard && (
          <div>
            {showSingleUser ? <SingleUserCard userObject={singleUser} /> : ""}

            {!showSingleUser
              ? users.map((user: User, index: number) => {
                  return (
                    <UserCard
                      user={user}
                      key={index}
                      setShowSingleUser={setShowSingleUser}
                      setSingleUser={setSingleUser}
                    />
                  );
                })
              : ""}
          </div>
        )}
      </div>
    </>
  );
}
