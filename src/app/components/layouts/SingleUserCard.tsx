import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./SingleUserCard.module.css";
import { UserAuth } from "@/app/context/AuthContext";
import Checkbox from "../elements/Checkbox";
import LearningCheckbox from "../elements/Learning-Checkbox";
import langCall from "@/app/utils/langCheckFunc";
import { useRouter } from "next/navigation";
import TitleCase from "@/app/utils/TitleCase";
import Upper from "@/app/utils/Upper";
import { OtherUsers } from "@/app/global.t";

export default function SingleUserCard(props:any) {
  const { uid } = UserAuth();
  const userObject: OtherUsers = props.userObject
  console.log(userObject)

  return (
    <div>
      <h1>Profile</h1>
      {userObject.about_me ? (
        <>
          <p className={styles.heading}>Username:</p>
          <p>{userObject.username}</p>

          <p className={styles.heading}>Region:</p>
          <p>{TitleCase(userObject.user_region)}</p>

          <p className={styles.heading}>This user speaks:</p>
          {userObject.languages.fluent.map((element: string, index: number) => (
            <p key={index}>{Upper(element)}</p>
          ))}
          <p className={styles.heading}>This user is learning:</p>
          {userObject.languages.learning.map(
            (
              element: {
                level: number;
                language: string;
              },
              index: number
            ) => (
              <p key={index}>
                Learning {Upper(element.language)} at level {element.level}
              </p>
            )
          )}

          <p className={styles.heading}>Date of Birth: </p>
          <p> {userObject.date_of_birth}</p>

          <p className={styles.heading}>User Systems:</p>
          {userObject.user_systems.map((system: string, index: number) => (
            <p key={index}>{Upper(system)}</p>
          ))}
          <div className={styles.language}>
            <p className={styles.heading}>Genres they play:</p>
            {userObject.user_genre.map((genre: string, index: number) => (
              <p key={index}>{Upper(genre)}</p>
            ))}

            <p className={styles.heading}>About Me:</p>
            <p>{userObject.about_me}</p>

            <p className={styles.heading}>Currently Playing:</p>
            <p>{userObject.currently_playing}</p>
            <button onClick={() => alert("Work in procress")}>
              Send A Message
            </button>
          </div>
        </>
      ) : (
        "Loading Profile..."
      )}
    </div>
  );
}