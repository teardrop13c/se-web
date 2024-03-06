import React from 'react'
import Navbar from '../../Navbar'
import AdminMenu from '../AdminMenu/AdminMenu'
import RegisterTimePage from "./ContentPage/RegisterTimePage";
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function RegisterTime() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
      <RegisterTimePage/>
      </div>
    </section>
  )
}

export default RegisterTime;