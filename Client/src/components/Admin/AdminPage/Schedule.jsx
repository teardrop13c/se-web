import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import "./Schedule.css";
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function Schedule() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h1>Content Schedule Page</h1>
      </div>
    </section>
  );
}

export default Schedule;
