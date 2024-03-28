import React from "react";
import Navbar from "../../Navbar";
import UserMenu from "../UserMenu/UserMenu";
import Clock from "../../Clock";
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";
function HomeUser() {
    //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <Clock />
    </section>
  );
}

export default HomeUser;
