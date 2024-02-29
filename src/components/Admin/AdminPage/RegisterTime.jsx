import React from 'react'
import Navbar from '../../Navbar'
import AdminMenu from '../AdminMenu/AdminMenu'
import { useSelector } from 'react-redux'; // เพิ่มการ import useSelector
import { Navigate } from "react-router-dom";

function RegisterTime() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // เข้าถึงค่า isLoggedIn จาก Redux store

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h2>RegisterTime Page</h2>
      </div>
    </section>
  )
}

export default RegisterTime;