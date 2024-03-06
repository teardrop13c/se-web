import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import NamelistContent from "./ContentPage/NamelistContent";
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function NameList() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <NamelistContent />
    </section>
  );
}

export default NameList;
