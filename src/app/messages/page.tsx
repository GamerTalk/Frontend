"use client"
import React, { useState } from "react";
import MessageBox from "../components/layouts/MessageBox";

export default function Messages() { 
  const [chat, isChat] = useState(false);

  return <>
    <MessageBox />
    <MessageBox />
    <MessageBox />
  </>
}