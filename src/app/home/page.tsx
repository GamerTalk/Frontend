"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";
import axios from "axios";
import SingleUserCard from "../components/layouts/SingleUserCard";
import { User, Post } from "../global.t";
import PostCard from "../components/layouts/PostCard";
import AlertModal from "../components/layouts/AlertModal";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState<number>(0);
  const [singleUser, setSingleUser] = useState<User | object>({});
  const [showProfilePage, setShowProfilePage] = useState<boolean>(false);
  const [showPostForm, setPostForm] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const { uid, userInfo } = UserAuth();
  const router = useRouter();

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const payload = {
      uid,
      message: message,
      time_of_message: new Date().toISOString(),
    };

    const url = process.env.NEXT_PUBLIC_API_URL + "/api/new-post/";

    axios.post(url, payload)
      .then((response) => {
        setCounter(counter + 1);
        setMessage("");
      })
      .catch((error) => {
        setAlertMessage('Please enter a message');
        setOpen(true);
        console.log(error);
      });
  };

  const handleMessage = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setMessage(value);
  };

  // for alert message
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      try {
        if (uid) {
          const url = process.env.NEXT_PUBLIC_API_URL + "/api/get-posts";
          const userData: any = await axios
            .get(url)
            .then((result) => result.data);
          setPosts(userData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [uid, counter]);

  
  return (
    <div className="p-1 mb-20">
      {open && (
        <AlertModal
          open={open}
          handleClose={handleClose}
          title="Validation Error"
          message={alertMessage}
        />
      )}
      {!showProfilePage ? (
        <>
          {showPostForm ? (
            <form className="mb-5" onSubmit={handleFormSubmit}>
              <textarea
                rows={5}
                cols={40}
                onChange={handleMessage}
                className="mt-5 mb-2 resize-none"
                placeholder="What are you playing?"
                value={message}
              />
              <div>
                <button className='"mb-5 rounded-full text-lg h-14 w-36 bg-purple-600 text-white border-2 border-white cursor-pointer"'>
                  Post
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => {
                setPostForm(!showPostForm);
              }}
            >
              Make a post!
            </button>
          )}

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
          <button
            className="mb-5 rounded-full text-lg h-14 w-36 bg-purple-600 text-white border-2 border-white cursor-pointer"
            onClick={() => setShowProfilePage(false)}
          >
            Back
          </button>
          <SingleUserCard userObject={singleUser} />
        </>
      )}
    </div>
  );
}
