import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import RegisterContent from './ContentPage/RegisterContent'
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function UserRegister() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <RegisterContent />
    </section>
  )
}

export default UserRegister