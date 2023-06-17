"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";
import axios from "axios";
import SingleUserCard from "../components/layouts/SingleUserCard";
import { OtherUsers, Post } from "../global.t";
import PostCard from "../components/layouts/PostCard";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState<number>(0);
  const [singleUser, setSingleUser] = useState<OtherUsers | object>({});
  const [showProfilePage, setShowProfilePage] = useState<boolean>(false);

  const { uid, userInfo } = UserAuth();
  const router = useRouter();

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const payload = {
      uid,
      message: message,
      time_of_message: new Date().toISOString(),
    };

    console.log(payload);

    axios
      .post("http://127.0.0.1:8000/api/new-post/", payload)
      .then((response) => {
        setCounter(counter + 1);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMessage = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setMessage(value);
  };

  // useEffect(() => {
  //   if (!uid) {
  //     const timeout = setTimeout(() => {
  //       router.push('/landing');
  //     }, 3000); // Delay of 3 seconds before redirecting

  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [uid]);

  useEffect(() => {
    async function getData() {
      try {
        if (uid) {
          const userData: any = await axios
            .get("http://localhost:8000/api/get-posts")
            .then((result) => result.data);
          setPosts(userData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    console.log("saved");
  }, [uid, counter]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div style={{ background: "#F0F2F5" }}>
      {!showProfilePage ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <textarea
              rows={5}
              cols={40}
              onChange={handleMessage}
              className={styles.textarea}
              placeholder="What's going on?"
              value={message}
            />
            <div>
              <button className={styles.button}>Post</button>
            </div>
          </form>

          {/* Renders out the post */}
          {posts.map((post: Post, index: number) => {
            return (
              <PostCard
                key={index}
                post={post}
                setShowProfilePage={setShowProfilePage}
                setSingleUser={setSingleUser}
              />
            );
          })}
        </>
      ) : (
        <>
          <button onClick={() => setShowProfilePage(false)}>Back</button>
          <SingleUserCard userObject={singleUser} />
        </>
      )}
    </div>
  );
}
