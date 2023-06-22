"use client";

import { User } from "../global.t";
import UserCard from "../components/layouts/UserCard";
import FilterArea from "../components/layouts/FilterArea";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleUserCard from "../components/layouts/SingleUserCard";
// import styles from "./search.module.css"; // This would not work
import { UserAuth } from "../context/AuthContext";

export default function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterWords, setFilterWords] = useState<string[]>([]);
  const [isShowUserCard, setShowUserCard] = useState(true);
  const [showSingleUser, setShowSingleUser] = useState<Boolean>(false);
  const [singleUser, setSingleUser] = useState<User | object>({});

  const { uid } = UserAuth();

  const fetchAllusers = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/filter-users/";
      const response = await axios.get(url);
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
      {/* The margin keeps the from footer blocking the contents of the div */}
      <div style={{ marginBottom: "100px" }}>
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
                  if (uid !== user.uid) {
                    return (
                      <UserCard
                        user={user}
                        key={index}
                        setShowSingleUser={setShowSingleUser}
                        setSingleUser={setSingleUser}
                      />
                    );
                  }
                })
              : ""}
          </div>
        )}
      </div>
    </>
  );
}
