import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import UserNewsContent from './ContentPage/UserNewsContent'
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function UserNews() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <UserNewsContent />
    </section>
  )
}

export default UserNews