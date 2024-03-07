import React, { useState } from 'react';
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import DatePick from './ContentPage/DatePick'
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";

function UserDatePick() {
    //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <section id="main-layout">
        <Navbar />
        <UserMenu />
        <DatePick />
    </section>
  )
}

export default UserDatePick