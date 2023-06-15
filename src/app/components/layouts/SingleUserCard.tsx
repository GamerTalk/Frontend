import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "../entry-form/UserInfo.module.css";
import { UserAuth } from "@/app/context/AuthContext";
import Checkbox from "../elements/Checkbox";
import LearningCheckbox from "../elements/Learning-Checkbox";
import langCall from "@/app/utils/langCheckFunc";
import { useRouter } from "next/navigation";
import TitleCase from "@/app/utils/TitleCase";
import Upper from "@/app/utils/Upper";
import { OtherUsers } from "@/app/global.t";

export default function SingleUserCard(userObject: OtherUsers) {

  const { uid } = UserAuth();

  return (
    <div>
      <h1>Profile</h1>
      {userObject ? (
        <>
          <p className={styles.heading}>Username:</p>
          <p>{userObject.username}</p>

          <p className={styles.heading}>Region:</p>
          <p>{TitleCase(userObject.user_region)}</p>



          <p className={styles.heading}>What language(s) are you fluent in?:</p>
          <p className={styles.subheading}>Check all that apply</p>

          <p className={styles.heading}>Date of Birth: </p>
          <p> {userObject.date_of_birth}</p>

          <p className={styles.heading}>User Systems:</p>
          <div className={styles.language}>
            <p className={styles.heading}>
              What language(s) do you want to learn?
            </p>
            <p className={styles.subheading}>
              1: Beginner, 2: Intermediate, 3: Advanced
            </p>

            <p className={styles.heading}>Genre:</p>

            <p className={styles.heading}>About Me:</p>

            <p className={styles.heading}>Currently Playing:</p>
          </div>
        </>
      ) : (
        "Loading Profile..."
      )}
    </div>
  );
}
