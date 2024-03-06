import React, { useState } from 'react';
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import DatePick from './ContentPage/DatePick'
import { useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

function UserDatePick() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  if (!isLoggedIn) {
    return <Navigate to="/" />;
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