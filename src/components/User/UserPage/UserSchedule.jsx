import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import { useSelector } from 'react-redux'; // เพิ่มการ import useSelector
import { Navigate } from "react-router-dom";

function UserSchedule() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // เข้าถึงค่า isLoggedIn จาก Redux store
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div className="content">
        <h2>Schedule Page</h2>
      </div>
    </section>
  )
}

export default UserSchedule