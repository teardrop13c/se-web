import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import UserNewsContent from './ContentPage/UserNewsContent'
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";

function UserNews() {
    //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  if (!isLoggedIn) {
    return <Login />;
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