import React, { useState } from "react";
import Navbar from "../../Navbar"
import UserMenu from "../UserMenu/UserMenu"
import { useSelector } from 'react-redux'; 
import "./UserSchedule.css"
import Login from "../../Login/Login";
import UserScheduleContent from "./ContentPage/UserScheduleContent";

const UserSchedule = () => {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <UserScheduleContent/>
    </section>
  );
};
export default UserSchedule