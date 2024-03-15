import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import DatePick from './ContentPage/DatePick'
import { useSelector } from 'react-redux';
import Login from "../../Login/Login";
import HomeUser from './HomeUser';
function UserDatePick() {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const OnOffReg = useSelector((state) => state.var.OnOffReg);

  useEffect(() => {
    console.log('OnOffReg changed:', OnOffReg);
  }, [OnOffReg]);

  if (!isLoggedIn) {
    return <Login />;
  }
  else if (!OnOffReg) {
    console.log(OnOffReg)//ไม่ใช่ตัวแปรอัปเดตแล้วอะ
    return <HomeUser />;
  }
  return (
      <section id="main-layout">
        <Navbar />
        <UserMenu />
        <DatePick />
      </section>
  );


}

export default UserDatePick;