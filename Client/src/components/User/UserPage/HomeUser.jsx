import React from "react";
import Navbar from "../../Navbar";
import UserMenu from "../UserMenu/UserMenu";
import Clock from "../../Clock";
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";
function HomeUser() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
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
