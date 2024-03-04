import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function HomeAdmin() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h2>Home Admin</h2>
      </div>
    </section>
  );
}

export default HomeAdmin;